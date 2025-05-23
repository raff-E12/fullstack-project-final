import React from 'react'
import Bags from "../../../public/imgs/bag.jpg"
import Hats from "../../../public/imgs/hat_black.jpg"
import Jackets from "../../../public/imgs/jacket.jpg"
import Sneakers from "../../../public/imgs/sneakers.jpg"

export default function ProductsSections() {
  return (
    <>
     <section class="benefits">
        <div class="benefit">
          <i class="fa-solid fa-truck-fast"></i>
          <h4>Spedizione Gratuita</h4>
        </div>
        <div class="benefit">
          <i class="fa-solid fa-boxes-stacked"></i>
          <h4>Resi Facili 30 Giorni</h4>
        </div>
        <div class="benefit">
          <i class="fa-solid fa-headset"></i>
          <h4>Supporto 24/7</h4>
        </div>
      </section>
    
      <section class="products">
        <h2>Prodotti in Evidenza</h2>
        <div class="product-grid">
          <div class="product">
            <img src={Jackets} alt="Giacca" />
            <h3>Giacca Elegante</h3>
            <span>&euro;89.00</span>
          </div>
          <div class="product">
            <img src={Sneakers} alt="Sneakers" />
            <h3>Sneakers Bianche</h3>
            <span>&euro;59.00</span>
          </div>
          <div class="product">
            <img src={Hats} alt="Cappello" />
            <h3>Cappello alla Moda</h3>
            <span>&euro;25.00</span>
          </div>
          <div class="product">
            <img src={Bags} alt="Borsa" />
            <h3>Borsa in Pelle</h3>
            <span>&euro;120.00</span>
          </div>
        </div>
      </section>
    </>
  )
}
