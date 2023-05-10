import { FirebaseError } from "firebase/app"
import { addDoc, collection, deleteDoc, doc, DocumentData, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { v4 } from 'uuid'

import { db, storage } from "@/firebase"
import { CommentInfo, Inputs, PersonalDataProps } from "@/interfaces"

export const updateInformation = async (values: PersonalDataProps, uid: string): Promise<void | FirebaseError> => {
    const { name, fatherSurname, motherSurname } = values

    try {
        const userRef = doc(db, `/users/${uid}`)

        let birthday: string = '';

        if (values.birthday) {
            const stringDate = new Date(values.birthday);
            if (!isNaN(stringDate.getTime())) {
                birthday = stringDate.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                });
            } else {
                throw new Error('Invalid date format');
            }
        }

        return await updateDoc(userRef, {
            name,
            fatherSurname,
            motherSurname,
            birthday,
        })

    } catch (error) {
        return error as FirebaseError
    }
}

export const updateProfilePicture = async (fileRef: File, uid: string): Promise<string | FirebaseError | false> => {
    try {
        const imgRef = ref(storage, `profilePictures/${uid}`);
        const imgUpload = uploadBytesResumable(imgRef, fileRef);

        const url = await new Promise<string>((resolve, reject) => {
            imgUpload.on("state_changed", ({ state }) => {
                switch (state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            }, (err) => {
                reject(err);
            }, async () => {
                try {
                    const url = await getDownloadURL(imgUpload.snapshot.ref);

                    await updateDoc(doc(db, 'users', uid), { profilePicture: url })
                    resolve(url);
                } catch (err) {
                    reject(err);
                }
            });
        });

        return url;
    } catch (error) {
        return error as FirebaseError
    }
}

export const queryUser = async (uid: string): Promise<DocumentData | undefined> => {
    try {
        const queriedUser = await getDoc(doc(db, 'users', uid))

        return queriedUser && queriedUser.data()
    } catch (error) {
        if (error instanceof FirebaseError) throw error
    }
}

export const getProducts = async (): Promise<{ id: string; }[] | FirebaseError> => {
    try {
        const { docs } = await getDocs(collection(db, 'products'))

        const products = docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))

        return products
    } catch (error) {
        return error as FirebaseError
    }
}

export const getProduct = async (collectionName: string, id: string): Promise<false | DocumentData | FirebaseError> => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        return docSnap.exists() && { ...docSnap.data(), id: docSnap.id }
    } catch (error) {
        return error as FirebaseError
    }
}

export const addComment = async (values: CommentInfo, product: string): Promise<void | FirebaseError> => {
    try {
        const prevComment = await addDoc(collection(db, 'comments'), {
            comment: values.comment,
            fatherSurname: values.fatherSurname,
            name: values.name,
            createdAt: new Date().toLocaleDateString('es-ES'),
            product,
        })

        return await setDoc(doc(db, 'products', prevComment.id), { id: prevComment.id }, { merge: true })
    } catch (error) {
        return error as FirebaseError
    }
}

// export const getComments = async (product: string): Promise<CommentInfo[] | undefined> => {
//     try {
//         const commentsRef = collection(db, 'comments')

//         if (product) {
//             const _query = query(commentsRef, where('product', '==', product), limit(3))

//             onSnapshot(_query, (snapshot) => {
//                 return snapshot.docs.map((doc) => ({
//                     ...doc.data(),
//                     id: doc.id
//                 })) as CommentInfo[]
//             })
//         } else {
//             return [] as CommentInfo[]
//         }
//     } catch (error) {
//         if (error instanceof FirebaseError) {
//             throw new Error(error.message)
//         }
//     }
// }

export const uploadImage = async (fileRef: any): Promise<string | undefined | null | FirebaseError> => {
    try {
        const file = fileRef.current?.files?.[0] ?? new Blob();
        const fileName = file?.name;
        const imgRef = ref(storage, `products/${v4() + fileName}`);
        const imgUpload = uploadBytesResumable(imgRef, file);

        if (!file) {
            console.error('No file selected');
            return null; // Return null instead of void
        }

        const url = await new Promise<string>((resolve, reject) => {
            imgUpload.on("state_changed", ({ state }) => {
                switch (state) {
                    case "paused":
                        console.log("Upload is paused");
                        break;
                    case "running":
                        console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            }, (err) => {
                reject(err);
            }, async () => {
                try {
                    const url = await getDownloadURL(imgUpload.snapshot.ref);
                    resolve(url);
                } catch (err) {
                    reject(err);
                }
            });
        });

        return url; // Return the URL
    } catch (error) {
        return error as FirebaseError
    }
}

export const addProduct = async ({ title, description, price, category, stock }: Inputs, image: string | null): Promise<void | FirebaseError> => {
    try {
        const prevProduct = await addDoc(collection(db, 'products'), {
            category,
            description,
            image,
            price,
            sold: 0,
            stock: Number(stock),
            title,
        })

        return await setDoc(doc(db, 'products', prevProduct.id), { id: prevProduct.id }, { merge: true })
    } catch (error) {
        return error as FirebaseError
    }
}

export const deleteProduct = async (id: string, image: string): Promise<void | FirebaseError> => {
    try {
        await deleteDoc(doc(db, 'products', id))
        await deleteObject(ref(storage, image))
    } catch (error) {
        return error as FirebaseError
    }
}