import { createContext, useState } from 'react';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [movie, setMovie] = useState();

    function updateMovie(movie) {
        setMovie(movie)
    }

    return (
        <ModalContext.Provider
            value={{ movie, updateMovie }}>
            {children}
        </ModalContext.Provider>
    )
}