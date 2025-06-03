import { useState } from "react";
import { createContext, useContext } from "react";


const SearchContext = createContext();

export const SearchProvider = ({ children }) => {

   const [searchTerm, setSearchTerm] = useState("");
   const [searchSubmitted, setSearchSubmitted] = useState(false);

    return <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchSubmitted, setSearchSubmitted }}>

        {children}
    </SearchContext.Provider>
}


export const useSearch = () => {
    return useContext(SearchContext);
}

