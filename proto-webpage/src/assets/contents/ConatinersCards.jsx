import React, { useState } from 'react'
import { Use_ContextProd } from '../context/Prod_Context';

export default function ConatinersCards() {
  const { isList } = Use_ContextProd();

  return (
    <>
     <div class="products-container">
        {isList.map((element, index) =>{
            return(
            <>
            <div class="product-card">
              <img src={element.image_url} alt="Felpa Oversize" />
                <div class="product-info">
                    <div class="product-title">{element.name}</div>
                    <div class="product-description">{element.description}</div>
                    <div class="product-price">{`€${element.price}`}</div>
                </div>
                <div className='product-info btns'>
                  <button className='btn-prod'>Add Card</button>
                  <button className='btn-prod'>View</button>
                </div>
            </div>
            </>
            )
        })}
    </div>
    </>
  )
}