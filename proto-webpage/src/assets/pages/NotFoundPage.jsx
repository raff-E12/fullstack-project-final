import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router'
import Footer from "../components/FooterSections"

export default function NotFoundPage() {
  return (
    <>
    <Header />
    <div className='container-not'>
        <div className='box-text-not'>
            <h2><b>404</b> - Non Trovato</h2>
            <Link to="/" className='btn-link'>Ritorna Alla Home</Link>
        </div>
    </div>
    <Footer />
    </>
  )
}
