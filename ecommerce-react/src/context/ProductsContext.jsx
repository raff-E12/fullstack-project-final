import React, { createContext, useContext, useEffect, useState } from 'react'
import ProdRoutes from "./js/Products_routes"
import axios from 'axios';

const UseProducts = createContext();

function ProductsContext({ children }) {
  const [isProd, setProd] = useState([]);
  const [isList, setList] = useState([])

  async function Prod_list(url) {
    try {
      const data = (await axios.get(url)).data.products;
      // console.log(data);
      setProd(data);
      setList(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => { Prod_list(ProdRoutes.index) }, []);

  const values_export = {
    isProd,
    setProd
  }

  return (
    <UseProducts.Provider value={values_export}>
      {children}
    </UseProducts.Provider>
  )
}

function UseContextProd() {
  const use_context = useContext(UseProducts);
  return use_context
}

export { ProductsContext, UseContextProd }
