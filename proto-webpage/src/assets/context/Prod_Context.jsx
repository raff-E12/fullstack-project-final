import React, { createContext, useContext, useEffect, useState } from 'react'
import Products from "../json/Products_with_category.json"
import Deposits_list from "../json/Inventory_Products.json"

const Prod_Context = createContext();

function Api_Context_Prod({children}) {
  const [isList, setList] = useState(Products);
  const [isDeposit, setDeposit] = useState(Deposits_list);
  const [isFilter, setFilter] = useState([]);
  const [isCategory, setCategory] = useState("");
  const [isBrand, setBrand] = useState("");
  const [isValue, setValue] = useState(0);
  
    function Filter_Selection() {
      const data_fill = {
        category: isCategory,
        brand: isBrand,
        price: isValue 
      }

      let filter_brand = isList.filter(element => element.brand === data_fill.brand);
      let filter_category = isList.filter(element => element.category === data_fill.category);
      let filter_price = isList.filter(element => Number(element.price.toPrecision(3)) <= data_fill.price); // aggiustamento valori

      console.log(filter_price)

      const filter_all = [...new Set([...filter_brand, ...filter_category, ...filter_price])];
      setFilter(list => [...list,...filter_all]);
      const condition_list = filter_all.length === 0 ? Products : filter_all;
      return setList(() => condition_list);
    }

    function Reset_Check() {
      setCategory("");
      setValue("");
      setBrand("");
      setList(Products);
    }

  const export_value = {
    isList,
    isDeposit,
    isValue,
    setValue,
    isCategory,
    setCategory,
    isBrand,
    setBrand,
    Filter_Selection,
    Reset_Check
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
