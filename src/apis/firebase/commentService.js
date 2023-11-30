import { app } from "./config";
import {
    getFirestore,
    collection,
    getDoc,
    setDoc,
    doc,
    arrayUnion,
    updateDoc
} from "firebase/firestore";


app();
const db = getFirestore();

export async function add(id, comment) {
    const commentRef = doc(db, 'comments', id);

    if ((await getDoc(commentRef)).exists()) {
        await updateDoc(commentRef, {
            comments: arrayUnion(comment)
        }, { merge: true });
    } else {
        await setDoc(commentRef, {
            comments: [comment]
        })
    }
}

export function getAll(id) {
    return getDoc(doc(db, 'comments', `${id}`)).then(x => x.data())
}