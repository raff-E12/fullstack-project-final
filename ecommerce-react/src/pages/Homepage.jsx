import React from "react";
import Sliders from "../components/Sliders";
import HeroCard from "../components/HeroCard";
import Sliders from "../components/Sliders";
import CardSections from "../components-layouts/CardSections";

export default function Homepage() {
  return (
    <div>
      <Sliders />
      <CardSections />
      <HeroCard />
    </div>
  );
}
