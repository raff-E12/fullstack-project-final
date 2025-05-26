import React, { useState } from 'react'
import { stack as FilterMenu } from "react-burger-menu"

export default function SearchBar() {
    const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div class="filters">
           <input type="search" placeholder="Cerca un prodotto..." />
            <select>
                <option value="">Ordina per</option>
                <option value="price">Prezzo</option>
                <option value="name">Nome</option>
                <option value="recent">Recenti</option>
            </select>
            <div className='box-filter-icon' id='filter-block' onClick={() => setOpen(value => !value)}>
                <i class="fa-solid fa-filter"></i>
            </div>
        </div>
    
        <div id='filter-menu'>
             <h2>Capi</h2>
            <div class="categories">
                    <button class="category-btn">Polo & T-Shirt</button>
                    <button class="category-btn">Capispalla</button>
                    <button class="category-btn">Felpe</button>
                    <button class="category-btn">Pantaloni</button>
                    <button class="category-btn">Scarpe</button>
                    <button class="category-btn">Streetwear</button>
            </div>
            <h2>Extra</h2>
            <div class="categories">
                <button class="category-btn">Saldi</button>
            </div>
        </div>
    </>
  )
}
