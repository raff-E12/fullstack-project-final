import React from 'react'
import Sliders from '../components/Sliders'
import CardSections from '../components-layouts/CardSections'
import Social from '../components/Social'

export default function Homepage() {
  return (
    <>
      <div className='container-xxl p-0'>
        <Sliders />
      </div>
      <CardSections />
      <Social />
    </>
  )
}
