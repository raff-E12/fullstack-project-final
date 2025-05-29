import Sliders from "../components/Sliders";
import HeroCard from "../components/HeroCard";
import { HomeProductSection } from "../components/HomeProductSection";
import Social from "../components/Social";

export default function Homepage() {
  return (
    <div>
      <Sliders />
      <HomeProductSection />
      <Social />
      <HeroCard />
    </div>
  );
}
