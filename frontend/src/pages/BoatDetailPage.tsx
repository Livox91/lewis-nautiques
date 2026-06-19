import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useBoat } from '../hooks/useBoats';
import { InquiryForm } from '../components/inquiry/InquiryForm';

export function BoatDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { boat, loading, error } = useBoat(slug ?? '');
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    if (boat) document.title = `${boat.name} | LEWIS NAUTIQUES`;
  }, [boat]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background pt-32">
        <div className="max-w-container mx-auto px-gutter">
          <div className="h-[60vh] bg-surface-container-high animate-pulse mb-8" />
          <div className="h-8 bg-surface-container w-1/3 animate-pulse mb-4" />
          <div className="h-4 bg-surface-container w-2/3 animate-pulse" />
        </div>
      </main>
    );
  }

  if (error || !boat) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="font-sans text-label-caps text-primary tracking-widest mb-4">NOT FOUND</p>
          <h1 className="font-serif text-headline-md text-on-surface mb-8">Vessel not found</h1>
          <button onClick={() => navigate('/fleet')} className="btn-primary">View All Fleet</button>
        </div>
      </main>
    );
  }

  const allImages = [boat.image_url, ...boat.gallery_urls.filter((u) => u !== boat.image_url)];

  return (
    <main className="bg-background">
      {/* Hero image */}
      <div className="relative h-[60vh] md:h-[75vh] overflow-hidden">
        <img
          src={allImages[activeImg]}
          alt={boat.name}
          className="w-full h-full object-cover transition-opacity duration-500"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        {/* Back */}
        <Link
          to="/fleet"
          className="absolute top-28 left-gutter flex items-center gap-2 font-sans text-label-caps text-on-surface-variant hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          THE FLEET
        </Link>
        {/* Badge */}
        <div className="absolute bottom-8 left-gutter">
          <span className="px-3 py-1.5 bg-background/80 backdrop-blur-sm font-sans text-[10px] text-on-surface tracking-widest uppercase">
            {boat.badge_label}
          </span>
        </div>
      </div>

      {/* Thumbnail gallery */}
      {allImages.length > 1 && (
        <div className="max-w-container mx-auto px-gutter mt-4 flex gap-3 overflow-x-auto pb-2">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`flex-shrink-0 w-20 h-14 overflow-hidden border-2 transition-colors ${
                activeImg === i ? 'border-primary' : 'border-transparent'
              }`}
            >
              <img
                src={src}
                alt={`${boat.name} view ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="max-w-container mx-auto px-gutter py-section-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Left — boat info */}
          <div className="lg:col-span-7">
            <span className="font-sans text-label-caps text-primary tracking-[0.3em] block mb-4">
              {boat.series.toUpperCase()}
            </span>
            <h1 className="font-serif text-display-mobile md:text-headline-md text-on-surface mb-6">
              {boat.name}
            </h1>
            <p className="font-serif text-headline-sm text-on-surface-variant italic mb-8">
              {boat.tagline}
            </p>
            <p className="font-sans text-body-lg text-on-surface-variant leading-relaxed mb-16">
              {boat.description}
            </p>

            {/* Performance stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-b border-outline-variant/20 py-10 mb-16">
              <div className="text-center">
                <p className="font-serif text-display-mobile text-primary mb-1">
                  {boat.top_speed_kts}
                </p>
                <p className="font-sans text-label-caps text-on-surface-variant">KTS MAX</p>
              </div>
              <div className="text-center border-x border-outline-variant/20">
                <p className="font-serif text-display-mobile text-primary mb-1">
                  {boat.horsepower.toLocaleString()}
                </p>
                <p className="font-sans text-label-caps text-on-surface-variant">HORSEPOWER</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-display-mobile text-primary mb-1">
                  {boat.range_nm > 0 ? boat.range_nm : '—'}
                </p>
                <p className="font-sans text-label-caps text-on-surface-variant">
                  {boat.range_nm > 0 ? 'NM RANGE' : 'CUSTOM'}
                </p>
              </div>
            </div>

            {/* Full specs table */}
            <h2 className="font-sans text-label-caps text-primary tracking-[0.3em] mb-8">
              FULL SPECIFICATIONS
            </h2>
            <div className="space-y-0">
              {Object.entries(boat.specs).map(([key, val], i) => (
                <div
                  key={key}
                  className={`flex justify-between py-4 border-b border-outline-variant/20 ${
                    i % 2 === 0 ? '' : 'bg-surface-container-low px-4'
                  }`}
                >
                  <span className="font-sans text-label-caps text-on-surface-variant">{key}</span>
                  <span className="font-sans text-mono-data text-on-surface">{val}</span>
                </div>
              ))}
              <div className="flex justify-between py-4 border-b border-outline-variant/20">
                <span className="font-sans text-label-caps text-on-surface-variant">Engine Configuration</span>
                <span className="font-sans text-mono-data text-on-surface">{boat.engine_config}</span>
              </div>
            </div>
          </div>

          {/* Right — inquiry form */}
          <div className="lg:col-span-5">
            <div className="sticky top-28">
              <div className="hull-card p-10">
                <h2 className="font-serif text-headline-sm text-on-surface mb-2">
                  Request Information
                </h2>
                <p className="font-sans text-body-md text-on-surface-variant mb-10">
                  Our specialists will be in contact within 24 hours.
                </p>
                <InquiryForm boatId={boat.id} boatName={boat.name} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
