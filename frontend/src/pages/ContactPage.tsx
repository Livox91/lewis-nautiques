import { useEffect } from 'react';
import { InquiryForm } from '../components/inquiry/InquiryForm';
import { useScrollReveal } from '../hooks/useScrollReveal';

export function ContactPage() {
  const formRef = useScrollReveal<HTMLDivElement>(100);
  const infoRef = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    document.title = 'Contact | LEWIS NAUTIQUES';
  }, []);

  return (
    <main className="bg-background min-h-screen">
      {/* Header */}
      <div className="pt-40 pb-16 px-gutter max-w-container mx-auto">
        <span className="font-sans text-label-caps text-primary tracking-[0.4em] block mb-4">
          PRIVATE CONSULTATION
        </span>
        <h1 className="font-serif text-display-mobile md:text-headline-md text-on-surface mb-6">
          Begin the Conversation
        </h1>
        <p className="font-sans text-body-lg text-on-surface-variant max-w-xl">
          Complete the form and a member of our team will be in touch within 24 hours
          to discuss your requirements in confidence.
        </p>
      </div>

      <div className="max-w-container mx-auto px-gutter pb-section-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          {/* Form */}
          <div ref={formRef} className="lg:col-span-7">
            <div className="hull-card p-10 md:p-14">
              <InquiryForm />
            </div>
          </div>

          {/* Contact info */}
          <div ref={infoRef} className="lg:col-span-4 lg:col-start-9 flex flex-col justify-start gap-12 pt-4">
            <div>
              <h3 className="font-sans text-label-caps text-primary tracking-widest mb-6">
                OUR LOCATIONS
              </h3>
              <div className="space-y-8">
                {[
                  { city: 'Monaco', address: 'Port Hercule, MC 98000' },
                  { city: 'Miami', address: 'Coconut Grove Marina, FL 33133' },
                  { city: 'Saint Barthélemy', address: 'Gustavia Harbor, 97099' },
                ].map((loc) => (
                  <div key={loc.city} className="border-l border-outline-variant/30 pl-6">
                    <p className="font-serif text-headline-sm text-on-surface mb-1">{loc.city}</p>
                    <p className="font-sans text-body-md text-on-surface-variant">{loc.address}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-sans text-label-caps text-primary tracking-widest mb-6">
                DIRECT CONTACT
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:bespoke@lewisnautiques.com"
                  className="flex items-center gap-3 font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                  bespoke@lewisnautiques.com
                </a>
                <a
                  href="tel:+13050000000"
                  className="flex items-center gap-3 font-sans text-body-md text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-base">phone</span>
                  +1 (305) 000-0000
                </a>
              </div>
            </div>

            <div className="border-t border-outline-variant/20 pt-10">
              <p className="font-sans text-[11px] text-on-surface-variant/50 tracking-widest uppercase leading-relaxed">
                All correspondence is handled with the utmost discretion. Your personal
                information will never be shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
