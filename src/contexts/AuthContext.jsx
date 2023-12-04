import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../apis/firebase/authService';
import { get } from '../apis/firebase/userService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    function updateUser(changes) {
        setUser(x => ({ ...x, ...changes }))
    }

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            setUser(user)
        });
    }, []);

    useEffect(() => {
        if (user?.uid) {
            get(user.uid).then(x => setUser({ ...user, ...x }))
        }
    }, [auth.currentUser])

    return (
        <AuthContext.Provider value={{ user, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

