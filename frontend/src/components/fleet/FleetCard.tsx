import { Link } from 'react-router-dom';
import type { Boat } from '../../types';
import { cn } from '../../utils/cn';

interface Props {
  boat: Boat;
  variant?: 'tall' | 'wide' | 'standard';
  className?: string;
}

export function FleetCard({ boat, variant = 'standard', className }: Props) {
  const isTall = variant === 'tall';
  const isWide = variant === 'wide';

  if (isWide) {
    return (
      <Link
        to={`/fleet/${boat.slug}`}
        className={cn(
          'group relative overflow-hidden hull-card flex flex-col md:flex-row',
          className
        )}
      >
        {/* Wide image panel */}
        <div className="w-full md:w-2/3 h-64 md:h-auto relative overflow-hidden">
          <img
            src={boat.image_url}
            alt={boat.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface hidden md:block pointer-events-none" />
        </div>

        {/* Info panel */}
        <div className="w-full md:w-1/3 p-10 flex flex-col justify-center">
          <span className="font-sans text-label-caps text-primary tracking-widest border-l-2 border-primary pl-4 mb-4 block">
            {boat.badge_label.toUpperCase()}
          </span>
          <h3 className="font-serif text-headline-md text-on-surface mb-4">{boat.name}</h3>
          <p className="font-sans text-body-md text-on-surface-variant mb-8 line-clamp-3">
            {boat.tagline}
          </p>
          <div className="space-y-3 mb-8">
            {Object.entries(boat.specs).slice(0, 4).map(([key, val]) => (
              <div
                key={key}
                className="flex justify-between border-b border-outline-variant/20 pb-2"
              >
                <span className="font-sans text-label-caps text-on-surface-variant">{key}</span>
                <span className="font-sans text-mono-data text-on-surface">{val}</span>
              </div>
            ))}
          </div>
          <span className="font-sans text-label-caps text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
            EXPLORE SPECS
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/fleet/${boat.slug}`}
      className={cn(
        'group relative overflow-hidden hull-card flex flex-col justify-end p-10',
        isTall ? 'min-h-[600px]' : 'min-h-[480px]',
        className
      )}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={boat.image_url}
          alt={boat.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 ship-gradient pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <span className="font-sans text-label-caps text-primary tracking-widest border-l-2 border-primary pl-4 mb-4 block">
          {boat.badge_label.toUpperCase()}
        </span>
        <h3 className="font-serif text-headline-md text-on-surface mb-2">{boat.name}</h3>
        {isTall && (
          <p className="font-sans text-body-md text-on-surface-variant max-w-sm mb-6 line-clamp-2">
            {boat.tagline}
          </p>
        )}
        <div className="flex gap-6 border-t border-outline-variant/30 pt-4 mt-4">
          <div>
            <p className="font-sans text-label-caps text-on-surface-variant">Top Speed</p>
            <p className="font-sans text-mono-data text-on-surface">{boat.top_speed_kts} KTS</p>
          </div>
          <div>
            <p className="font-sans text-label-caps text-on-surface-variant">Range</p>
            <p className="font-sans text-mono-data text-on-surface">
              {boat.range_nm > 0 ? `${boat.range_nm} NM` : 'Custom'}
            </p>
          </div>
          <div>
            <p className="font-sans text-label-caps text-on-surface-variant">Power</p>
            <p className="font-sans text-mono-data text-on-surface">
              {boat.horsepower.toLocaleString()} HP
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
