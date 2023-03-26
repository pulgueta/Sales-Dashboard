import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { Auth, getAuth, User } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
import { FirebaseStorage, getStorage } from 'firebase/storage'

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY || "",
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN || "",
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET || "",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID || "",
  appId: import.meta.env.VITE_FIREBASE_APPID || "",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID || "",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
export const analytics: Analytics = getAnalytics(app);
export const auth: Auth = getAuth(app);
export const currentUser: User | null = auth?.currentUser
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);