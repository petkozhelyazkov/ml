import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState('');
    const [type, setType] = useState('trending')

    function updateQuery(query) {
        setQuery(x => query)
    }

    function updateGenre(genre) {
        setGenre(x => genre)
    }

    function updateType(type) {
        setType(x => type);
    }

    return (
        <SearchContext.Provider
            value={{ query, updateQuery, genre, updateGenre, type, updateType }}>
            {children}
        </SearchContext.Provider>
    )
}