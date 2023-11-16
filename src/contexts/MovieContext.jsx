import { createContext, useState } from 'react';

export const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [movie, setMovie] = useState();

    function updateMovie(movie) {
        setMovie(movie)
    }

    return (
        <MovieContext.Provider
            value={{ movie, updateMovie }}>
            {children}
        </MovieContext.Provider>
    )
}