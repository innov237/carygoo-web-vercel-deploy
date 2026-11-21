import AppFeatures from "../components/appFeature";
import SiaraSimpleFeatures from "../components/siaraFeature";
import SiaraGlobeCoverage from "../components/siaraGlobeCoverage";
import SiaraHub from "../components/siaraHub";
import Hero from "../components/hero";
import ServiceCoverage from "../components/services";
import MotionLogoCarousel from "../components/trusted";
import SiaraStatsDark from '../components/siaraStatsDark';
import Solutions from "../components/solutions";
import SuperAppServices from "../components/superAppServices";

export default function HomePage() {
  return (
    <main className="flex flex-col w-full overflow-x-hidden">
      <Hero />
      <SuperAppServices />
      <MotionLogoCarousel />
      <SiaraHub />
      <ServiceCoverage />
      <Solutions />
      <SiaraSimpleFeatures />
      <AppFeatures />
      <SiaraGlobeCoverage />
      <SiaraStatsDark />
    </main>
  );
}