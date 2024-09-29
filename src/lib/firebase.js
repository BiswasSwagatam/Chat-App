
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatapp-e94e3.firebaseapp.com",
  projectId: "chatapp-e94e3",
  storageBucket: "chatapp-e94e3.appspot.com",
  messagingSenderId: "340828950979",
  appId: "1:340828950979:web:028b0b30ff2589ce7e6d76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()