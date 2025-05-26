import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import FooterSections from '../components/FooterSections'
import SearchBar from '../components/SearchBar'
import Slider from 'rc-slider';
import "../css/FilterMenu.css"
import 'rc-slider/assets/index.css';
import ConatinersCards from '../contents/ConatinersCards';
import { Api_Context_Prod, Use_ContextProd } from '../context/Prod_Context';

export default function ShopPage() {
    const [isOpen, setOpen] = useState(false);
    const { isValue, setValue, isCategory, 
    setCategory, isBrand, setBrand, Filter_Selection, Reset_Check, isDress,
    setDress, isDisabled } = Use_ContextProd();
    
  return (
    <>
    <Header />
<div className='shop-sc'>

    <div id='filter-menu' className={`${!isOpen ? "close" : "open"}`}>
        <h2>Capi</h2>
        <div class="categories">
            <input class="category-btn" type="button" value="Polo & T-Shirt" name="Polo & T-Shirt" onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
            <input class="category-btn" type="button" value="Capispalla" name="Capispalla" onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
            <input class="category-btn" type="button" value="Felpe" name="Felpe" onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
            <input class="category-btn" type="button" value="Pantaloni" name="Pantaloni" onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
            <input class="category-btn" type="button" value="Scarpe" name="Scarpe" onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
            <input class="category-btn" type="button" value="Streetwear" name="Streetwear" onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
        </div>
        <h2>Extra</h2>
        <div class="categories">
           <input class="category-btn" type="button" value="Saldi" name='Saldi' onClick={(e) => setDress(e.target.value)} disabled={isDisabled ? "disabled" : ""}/>
           <input class="category-btn" type="button" value="Reset" name='Reset' onClick={(e) => setDress(e.target.value)}/>
        </div>
    </div>

    <div className='show-products'>
        <form class="sidebar">
            <div className='sidebar-info'>
                <div className='sidebar-box'>
                    <h3>Categorie</h3>
                    <label><input type="radio"  name="category" value="Polo & T-Shirt" onChange={e => setCategory(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Polo & T-Shirt</label>
                    <label><input type="radio" name="category" value="Capispalla" onChange={e => setCategory(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Capispalla</label>
                    <label><input type="radio" name="category" value="Felpe" onChange={e => setCategory(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Felpe</label>
                    <label><input type="radio"  name="category" value="Pantaloni" onChange={e => setCategory(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Pantaloni</label>
                    <label><input type="radio" name="category" value="Scarpe" onChange={e => setCategory(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Scarpe</label>
                    <label><input type="radio" name="category" value="Streetwear" onChange={e => setCategory(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Streetwear</label>
                </div>

                <div className='sidebar-box'>
                    <h3>Brand</h3>
                    <label><input type="radio" name="brand" value="FRED PERRY" onChange={e => setBrand(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Fred Perry</label>
                    <label><input type="radio" name="brand" value="BARROW" onChange={e => setBrand(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Barrow</label>
                    <label><input type="radio" name="brand" value="DEPARTMENT FIVE" onChange={e => setBrand(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Department Five</label>
                    <label><input type="radio" name="brand" value="HERNO" onChange={e => setBrand(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Herno</label>
                    <label><input type="radio" name="brand" value="PHILIPPE MODEL" onChange={e => setBrand(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> Philippe Model</label>
                    <label><input type="radio" name="brand" value="C.P. COMPANY" onChange={e => setBrand(e.target.value)} disabled={isDisabled ? "disabled" : ""}/> C.P. Company</label>
                </div>

            </div>

            <div className='slider-sc'>
                <Slider min={0} max={100} value={isValue} onChange={(e) => { setValue(e)}} className='slider-sc' disabled={isDisabled ? "disabled" : ""}/>
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
