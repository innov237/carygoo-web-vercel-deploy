import AppFeatures from "../components/appFeature";
import CarygooSimpleFeatures from "../components/carygooFeature";
import Hero from "../components/hero";
import ServiceCoverage from "../components/services";
import MotionLogoCarousel from "../components/trusted";
import CarygooStatsDark from '../components/carygooStatsDark';

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <MotionLogoCarousel />
      <ServiceCoverage />
      <CarygooSimpleFeatures />
      <AppFeatures />
      <CarygooStatsDark />
    </main>
  );
}