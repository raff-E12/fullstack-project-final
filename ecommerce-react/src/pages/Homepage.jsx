<<<<<<< HEAD
import React from "react";
import Sliders from "../components/Sliders";
import HeroCard from "../components/HeroCard";
import CardSections from "../components-layouts/CardSections";
import { HomeProductSection } from "../components/HomeProductSection";

export default function Homepage() {
  return (
    <div>
      <Sliders />
      <HomeProductSection />

      <HeroCard />
    </div>
  );
=======
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
>>>>>>> ProductPage
}
