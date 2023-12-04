import { app } from "./config";
import {
    getFirestore,
    getDoc,
    setDoc,
    doc,
    arrayUnion,
    updateDoc
} from "firebase/firestore";

app();
const db = getFirestore();

export async function get(id) {
    const userRef = doc(db, 'users', id);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
        return userDoc.data()
    } else {
        return await setDoc(userRef, {
            imgUrl: '',
            displayName: '',
            liked: [],
            favorite: []
        })
    }
}

export function updateProfile(id, changes) {
    const userRef = doc(db, 'users', id);

    return updateDoc(userRef, {
        imgUrl: changes.imgUrl,
        displayName: changes.displayName
    });
}