import React, { useState } from 'react'
import { slide as HamMenu } from "react-burger-menu"
import "../css/HamMenuStyle.css"
import { Spiral as Hamburger } from 'hamburger-react'
import { Link } from 'react-router'

export default function Header() {
  const [isOpen, setOpen] = useState(false)
  return (
    <>
    <header>
      <div class="logo">ModaLux</div>
      <nav>
        <Link to="/">Home</Link>
        <a href="#">Shop</a>
        <Link to="/contact">Contatti</Link>
        <a href="#">Profilo</a>
        <a href="#">Carrello</a>
      </nav>
    <Hamburger toggled={isOpen} toggle={setOpen} />
  </header>
    <HamMenu pageWrapId='slide' left width={"300px"} isOpen={isOpen} onStateChange={({isOpen}) => setOpen(isOpen)}> 
    {/* state.isOpen ---> isOpen (Oggetto state dal HamMenu)*/}
        <a href="#">Home</a>
        <a href="#">Donna</a>
        <a href="#">Uomo</a>
        <a href="#">Accessori</a>
        <a href="#">Contatti</a>
    </HamMenu>
    </>
  )
}
