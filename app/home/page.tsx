import AppFeatures from "../components/appFeature";
import CarygooSimpleFeatures from "../components/carygooFeature";
import CarygooGlobeCoverage from "../components/carygooGlobeCoverage";
import CarygooHub from "../components/carygooHub";
import Hero from "../components/hero";
import ServiceCoverage from "../components/services";
import MotionLogoCarousel from "../components/trusted";
import CarygooStatsDark from '../components/carygooStatsDark';
import Solutions from "../components/solutions";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <MotionLogoCarousel />
      <CarygooHub />
      <ServiceCoverage />
      <Solutions />
      <CarygooSimpleFeatures />
      <AppFeatures />
      <CarygooGlobeCoverage />
      <CarygooStatsDark />
    </main>
  );
}