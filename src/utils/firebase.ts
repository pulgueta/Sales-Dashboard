import { FirebaseError } from "firebase/app"
import { createUserWithEmailAndPassword, GoogleAuthProvider, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, User } from "firebase/auth"
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDoc, getDocs, onSnapshot, query, where, WhereFilterOp } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"

import { auth, db, storage } from "@/firebase"
import { Inputs } from "@/interfaces"

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

export const signUpWithEmail = async (email: string, password: string): Promise<User | undefined> => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        return user
    } catch (error) {
        if (error instanceof FirebaseError) {
            throw new Error(error.message)
        }

        throw error
    }

}

export const forgotPassword = async (email: string): Promise<boolean | undefined> => {
    try {
        await sendPasswordResetEmail(auth, email)

        return true
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
    } catch (error) {
        console.error(error)
    }
}