import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const materials = [
  {
    title: 'Heritage Leathers',
    code: 'REF: LN-LTR-042',
    desc: 'Hand-selected, marine-grade hides from the finest tanneries in Tuscany, treated for salt-air resilience.',
    img: 'https://images.unsplash.com/photo-1548438294-1ad5d5f4f063?w=600&q=80',
  },
  {
    title: 'Bespoke Composites',
    code: 'REF: LN-CF-900',
    desc: 'Advanced carbon fiber weaves and titanium alloys engineered for structural integrity and weight reduction.',
    img: 'https://images.unsplash.com/photo-1533760881669-80db4d7b341d?w=600&q=80',
  },
  {
    title: 'Artisanal Decking',
    code: 'REF: LN-WD-712',
    desc: 'Sustainably sourced teak, precision-cut and hand-caulked for a seamless transition from deck to hull.',
    img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
  },
];

const steps = [
  {
    n: '01',
    title: 'The Hull Foundation',
    desc: 'Select your performance profile — from agile offshore cruisers to stable luxury platforms.',
  },
  {
    n: '02',
    title: 'Propulsion & Power',
    desc: 'Hybrid diesel-electric or pure V12 performance. Tailored to your range requirements.',
  },
  {
    n: '03',
    title: 'Interior Architecture',
    desc: 'Collaborate with our designers to configure layouts, lighting, and entertainment suites.',
  },
  {
    n: '04',
    title: 'Smart Command',
    desc: 'Integration of bespoke navigation interfaces and autonomous docking technologies.',
  },
];

export function BespokePage() {
  const navigate = useNavigate();
  const heroRef = useScrollReveal<HTMLDivElement>();
  const materialsRef = useScrollReveal<HTMLDivElement>(100);
  const stepsRef = useScrollReveal<HTMLDivElement>();
  const ctaRef = useScrollReveal<HTMLDivElement>(100);

  useEffect(() => {
    document.title = 'Bespoke Commission | LEWIS NAUTIQUES';
  }, []);

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
            alt="Bespoke luxury yacht"
            className="w-full h-full object-cover brightness-50"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
        </div>

        <div ref={heroRef} className="relative z-10 max-w-container mx-auto px-gutter grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="font-sans text-label-caps text-primary tracking-[0.4em]">
              PRIVATE COMMISSION
            </span>
            <h1 className="font-serif text-display-mobile md:text-display-lg text-on-surface">
              Your Ocean.
              <br />
              <span className="text-primary">Your Vision.</span>
            </h1>
            <p className="font-sans text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              The Bespoke Experience is a deep collaboration between naval architect and owner.
              Every stitch, every technical specification, and every curve of the hull is an
              expression of your legacy.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/contact')} className="btn-pearl">
                Start Configuration
              </button>
              <button onClick={() => navigate('/fleet')} className="btn-ghost">
                The Portfolio
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce-slow opacity-50">
          <span className="font-sans text-[10px] tracking-widest text-on-surface-variant">SCROLL TO EXPLORE</span>
          <span className="material-symbols-outlined text-sm">keyboard_arrow_down</span>
        </div>
      </section>

      {/* Materials */}
      <section className="py-section-desktop bg-surface-container-lowest">
        <div className="max-w-container mx-auto px-gutter">
          <div ref={materialsRef} className="flex flex-col items-center mb-24 text-center">
            <span className="font-sans text-label-caps text-primary tracking-[0.3em] mb-4">
              PRECISION CRAFTSMANSHIP
            </span>
            <h2 className="font-serif text-headline-md text-on-surface mb-6">
              A Symphony of Materials
            </h2>
            <div className="w-24 h-px bg-primary/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((m, i) => (
              <MaterialCard key={i} {...m} />
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-section-desktop bg-background overflow-hidden">
        <div className="max-w-container mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
            {/* Steps */}
            <div ref={stepsRef} className="lg:col-span-5 flex flex-col gap-12">
              <div>
                <span className="font-sans text-label-caps text-primary tracking-[0.3em] mb-4 block">
                  THE PROCESS
                </span>
                <h2 className="font-serif text-display-mobile md:text-display-lg text-on-surface">
                  Genesis of Excellence
                </h2>
              </div>
              <div className="flex flex-col gap-10">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-8 group cursor-default">
                    <div className="flex flex-col items-center shrink-0">
                      <span className="w-10 h-10 rounded-full border border-primary flex items-center justify-center font-sans text-mono-data text-primary group-hover:bg-primary group-hover:text-primary-container transition-all duration-300">
                        {s.n}
                      </span>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-outline-variant/30 mt-4 min-h-[32px]" />
                      )}
                    </div>
                    <div className={`flex flex-col gap-2 ${i < steps.length - 1 ? 'pb-10 border-b border-outline-variant/10' : ''}`}>
                      <h4 className="font-serif text-headline-sm text-on-surface group-hover:text-primary transition-colors duration-300">
                        {s.title}
                      </h4>
                      <p className="font-sans text-body-md text-on-surface-variant">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview image */}
            <div className="lg:col-start-7 lg:col-span-6 relative">
              <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden chamfer-edge">
                <img
                  src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=900&q=80"
                  alt="Bespoke yacht configuration"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Glass overlay UI */}
                <div className="absolute inset-0 p-10 flex flex-col justify-between pointer-events-none">
                  <div className="flex justify-between items-start">
                    <div className="glass-nav p-5 flex flex-col gap-1 border-t border-outline-variant/20">
                      <span className="font-sans text-[10px] text-primary tracking-widest">CONFIG_ID</span>
                      <span className="font-sans text-mono-data text-on-surface">LNX-2024-ALPHA</span>
                    </div>
                  </div>
                  <div className="glass-nav p-6 border-t border-outline-variant/20 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-label-caps text-on-surface">Hull Color</span>
                      <span className="font-sans text-mono-data text-on-surface-variant">Midnight Obsidian</span>
                    </div>
                    <div className="w-full h-0.5 bg-outline-variant/30 relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-3/4 bg-primary" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-sans text-label-caps text-on-surface">Stage</span>
                      <span className="font-sans text-mono-data text-primary">Material Finalization</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-section-desktop bg-surface-container-lowest">
        <div ref={ctaRef} className="max-w-container mx-auto px-gutter text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center gap-8">
            <span className="font-sans text-label-caps text-primary tracking-[0.4em]">
              THE FINAL STEP
            </span>
            <h2 className="font-serif text-display-mobile md:text-display-lg text-on-surface">
              Begin Your Private Commission
            </h2>
            <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed">
              Our Bespoke representatives are available for private consultations at our
              offices in Monaco, Miami, and Saint Barthélemy, or at a location of your
              convenience.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-sm justify-center">
              <button onClick={() => navigate('/contact')} className="btn-pearl flex-1">
                Request Appointment
              </button>
            </div>
            <p className="font-sans text-[11px] text-on-surface-variant/50 tracking-widest uppercase">
              Strict confidentiality guaranteed for all commissions
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function MaterialCard({ title, code, desc, img }: (typeof materials)[number]) {
  const cardRef = useScrollReveal<HTMLDivElement>(100);
  return (
    <div ref={cardRef} className="group relative overflow-hidden bg-surface-container-low p-8 border-t border-outline-variant/10">
      <div className="aspect-square mb-8 overflow-hidden">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          loading="lazy"
          decoding="async"
        />
      </div>
      <h3 className="font-serif text-headline-sm text-on-surface mb-2">{title}</h3>
      <p className="font-sans text-body-md text-on-surface-variant mb-6">{desc}</p>
      <span className="font-sans text-mono-data text-primary">{code}</span>
    </div>
  );
}
