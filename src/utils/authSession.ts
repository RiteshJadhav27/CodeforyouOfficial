// src/utils/authSession.ts
import { getAuth, setPersistence, browserSessionPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebaseConfig";

const auth = getAuth(app);

// Function for login with session persistence
export const loginWithSession = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Session-based login error:", error);
    throw error;
  }
};
