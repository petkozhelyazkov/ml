import { app } from "./config";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth';

app();
export const auth = getAuth();

export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
    return signOut(auth);
}