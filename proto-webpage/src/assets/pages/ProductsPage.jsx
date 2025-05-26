import React from 'react'
import Header from '../components/Header'
import FooterSections from '../components/FooterSections'
import { useParams } from 'react-router'
import { Use_ContextProd } from '../context/Prod_Context';
import Products from "../json/Products_with_category.json"
import Deposits from "../json/Inventory_Products.json"

export default function ProductsPage() {
    const { name, id } = useParams();
    const { isList, isDeposit } = Use_ContextProd();
    const id_products = Number(id.split("").filter(element => !element.includes(":")).join(""));
    const name_products = name.split("").filter(element => !element.includes(":")).join("");

  return (
    <>
    <Header />
    <div className='prods-id'>
     {isList.map((element, index) => {
        if (element.id === id_products) {
            return(
              <>
            <div class="container-prod">
                <div class="image-gallery">
                <img id="mainImage" src={element.image_url} class="main-image" alt="Prodotto principale" />
                    <div className='thumbnails'>
                        <div className='sc-ref'>
                            <h3>Taglie</h3>
                           <div className='tags-sc'>
                                {isDeposit.map((element, index) => {
                                    if (element.product_id === id_products) {
                                        return(
                                        <>
                                            <div className='tag'>
                                                <p key={index} >{element.size}</p>
                                            </div>
                                        </>
                                        )
                                    }
                                })}
                           </div>
                        </div>
                        <div className='sc-ref'>
                            <h3>Colori</h3>
                           <div className='tags-sc'>
                                {isDeposit.map((element, index) => {
                                    if (element.product_id === id_products) {
                                        return(
                                        <>
                                            <div className='color' style={{backgroundColor:`${element.color}`}}></div>
                                        </>
                                        )
                                    }
                                })}
                           </div>
                        </div>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-title">{element.name}</div>
                    <div class="price">€{element.price} {element.discount_price === null ? <span className='span-text'></span> : <span className='span-text'>€{element.discount_price}</span>}</div>
                    <div class="description">{element.description}</div>
                    <button class="buy-button">Aggiungi al carrello</button>
                </div>
            </div> 
            </>
            )
        }
     })}
    </div>
    <FooterSections />
    </>
  )
}