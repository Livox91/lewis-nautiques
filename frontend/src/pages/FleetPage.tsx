import { useEffect } from 'react';
import { useBoats } from '../hooks/useBoats';
import { FleetCard } from '../components/fleet/FleetCard';
import { OceanShader } from '../components/home/OceanShader';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function FleetPage() {
  const { boats, loading, error } = useBoats();
  const headerRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = 'Fleet | LEWIS NAUTIQUES';
  }, []);

  const [featured, ...rest] = boats;
  const shadow = rest[0];
  const flagship = rest[1];
  const bespoke = rest[2];

  return (
    <main>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
            alt="Lewis Nautiques fleet of luxury vessels"
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 max-w-container mx-auto px-gutter pb-section-mobile md:pb-24 w-full">
          <p className="font-sans text-label-caps text-primary tracking-[0.3em] mb-4">
            THE 2024 COLLECTION
          </p>
          <h1 className="font-serif text-display-mobile md:text-display-lg text-on-surface leading-tight mb-8">
            Engineering the Apex
            <br className="hidden md:block" />
            of Marine Power.
          </h1>
        </div>
      </section>

      {/* Fleet Grid */}
      <section className="relative py-section-desktop bg-background overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 opacity-8 pointer-events-none">
          <OceanShader className="w-full h-full" />
        </div>

        <div className="relative z-10 max-w-container mx-auto px-gutter">
          {/* Section header */}
          <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="font-serif text-headline-md text-on-surface">The Precision Lineup</h2>
            <p className="font-sans text-body-md text-on-surface-variant max-w-md">
              Each vessel is hand-assembled to exacting naval standards, combining raw
              power with bespoke Caribbean craftsmanship.
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-8 h-[600px] bg-surface-container-high animate-pulse" />
              <div className="md:col-span-4 h-[600px] bg-surface-container-high animate-pulse" />
              <div className="md:col-span-12 h-[500px] bg-surface-container-high animate-pulse" />
            </div>
          )}

          {error && (
            <div className="text-center py-24">
              <p className="font-sans text-body-md text-error mb-6">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="btn-ghost"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && boats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              {/* LN-42 Stealth — large card */}
              {featured && (
                <div className="md:col-span-8">
                  <FleetCard boat={featured} variant="tall" className="h-full min-h-[600px]" />
                </div>
              )}
              {/* LN-37 Shadow — vertical card */}
              {shadow && (
                <div className="md:col-span-4">
                  <FleetCard boat={shadow} variant="tall" className="h-full min-h-[600px]" />
                </div>
              )}
              {/* LN-50 Heritage — wide flagship card */}
              {flagship && (
                <div className="md:col-span-12">
                  <FleetCard boat={flagship} variant="wide" className="min-h-[500px]" />
                </div>
              )}
              {/* Bespoke One */}
              {bespoke && (
                <div className="md:col-span-12">
                  <FleetCard boat={bespoke} variant="wide" className="min-h-[420px]" />
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
