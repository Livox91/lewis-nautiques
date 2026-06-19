import { useScrollReveal } from '../../hooks/useScrollReveal';

export function TechSection() {
  const textRef = useScrollReveal<HTMLDivElement>();
  const imgRef = useScrollReveal<HTMLDivElement>(150);

  return (
    <section className="py-section-desktop bg-background">
      <div className="max-w-container mx-auto px-gutter grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Text */}
        <div ref={textRef} className="md:col-span-5">
          <span className="font-sans text-label-caps text-primary tracking-[0.3em] mb-4 block">
            ENGINEERING PRECISION
          </span>
          <h2 className="font-serif text-headline-md text-on-surface mb-8">
            Technical Superiority
          </h2>
          <p className="font-sans text-body-md text-on-surface-variant mb-12 leading-relaxed">
            Inspired by high-performance automotive architecture, Lewis Nautiques vessels
            feature triple and quad-engine configurations that redefine speed and stability.
            Every component is stress-tested to endure the most demanding tropical waters.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/20 pt-8">
            <div>
              <span className="block font-serif text-headline-md text-primary mb-1">1200+</span>
              <span className="font-sans text-label-caps text-on-surface-variant">HORSEPOWER</span>
            </div>
            <div>
              <span className="block font-serif text-headline-md text-primary mb-1">74</span>
              <span className="font-sans text-label-caps text-on-surface-variant">KNOTS MAX</span>
            </div>
          </div>
        </div>

        {/* Image */}
        <div ref={imgRef} className="md:col-span-7 relative">
          <div className="aspect-[16/9] md:aspect-[4/3] bg-surface-container overflow-hidden shimmer-card">
            <img
              src="https://images.unsplash.com/photo-1533760881669-80db4d7b341d?w=900&q=80"
              alt="High-performance marine outboard engines"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
