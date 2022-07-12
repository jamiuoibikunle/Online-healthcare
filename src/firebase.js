import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "booqit-5623d.firebaseapp.com",
  projectId: "booqit-5623d",
  storageBucket: "booqit-5623d.appspot.com",
  messagingSenderId: "545613745949",
  appId: "1:545613745949:web:acf177923a1bfe99fbdbf4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);