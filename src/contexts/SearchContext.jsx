import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState('');

    function updateQuery(query) {
        setQuery(x => query)
    }

    function updateGenre(genre) {
        setGenre(x => genre)
    }


    return (
        <SearchContext.Provider
            value={{ query, updateQuery, genre, updateGenre }}>
            {children}
        </SearchContext.Provider>
    )
}