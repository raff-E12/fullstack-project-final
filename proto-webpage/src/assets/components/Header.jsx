import React from 'react'
import { slide as HamMenu } from "react-burger-menu"
import "../css/HamMenuStyle.css"

export default function Header() {
  return (
    <>
    <header>
      <div class="logo">ModaLux</div>
      <nav>
        <a href="#">Home</a>
        <a href="#">Donna</a>
        <a href="#">Uomo</a>
        <a href="#">Accessori</a>
        <a href="#">Contatti</a>
      </nav>
      <HamMenu pageWrapId='slide' left>
          <a href="#">Home</a>
          <a href="#">Donna</a>
          <a href="#">Uomo</a>
          <a href="#">Accessori</a>
          <a href="#">Contatti</a>
      </HamMenu>
  </header>
    </>
  )
}
