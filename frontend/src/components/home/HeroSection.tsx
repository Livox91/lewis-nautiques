import { useNavigate } from 'react-router-dom';
import { OceanShader } from './OceanShader';

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <header className="relative w-full h-screen min-h-[640px] overflow-hidden flex items-center justify-center">
      {/* WebGL ocean background */}
      <div className="absolute inset-0 z-0 opacity-70">
        <OceanShader className="w-full h-full" />
      </div>

      {/* Gradient fade to surface at bottom */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 max-w-container mx-auto px-gutter text-center">
        {/* Eyebrow */}
        <div className="mb-10 overflow-hidden">
          <span className="block font-sans text-label-caps text-primary tracking-[0.4em] animate-fade-in">
            ESTABLISHED 2024
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-display-mobile md:text-display-lg text-on-surface mb-6 animate-fade-in"
          style={{ animationDelay: '200ms', animationFillMode: 'both' }}
        >
          The Art of{' '}
          <em className="italic text-primary not-italic" style={{ fontStyle: 'italic' }}>
            the Ocean
          </em>
        </h1>

        {/* Sub */}
        <p
          className="font-sans text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-12 opacity-85 animate-fade-in"
          style={{ animationDelay: '400ms', animationFillMode: 'both' }}
        >
          Precision Performance. Caribbean Soul. Experience the pinnacle of nautical
          engineering and bespoke luxury.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
          style={{ animationDelay: '600ms', animationFillMode: 'both' }}
        >
          <button onClick={() => navigate('/fleet')} className="btn-primary">
            Explore The Fleet
          </button>
          <button onClick={() => navigate('/bespoke')} className="btn-ghost">
            Bespoke Commission
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 opacity-40 animate-bounce-slow">
        <span className="material-symbols-outlined text-on-surface text-3xl">expand_more</span>
      </div>
    </header>
  );
}
