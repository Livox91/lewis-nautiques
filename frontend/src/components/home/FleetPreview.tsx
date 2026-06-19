import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useBoats } from '../../hooks/useBoats';

export function FleetPreview() {
  const { boats, loading } = useBoats(true);
  const headerRef = useScrollReveal<HTMLDivElement>();

  const displayBoats = loading
    ? Array(4).fill(null)
    : boats.slice(0, 4);

  return (
    <section className="py-section-desktop bg-background">
      <div className="max-w-container mx-auto px-gutter">
        {/* Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
        >
          <div className="max-w-xl">
            <h2 className="font-serif text-headline-md text-on-surface mb-4">The Fleet</h2>
            <p className="font-sans text-body-md text-on-surface-variant">
              A collection of performance vessels designed for the discerning explorer.
            </p>
          </div>
          <Link
            to="/fleet"
            className="font-sans text-label-caps text-primary flex items-center gap-2 group shrink-0"
          >
            VIEW ALL MODELS
            <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayBoats.map((boat, i) => (
            <FleetPreviewCard key={boat?.id ?? i} boat={boat} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetPreviewCard({ boat, delay }: { boat: { id: string; name: string; image_url: string; engine_config: string; top_speed_kts: number; length_ft: number; badge_label: string; slug: string } | null; delay: number }) {
  const ref = useScrollReveal<HTMLDivElement>(delay);

  if (!boat) {
    return (
      <div ref={ref} className="flex flex-col">
        <div className="aspect-[3/4] bg-surface-container-high animate-pulse mb-6" />
        <div className="h-4 bg-surface-container-high w-3/4 animate-pulse mb-2" />
        <div className="h-3 bg-surface-container w-1/2 animate-pulse" />
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Link to={`/fleet/${boat.slug}`} className="flex flex-col group cursor-pointer">
        <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container-high relative">
          <img
            src={boat.image_url}
            alt={boat.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 bg-background/80 backdrop-blur-sm font-sans text-[10px] text-on-surface tracking-widest uppercase">
              {boat.badge_label}
            </span>
          </div>
        </div>
        <h3 className="font-serif text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors duration-300">
          {boat.name}
        </h3>
        <p className="font-sans text-mono-data text-on-surface-variant">
          {boat.length_ft > 0 ? `${boat.length_ft}ft` : 'Custom'} | {boat.engine_config.split(' ').slice(0, 2).join(' ')} | {boat.top_speed_kts}kts
        </p>
      </Link>
    </div>
  );
}
