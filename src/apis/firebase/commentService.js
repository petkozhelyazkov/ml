import { app } from "./config";
import {
    getFirestore,
    getDoc,
    setDoc,
    doc,
    arrayUnion,
    updateDoc,
    query,
    where,
    collection,
    getDocs
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

export async function updateUserComments(userId, changes) {
    const commentRef = collection(db, 'comments');

    const snap = await getDocs(commentRef);
    snap.forEach((doc) => {
        let newComments = doc.data().comments
        newComments.forEach(x => {
            if (x.user.id == userId) {
                x.user = { ...x.user, ...changes }
            }
            setDoc(doc.ref, {
                comments: newComments
            })
        });
    });
}

export function get(id) {
    return getDoc(doc(db, 'comments', `${id}`)).then(x => x.data())
}

export function edit(id, comment) {
    const commentsDocRef = doc(db, "comments", `${id}`);

    return get(id).then(x => {
        let temp = x.comments.find(x => x.id == comment.id)
        temp.comment = comment.comment

        setDoc(commentsDocRef, {
            comments: x.comments
        });
    })
}

export function remove(id, comment) {
    const commentsDocRef = doc(db, "comments", `${id}`);

    return get(id).then(x => {
        let newComments = x.comments.filter(x => x.id != comment.id)

        setDoc(commentsDocRef, {
            comments: newComments
        });
    })
}