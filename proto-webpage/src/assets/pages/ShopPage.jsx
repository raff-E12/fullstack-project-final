import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FooterSections from '../components/FooterSections'
import SearchBar from '../components/SearchBar'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "../css/FilterMenu.css"
import ConatinersCards from '../contents/ConatinersCards';
import { Api_Context_Prod, Use_ContextProd } from '../context/Prod_Context';
import { use } from 'react';

export default function ShopPage() {
    const [isOpen, setOpen] = useState(false);
    const { isValue, setValue, isCategory, 
    setCategory, isBrand, setBrand, Filter_Selection, Reset_Check } = Use_ContextProd();
    
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
        <form class="sidebar">
            <div className='sidebar-info'>
                <div className='sidebar-box'>
                    <h3>Categorie</h3>
                    <label><input type="radio"  name="category" value="Polo & T-Shirt" onChange={e => setCategory(e.target.value)}/> Polo & T-Shirt</label>
                    <label><input type="radio" name="category" value="Capispalla" onChange={e => setCategory(e.target.value)}/> Capispalla</label>
                    <label><input type="radio" name="category" value="Felpe" onChange={e => setCategory(e.target.value)}/> Felpe</label>
                    <label><input type="radio"  name="category" value="Pantaloni" onChange={e => setCategory(e.target.value)}/> Pantaloni</label>
                    <label><input type="radio" name="category" value="Scarpe" onChange={e => setCategory(e.target.value)}/> Scarpe</label>
                    <label><input type="radio" name="category" value="Streetwear" onChange={e => setCategory(e.target.value)}/> Streetwear</label>
                </div>

                <div className='sidebar-box'>
                    <h3>Brand</h3>
                    <label><input type="radio" name="brand" value="Nike" onChange={e => setBrand(e.target.value)}/> Nike</label>
                    <label><input type="radio" name="brand" value="Adidas" onChange={e => setBrand(e.target.value)}/> Adidas</label>
                    <label><input type="radio" name="brand" value="Zara" onChange={e => setBrand(e.target.value)}/> Zara</label>
                </div>

            </div>

            <div className='slider-sc'>
                <Slider min={0} max={100} value={isValue} onChange={(e) => { setValue(e)}} className='slider-sc'/>
                <p>Prezzo: <b>€{isValue}</b></p>
            </div>

            <div className='slider-sc'>
                <button className='btn-fill' onClick={(e) => Filter_Selection(e.preventDefault())}>Cerca...</button>
                <button type="reset" className='btn-fill' onClick={() => Reset_Check()}>Azzera</button>
            </div>
        </form>
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
