import { useState } from "react";
import { createContext, useContext } from "react";


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

    const [isSearchActive, setSearchActive] = useState(false);
    const [isSearchBarActive, setSearchBarActive] = useState(false);

    return <SearchContext.Provider value={{ isSearchActive, setSearchActive, isSearchBarActive, setSearchBarActive }}>

        {children}
    </SearchContext.Provider>
}


export const useSearch = () => {
    return useContext(SearchContext);
}

