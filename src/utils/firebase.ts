import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"

import { auth, db, storage } from "../firebase"
import { Inputs } from "../interfaces"

export const loginWithProvider = async (provider: string): Promise<User | undefined> => {
    try {
        switch (provider) {
            case 'Google':
                const prov = new GoogleAuthProvider()
                const { user } = await signInWithPopup(auth, prov)

                return user
        }
    } catch (error) {
        console.error(error)
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
        return user
    } catch (error) {
        console.error(error)
    }
}

export const logOut = async (): Promise<boolean | undefined> => {
    try {
        await signOut(auth);
        console.log('logged out')
        return true
    } catch (error) {
        console.error(error)
    }
}

export const getProducts = async () => {
    try {
        const { docs } = await getDocs(collection(db, 'products'))

        return docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }))

    } catch (error) {
        console.error(error)
    }
}

export const addProduct = async ({ title, description, price, category }: Inputs, image: string): Promise<DocumentReference<DocumentData> | undefined> => {
    try {
        const product = await addDoc(collection(db, 'products'), {
            title,
            description,
            price,
            category,
            image,
            sold: 0,
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

        return window.location.reload()
    } catch (error) {
        console.error(error)
    }
}