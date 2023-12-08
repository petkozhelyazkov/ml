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

export function removeLike(userId, id) {
    const userRef = doc(db, "users", `${userId}`);

    return get(userId).then(x => {
        let newLiked = x.liked.filter(x => x.id != id)

        updateDoc(userRef, {
            liked: newLiked
        });
    })
}

export function removeFavorite(userId, id) {
    const userRef = doc(db, "users", `${userId}`);

    return get(userId).then(x => {
        let newFavorite = x.favorite.filter(x => x.id != id)

        updateDoc(userRef, {
            favorite: newFavorite
        });
    })
}

export async function like(userId, like) {
    const userRef = doc(db, 'users', userId);

    if ((await getDoc(userRef)).exists()) {
        return await updateDoc(userRef, {
            liked: arrayUnion(like)
        }, { merge: true });
    } else {
        return await setDoc(userRef, {
            liked: [like]
        })
    }
}

export async function favorite(userId, favorite) {
    const userRef = doc(db, 'users', userId);

    if ((await getDoc(userRef)).exists()) {
        return await updateDoc(userRef, {
            favorite: arrayUnion(favorite)
        }, { merge: true });
    } else {
        return await setDoc(userRef, {
            favorite: [favorite]
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