import React from 'react'
import WomanModel from "../../../public/imgs/woman_1.jpg"
import Shoes from "../../../public/imgs/shoes_2.jpg"
import ManModel from "../../../public/imgs/man_1.jpg"
import Accessories from "../../../public/imgs/accessories_1.jpg"

export default function CategoriesSections() {
  return (
    <>
    <section class="categories">
        <div class="category">
          <img src={WomanModel} alt="Donna" />
          <h3>Donna</h3>
        </div>
        <div class="category">
          <img src={ManModel} alt="Uomo" />
          <h3>Uomo</h3>
        </div>
        <div class="category">
          <img src={Shoes} alt="Scarpe" />
          <h3>Scarpe</h3>
        </div>
        <div class="category">
          <img src={Accessories} alt="Accessori" />
          <h3>Accessori</h3>
        </div>
      </section>
    </>
  )
}
