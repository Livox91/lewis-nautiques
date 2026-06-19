import { useScrollReveal } from '../../hooks/useScrollReveal';

export function InteriorSection() {
  const titleRef = useScrollReveal<HTMLDivElement>();
  const imgRef = useScrollReveal<HTMLDivElement>();
  const cardsRef = useScrollReveal<HTMLDivElement>(150);

  return (
    <section className="py-section-desktop bg-surface-container-low">
      <div className="max-w-container mx-auto px-gutter">
        {/* Header */}
        <div ref={titleRef} className="max-w-3xl mb-16">
          <span className="font-sans text-label-caps text-primary tracking-[0.3em] mb-4 block">
            MATERIALS &amp; CRAFT
          </span>
          <h2 className="font-serif text-headline-md text-on-surface">
            Handcrafted Luxury
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Main image */}
          <div ref={imgRef} className="md:col-span-8">
            <div className="aspect-video bg-surface-container overflow-hidden relative group">
              <img
                src="https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=1000&q=80"
                alt="Luxury yacht cockpit with premium leather and carbon fiber"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-primary/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

          {/* Feature cards */}
          <div ref={cardsRef} className="md:col-span-4 flex flex-col justify-center gap-6">
            <div className="p-8 hull-card border-l-2 border-primary">
              <h3 className="font-serif text-headline-sm text-on-surface mb-4">
                The Command Center
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant">
                Carbon fiber trim and glass-bridge technology integrate seamlessly
                with hand-stitched marine leathers.
              </p>
            </div>
            <div className="p-8 hull-card border-l-2 border-outline">
              <h3 className="font-serif text-headline-sm text-on-surface mb-4">
                Bespoke Finishes
              </h3>
              <p className="font-sans text-body-md text-on-surface-variant">
                Choose from a palette of titanium silvers and midnight blues,
                tailored to your exact specification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
