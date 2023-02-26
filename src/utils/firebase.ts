import { ChangeEvent } from 'react'

import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from "firebase/auth"
import { addDoc, collection, doc, DocumentData, DocumentReference, getDocs, setDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { v4 as uuidv4 } from 'uuid'

import { auth, db, storage } from "../firebase"
import { Inputs } from "../interfaces"

export const getProducts = async () => {
    try {
        const { docs } = await getDocs(collection(db, 'products'))

        return docs
    } catch (error) {
        console.error(error)
    }
}

export const loginWithProvider = async (provider: string): Promise<UserCredential | undefined> => {
    try {
        switch (provider) {
            case 'Google':
                const prov = new GoogleAuthProvider()
                const result = await signInWithPopup(auth, prov)

                return result
        }
    } catch (error) {
        console.error(error)
    }
}

export const uploadImage = async ({ target }: ChangeEvent<HTMLInputElement | undefined>) => {
    try {
        const file = target.files?.[0];
        const fileName = file?.name;
        const imgRef = ref(storage, `products/${uuidv4() + fileName}`);
        const data = await file?.arrayBuffer()
        const imgUpload = uploadBytesResumable(imgRef, data);

        imgUpload.on("state_changed", (snapshot) => {
            switch (snapshot.state) {
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
            console.error(err);
        }, async () => {
            await getDownloadURL(imgUpload.snapshot.ref).then((url) => {
                setDoc(doc(db, 'products'), {
                    image: url,
                }, {
                    merge: true,
                })
            });
        }
        )
    } catch (error) {
        console.error(error)
    }
}

export const addProduct = async ({ title, description, price, category, image }: Inputs): Promise<DocumentReference<DocumentData> | undefined> => {
    try {
        const product = await addDoc(collection(db, 'products'), {
            title,
            description,
            price,
            category,
            image,
        })

        return product
    } catch (error) {
        console.log(error)
    }
}

export const loginWithEmail = async (email: string, password: string): Promise<User | undefined> => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        return user
    } catch (error) {
        console.error(error)
    }
}

export const signUpWithEmail = async (email: string, password: string): Promise<User | undefined> => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        console.log(user)
        return user
    } catch (error) {
        console.error(error)
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
