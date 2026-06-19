import { useScrollReveal } from '../../hooks/useScrollReveal';

export function HeritageSection() {
  const imgRef = useScrollReveal<HTMLDivElement>();
  const textRef = useScrollReveal<HTMLDivElement>(150);

  return (
    <section className="relative py-section-desktop bg-surface-container-lowest overflow-hidden">
      {/* Ambient shader background — very subtle */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none select-none">
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 80% 50%, #1D4E89 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          {/* Image */}
          <div ref={imgRef} className="order-2 md:order-1">
            <div className="aspect-square bg-surface border border-outline-variant/10 p-1">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Vintage nautical map and titanium compass"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Text */}
          <div ref={textRef} className="order-1 md:order-2">
            <span className="font-sans text-label-caps text-primary tracking-[0.3em] mb-6 block">
              OUR ROOTS
            </span>
            <h2 className="font-serif text-headline-md text-on-surface mb-8">
              Authentic Luxury
            </h2>
            <div className="space-y-6 font-sans text-body-lg text-on-surface-variant leading-relaxed">
              <p>
                Lewis Nautiques was born from a singular vision: to bridge the gap between
                European naval engineering and the untamed spirit of the Caribbean.
              </p>
              <p>
                We believe luxury isn't about excess; it's about the confidence that comes
                from flawless execution. Our vessels are built to navigate the most
                challenging passages with quiet power and undeniable presence.
              </p>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <div className="w-20 h-px bg-primary" />
              <span className="font-serif text-headline-sm italic text-on-surface">
                Lewis Nautiques
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
