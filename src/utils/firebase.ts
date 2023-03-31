import { RefObject } from "react"

import { FirebaseError } from "firebase/app"
import {
    User, UserCredential, FacebookAuthProvider, GoogleAuthProvider, PhoneAuthProvider, PhoneMultiFactorGenerator, multiFactor, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updatePassword,
} from 'firebase/auth'
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where, WhereFilterOp } from "firebase/firestore"
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { v4 } from 'uuid'

import { auth, db, storage } from "@/firebase"
import { ContactInputs, Inputs, PasswordResetEmail, PasswordResetQuestion, PersonalDataProps, RegisterUserInfo } from "@/interfaces"
import { Providers } from "@/types"

export const loginWithProvider = async ({ providers }: Providers): Promise<UserCredential | undefined> => {
    try {
        switch (providers) {
            case 'Google':
                const googleProvider = new GoogleAuthProvider()
                const googleUser = await signInWithPopup(auth, googleProvider)

                return googleUser;

            case 'Facebook':
                const facebookProvider = new FacebookAuthProvider()
                const facebookUser = await signInWithPopup(auth, facebookProvider)

                return facebookUser;
        }
    } catch (error) {
        console.error(error)
    }
}

export const sendEmail = async ({ name, email, message }: ContactInputs): Promise<DocumentReference<DocumentData> | undefined> => {
    const emailContent = {
        to: import.meta.env.MODE === 'DEVELOPMENT' ? import.meta.env.VITE_TO_DEV_EMAIL : import.meta.env.VITE_TO_PROD_EMAIL,
        message: {
            subject: 'Nuevo mensaje de cliente - Xochicalli Commerce',
            text: message,
            html: `
            <h1>Nuevo mensaje de: ${name}</h1>
            <h3>Correo del cliente: ${email}</h3>
            <p>Mensaje: ${message}</p>
            `,
        }
    }
    try {
        return await addDoc(collection(db, 'emails'), emailContent)
    } catch (error) {
        console.error(error);
    }
}

export const updateInformation = async (values: PersonalDataProps, uid: string): Promise<void> => {
    try {
        const userRef = doc(db, `/users/${uid}`)

        return await updateDoc(userRef, {
            name: values.name,
            fatherSurname: values.fatherSurname,
            motherSurname: values.motherSurname,
            birthday: values.birthday,
        })

    } catch (error) {
        console.error(error)
    }
}

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        return user
    } catch (error) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message)
        }

        throw error
    }
}

export const signUpWithEmail = async (email: string, password: string,
    { birthday, fatherSurname, gender, motherSurname, name, phoneNumber, securitySelect, securityQuestion }: RegisterUserInfo): Promise<User | undefined> => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        let parsedDate: string = '';
        let age: number | null = null;

        if (birthday) {
            const stringDate = new Date(birthday);
            if (!isNaN(stringDate.getTime())) {
                parsedDate = stringDate.toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric'
                });

                const now = new Date();
                const birthDate = new Date(birthday);
                age = now.getFullYear() - birthDate.getFullYear();
                const monthDiff = now.getMonth() - birthDate.getMonth();
                if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birthDate.getDate())) age--;
            } else {
                throw new Error('Invalid date format');
            }
        }

        await setDoc(doc(db, 'users', user.uid), {
            age,
            birthday: parsedDate,
            createdAt: new Date().toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            }),
            email: user.email,
            fatherSurname,
            gender,
            motherSurname,
            name,
            // phoneNumber: `+52${String(phoneNumber)}`,
            phoneNumber: String(phoneNumber),
            role: 'user',
            uid: user.uid,
            securitySelect,
            securityQuestion,
            profilePicture: null,
            address: null,
        })

        // await sendEmailVerification(currentUser)

        return user
    } catch (error) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message)
        }

        throw error
    }
}

export const verifyUserEnrolled = (user: User): boolean => multiFactor(user).enrolledFactors.length > 0

export const send2FA = async (user: any, phoneNumber: string, verifier: any): Promise<string | undefined> => {
    const session = await multiFactor(user).getSession();
    const phoneOptions = {
        phoneNumber,
        session,
    }

    const phoneAuth = new PhoneAuthProvider(auth);

    try {
        return await phoneAuth.verifyPhoneNumber(phoneOptions, verifier)
    } catch (e) {
        console.log(e);
    }
}

export const enroll2FA = async (user: any, verificationCodeId: any, verificationCode: string): Promise<void | false> => {
    const phoneAuthCred = PhoneAuthProvider.credential(verificationCodeId, verificationCode)
    const mfaAssertion = PhoneMultiFactorGenerator.assertion(phoneAuthCred)

    try {
        return true && await multiFactor(user).enroll(mfaAssertion, 'Personal phnumber')
    } catch (e) {
        console.log(e);
        return false
    }

}

export const forgotPasswordWithQuestion = async ({ email, securityQuestion, securitySelect, newPassword }: PasswordResetQuestion): Promise<boolean> => {

    let flag = false

    const currentUser = auth.currentUser;
    const { docs } = await getDocs(collection(db, 'users'))

    const users = docs.map((doc) => doc.data())

    for (const user of users) {
        if (currentUser && user.email === email && user.securityQuestion === securityQuestion && user.securitySelect === securitySelect) {
            flag = true
            await updatePassword(currentUser, newPassword)
        }
    }

    if (flag) {
        return true
    } else {
        return true
    }
}


export const forgotPasswordWithEmail = async ({ email }: PasswordResetEmail): Promise<boolean> => {
    try {
        await sendPasswordResetEmail(auth, email)

        return true
    } catch (error) {
        return false
    }
}

export const logOut = async (): Promise<boolean | undefined> => {
    try {
        await signOut(auth);
        return true
    } catch (error) {
        console.error(error)
    }
}

export const queryUser = async (uid: any): Promise<DocumentData | undefined> => {
    try {
        const queriedUser = await getDoc(doc(db, 'users', uid))

        return queriedUser.data()
    } catch (error) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message)
        }

        throw error
    }
}

export const getProducts = async (): Promise<{ id: string; }[] | undefined> => {
    try {
        const { docs } = await getDocs(collection(db, 'products'))

        const products = docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }))

        return products
    } catch (error) {
        console.error(error)
    }
}

export const getProduct = async (collectionName: string, id: string) => {
    try {
        const docRef = doc(db, collectionName, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data());
            return docSnap.data()
        }
    } catch (error) {
        console.error(error)
    }
}

export const uploadImage = async (fileRef: RefObject<HTMLInputElement>): Promise<string | null> => {
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
                reject(err); // Reject the promise if there's an error
            }, async () => {
                try {
                    const url = await getDownloadURL(imgUpload.snapshot.ref);
                    resolve(url); // Resolve the promise with the URL
                } catch (err) {
                    reject(err); // Reject the promise if there's an error
                }
            });
        });

        return url; // Return the URL
    } catch (error) {
        console.error(error);
        return null; // Return null instead of throwing an error
    }
}


export const getProductsWithQuery = async (collectionName: string, operator: WhereFilterOp, desired: string, info: string) => {
    const q = query(collection(db, collectionName), where(desired, operator, info));

    const found: { data: DocumentData; id: string }[] = [];

    return new Promise<{ data: DocumentData; id: string }[]>((resolve, reject) => {
        onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach(({ doc }) => {
                found.push({
                    data: doc.data(),
                    id: doc.id,
                });
            });

            resolve(found);
        }, reject);
    });
};



export const addProduct = async ({ title, description, price, category, stock }: Inputs, image: string | null): Promise<DocumentReference<DocumentData> | undefined> => {
    try {
        const product = await addDoc(collection(db, 'products'), {
            category,
            description,
            image,
            price,
            sold: 0,
            stock: Number(stock),
            title,
        })

        return product
    } catch (error) {
        console.log(error)
    }
}

export const deleteProduct = async (id: string, image: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'products', id))
        await deleteObject(ref(storage, image))
    } catch (error) {
        console.error(error)
    }
}