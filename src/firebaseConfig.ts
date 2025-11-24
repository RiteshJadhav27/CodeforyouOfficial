import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA776fWnr9NjhjKSLP7qJ_0ueKn7KoGg2Y",
  authDomain: "codeforyou-official.firebaseapp.com",
  projectId: "codeforyou-official",
  storageBucket: "codeforyou-official.firebasestorage.app",
  messagingSenderId: "937573757023",
  appId: "1:937573757023:web:827d75d22f6af1981a6bea",
  measurementId: "G-9BNYCQFJ28",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
