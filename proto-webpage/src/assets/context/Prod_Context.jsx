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
  const [isDress, setDress] = useState("");
  const [isDisabled, setDisabled] = useState(true);
  
    function Filter_Selection() {
      const data_fill = {
        category: isCategory,
        brand: isBrand,
        price: isValue 
      }

      let filter_brand = isList.filter(element => element.brand === data_fill.brand);
      let filter_category = isList.filter(element => element.category === data_fill.category);
      let filter_price = isList.filter(element => Number(element.price.toPrecision(3)) <= data_fill.price); // aggiustamento valori

      const filter_all = [...new Set([...filter_brand, ...filter_category, ...filter_price])];
      setFilter(list => [...list,...filter_all]);
      const condition_list = filter_all.length === 0 ? Products : filter_all;
      return setList(() => condition_list);
    }

    function setDress_fun(){
      if (isDress === "Polo & T-Shirt" || isDress === "Capispalla" || 
        isDress === "Felpe" ||  isDress === "Pantaloni" || 
        isDress === "Scarpe" || isDress === "Streetwear") {

      let filter_category = [];
      let condition_cat = "";

    switch (isDress) {
      case "Polo & T-Shirt":
      
      setDisabled(true);

      filter_category = isList.filter(element => {
        return element.category === "Polo & T-Shirt";
      })
          
      condition_cat = filter_category.length === 0 ? Products : filter_category;
      setList(() => condition_cat);

      break;

      case "Capispalla":

      setDisabled(true);

      filter_category = isList.filter(element => {
        return element.category === "Capispalla";
      })
          
      condition_cat = filter_category.length === 0 ? Products : filter_category;
      setList(() => condition_cat);

      break;

      case "Felpe":

      setDisabled(true);

      filter_category = isList.filter(element => {
        return element.category === "Felpe";
      })
          
      condition_cat = filter_category.length === 0 ? Products : filter_category;
      setList(() => condition_cat);

      break;

      case "Pantaloni":

      setDisabled(true);

      filter_category = isList.filter(element => {
        return element.category === "Pantaloni";
      })
          
      condition_cat = filter_category.length === 0 ? Products : filter_category;
      setList(() => condition_cat);

      break;

      case "Scarpe":

      setDisabled(true);

      filter_category = isList.filter(element => {
        return element.category === "Scarpe";
      })
          
      condition_cat = filter_category.length === 0 ? Products : filter_category;
      setList(() => condition_cat);

      break;

      case "Streetwear":

      setDisabled(true);

      filter_category = isList.filter(element => {
        return element.category === "Streetwear";
      })
          
      condition_cat = filter_category.length === 0 ? Products : filter_category;
      setList(() => condition_cat);

      break;

      default:
      filter_category = [];
      condition_cat = Products;
      setList(() => condition_cat);

      break;

      }

      } else if (isDress === "Saldi") {

      setDisabled(true);
        
      const filter_sale = isList.filter(element => element.sku_order_code);
      const condition_sale = filter_sale.length === 0 ? Products : filter_sale;

      return setList(() => condition_sale);

      } else if (isDress === "Reset"){

        setDisabled(false);

        return setList(Products);
        
      } else{
        return setDress("");
      }
    }

    function Reset_Check() {
      setCategory("");
      setValue("");
      setBrand("");
      setList(Products);
    }

    useEffect(() => { setDress_fun() },[isDress]);

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
    Reset_Check,
    isDress,
    setDress,
    isDisabled
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
