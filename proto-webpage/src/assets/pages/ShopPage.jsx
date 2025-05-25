import React, { useState } from 'react'
import Header from '../components/Header'
import FooterSections from '../components/FooterSections'
import SearchBar from '../components/SearchBar'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "../css/FilterMenu.css"
import ConatinersCards from '../contents/ConatinersCards';
import { Api_Context_Prod, Use_ContextProd } from '../context/Prod_Context';

export default function ShopPage() {
    const { isValue, setValue } = Use_ContextProd();
    const [isOpen, setOpen] = useState(false);
    
  return (
    <>
    <Header />
<div className='shop-sc'>

    <div id='filter-menu' className={`${!isOpen ? "close" : "open"}`}>
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

    <div className='show-products'>
        <div class="sidebar">
            <div className='sidebar-info'>
                <div className='sidebar-box'>
                    <h3>Categorie</h3>
                    <label><input type="checkbox" /> Polo & T-Shirt</label>
                    <label><input type="checkbox" /> Capispalla</label>
                    <label><input type="checkbox" /> Felpe</label>
                    <label><input type="checkbox" /> Pantaloni</label>
                    <label><input type="checkbox" /> Scarpe</label>
                    <label><input type="checkbox" /> Streetwear</label>
                </div>

                <div className='sidebar-box'>
                    <h3>Brand</h3>
                    <label><input type="checkbox" /> Nike</label>
                    <label><input type="checkbox" /> Adidas</label>
                    <label><input type="checkbox" /> Zara</label>
                </div>

                <div className='sidebar-box'>
                    <h3>Taglia</h3>
                    <label><input type="checkbox" /> S</label>
                    <label><input type="checkbox" /> M</label>
                    <label><input type="checkbox" /> L</label>
                    <label><input type="checkbox" /> XL</label>
                </div>

                <div className='sidebar-box'>
                    <h3>Colore</h3>
                    <label><input type="checkbox" /> Nero</label>
                    <label><input type="checkbox" /> Bianco</label>
                    <label><input type="checkbox" /> Blu</label>
                </div>
            </div>

            <div className='slider-sc'>
                <Slider min={0} max={100} value={isValue} onChange={(e) => { setValue(e)}} className='slider-sc'/>
                <p>Prezzo: <b>€{isValue}</b></p>
            </div>
        </div>
        <main className='main-sc'>
            <h1 className='shop-title'>Esplora i nostri capi</h1>
            
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

            <ConatinersCards />
        </main>
    </div>
</div>
    <FooterSections />
    </>
  )
}
