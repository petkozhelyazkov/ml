import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [query, setQuery] = useState('');
    const [genre, setGenre] = useState('');
    const [mediaType, setMediaType] = useState('')

    function updateQuery(query) {
        setQuery(x => query)
    }

    function updateGenre(genre) {
        setGenre(x => genre)
    }

    function updateMediaType(mediaType) {
        setMediaType(x => mediaType);
    }

    return (
        <SearchContext.Provider
            value={{ query, updateQuery, genre, updateGenre, mediaType, updateMediaType }}>
            {children}
        </SearchContext.Provider>
    )
}