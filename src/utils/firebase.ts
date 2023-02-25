import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from "firebase/auth"

import { auth } from "../firebase"

export const loginWithEmail = async (email: string, password: string): Promise<User | false> => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        return user
    } catch (error) {
        return false
    }
}

export const signUpWithEmail = async (email: string, password: string): Promise<User | boolean> => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)

        return user
    } catch (error) {
        return false
    }
}

export const logOut = async (): Promise<boolean> => {
    try {
        await signOut(auth);

        return true
    } catch (error) {
        return false
    }
}