import React from 'react'
import Cards from "../components/Cards"
import { UseContextProd } from '../context/ProductsContext'

export default function CardSections() {
  const { isProd, setProd } = UseContextProd()

  return (
    <div className='container-xxl p-4 hd-cards'>
        <Cards />
    </div>
  )
}
