import React from 'react'
import Sliders from '../components/Sliders'
import CardSections from '../components-layouts/CardSections'
import { UseContextProd } from '../context/ProductsContext'

export default function Homepage() {
  const { isProd, setProd } = UseContextProd()
  return (
    <>
      <div className='container-xxl p-0'>
        <Sliders />
      </div>
      <CardSections />
    </>
  )
}
