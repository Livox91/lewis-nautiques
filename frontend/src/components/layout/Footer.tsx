import { Link } from 'react-router-dom';

const footerLinks = [
  { to: '/fleet', label: 'Fleet' },
  { to: '/bespoke', label: 'Bespoke' },
  { to: '/contact', label: 'Contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/20">
      <div className="max-w-container mx-auto px-gutter py-section-desktop">
        <div className="flex flex-col items-center gap-12">
          {/* Brand */}
          <div className="flex flex-col items-center gap-4">
            <svg width="200" height="40" viewBox="0 0 200 40" fill="none" aria-label="Lewis Nautiques">
              <path d="M10 8L4 32H8L14 8H10Z" fill="#AEB6BF" />
              <path d="M18 8L12 32H16L22 8H18Z" fill="#e3e2df" />
              <text
                x="30"
                y="28"
                fill="#e3e2df"
                fontFamily="'Playfair Display', serif"
                fontSize="18"
                fontWeight="700"
                letterSpacing="3"
              >
                LEWIS NAUTIQUES
              </text>
            </svg>
            <p className="font-sans text-label-caps text-on-surface-variant tracking-[0.3em]">
              PRECISION IN MOTION
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-10">
            {footerLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="font-sans text-label-caps text-on-surface-variant hover:text-tertiary transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Divider */}
          <div className="w-full max-w-xl h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent" />

          {/* Copyright + social */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6">
            <p className="font-sans text-label-caps text-on-surface-variant/60">
              © {year} LEWIS NAUTIQUES. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                aria-label="Website"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">public</span>
              </a>
              <a
                href="#"
                aria-label="Email"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">mail</span>
              </a>
              <a
                href="#"
                aria-label="Social"
                className="text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-xl">alternate_email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
