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
}
