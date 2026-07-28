import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

export async function login(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function register(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

export function observeAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export async function logout() {
  return await signOut(auth);
}