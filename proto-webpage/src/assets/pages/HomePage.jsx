import React from 'react'
import Header from "../components/Header"
import Hero from "../components/Hero"
import Categories from "../components/CategoriesSections"
import Promo from "../components/PromoSection"
import Products from "../components/ProductsSections"
import Footer from "../components/FooterSections"

export default function HomaPage() {
  return (
    <>
    <Header />
    <Hero />
    <Categories />
    <Promo />
    <Products />
    <Footer />
    </>
  )
}
