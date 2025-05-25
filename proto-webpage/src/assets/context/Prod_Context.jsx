import React, { createContext, useContext, useState } from 'react'
import Products from "../json/Products_with_category.json"

const Prod_Context = createContext();

function Api_Context_Prod({children}) {
  const [isList, setList] = useState(Products);
  const [isValue, setValue] = useState(0);

  const export_value = {
    isList,
    isValue,
    setValue
  };

  return(
    <Prod_Context.Provider value={export_value}>
      {children}
    </Prod_Context.Provider>
  )
}

function Use_ContextProd() {
  const context = useContext(Prod_Context);
  return context
}

export { Api_Context_Prod, Use_ContextProd };
