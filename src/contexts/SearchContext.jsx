import { createContext, useState } from 'react';

export const SearchContext = createContext();

export function SearchProvider({ children }) {
    const [criteria, setCriteria] = useState({ query: '', genre: '' });

    function updateCriteria(criteria) {
        setCriteria(x => ({ ...x, ...criteria }))
    }


    return (
        <SearchContext.Provider
            value={{ criteria, updateCriteria }}>
            {children}
        </SearchContext.Provider>
    )
}