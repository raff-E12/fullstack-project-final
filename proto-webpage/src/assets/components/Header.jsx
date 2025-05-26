import React, { useState } from 'react'
import { slide as HamMenu } from "react-burger-menu"
import "../css/HamMenuStyle.css"
import { Spiral as Hamburger } from 'hamburger-react'
import { Link } from 'react-router'
import Cross from "../../../public/icons/xmark-solid.svg"

export default function Header() {
  const [isHam, setHam] = useState(false);
  return (
    <>
    <header>
      <div class="logo">ModaLux</div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <a href="#">Profilo</a>
        <a href="#">Carrello</a>
      </nav>
    <Hamburger toggled={isHam} toggle={setHam} />
  </header>
    <HamMenu pageWrapId='slide' left width={"300px"} isOpen={isHam} onStateChange={({isOpen}) => setHam(isOpen)} id='ham-menu' disableOverlayClick customCrossIcon={ <img src={Cross} /> }> 
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
