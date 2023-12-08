import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../apis/firebase/authService';


export function useAuth() {
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthStateChanged(auth, x => setUser(x));
    }, []);

    return user;
}