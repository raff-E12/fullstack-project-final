import React from 'react'
import Sliders from '../components/Sliders'
import CardSections from '../components-layouts/CardSections'

export default function Homepage() {
  return (
    <>
      <div className='container-xxl p-0'>
        <Sliders />
      </div>
      <CardSections />
    </>
  )
}
