import React from 'react'
import Felpe from "../../../public/imgs/felpe_01.jpg"
import Shoes from "../../../public/imgs/shoes_2.jpg"
import ManModel from "../../../public/imgs/man_1.jpg"
import Polo from "../../../public/imgs/polo_1.jpg"

export default function CategoriesSections() {
  return (
    <>
    <section class="categories">
        <div class="category">
          <img src={Felpe} alt="Felpe" />
          <h3>Felpe</h3>
        </div>
        <div class="category">
          <img src={ManModel} alt="Uomo" />
          <h3>Streetware</h3>
        </div>
        <div class="category">
          <img src={Shoes} alt="Scarpe" />
          <h3>Scarpe</h3>
        </div>
        <div class="category">
          <img src={Polo} alt="Accessori" />
          <h3>Polo & T-shirt</h3>
        </div>
      </section>
    </>
  )
}
