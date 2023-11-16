import { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";

import { auth } from '../apis/firebase/authService';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        return onAuthStateChanged(auth, user => setUser(user));
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}