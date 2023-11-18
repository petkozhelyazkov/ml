import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [criteria, setCriteria] = useState();

    function updateCriteria(criteria) {
        setCriteria(criteria)
    }

    return (
        <SearchContext.Provider
            value={{ criteria, updateCriteria }}>
            {children}
        </SearchContext.Provider>
    )
}