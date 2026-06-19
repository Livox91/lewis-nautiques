import { HeroSection } from '../components/home/HeroSection';
import { TechSection } from '../components/home/TechSection';
import { InteriorSection } from '../components/home/InteriorSection';
import { FleetPreview } from '../components/home/FleetPreview';
import { HeritageSection } from '../components/home/HeritageSection';

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <TechSection />
      <InteriorSection />
      <FleetPreview />
      <HeritageSection />
    </main>
  );
}
