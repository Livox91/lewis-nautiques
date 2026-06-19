import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

const navLinks = [
  { to: '/fleet', label: 'Fleet' },
  { to: '/bespoke', label: 'Bespoke' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-400',
        scrolled ? 'glass-nav py-4' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-container mx-auto px-gutter flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 focus:outline-none"
          onClick={() => setMenuOpen(false)}
        >
          <svg width="180" height="36" viewBox="0 0 180 36" fill="none" aria-label="Lewis Nautiques">
            <path d="M10 6L4 30H8L14 6H10Z" fill="#AEB6BF" />
            <path d="M18 6L12 30H16L22 6H18Z" fill="#e3e2df" />
            <text
              x="30"
              y="26"
              fill="#e3e2df"
              fontFamily="'Playfair Display', serif"
              fontSize="18"
              fontWeight="700"
              letterSpacing="3"
            >
              LEWIS NAUTIQUES
            </text>
          </svg>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'font-sans text-label-caps tracking-widest transition-all duration-300',
                  isActive
                    ? 'text-primary border-b border-primary pb-0.5'
                    : 'text-on-surface-variant hover:text-primary hover:tracking-[0.18em]'
                )
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Inquire CTA */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => { navigate('/contact'); setMenuOpen(false); }}
            className="hidden md:block font-sans text-label-caps tracking-widest bg-primary text-on-primary
                       px-7 py-2.5 hover:bg-on-surface hover:text-surface transition-colors duration-300"
          >
            Inquire
          </button>
          {/* Mobile burger */}
          <button
            className="md:hidden text-on-surface p-1 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] bg-background/98 backdrop-blur-xl z-40 flex flex-col px-gutter pt-12 gap-10">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                cn(
                  'font-serif text-headline-sm text-on-surface border-b border-outline-variant/20 pb-6',
                  isActive ? 'text-primary' : ''
                )
              }
            >
              {label}
            </NavLink>
          ))}
          <button
            onClick={() => { navigate('/contact'); setMenuOpen(false); }}
            className="btn-primary w-full text-center mt-4"
          >
            Inquire Now
          </button>
        </div>
      )}
    </header>
  );
}
