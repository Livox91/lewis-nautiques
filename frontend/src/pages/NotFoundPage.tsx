import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  useEffect(() => {
    document.title = '404 | LEWIS NAUTIQUES';
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-gutter">
      <div className="text-center max-w-md">
        <p className="font-serif text-display-lg text-outline-variant/30 mb-4 select-none">
          404
        </p>
        <span className="font-sans text-label-caps text-primary tracking-[0.3em] block mb-6">
          COURSE NOT FOUND
        </span>
        <h1 className="font-serif text-headline-md text-on-surface mb-6">
          These are uncharted waters
        </h1>
        <p className="font-sans text-body-md text-on-surface-variant mb-12">
          The page you're looking for doesn't exist or has been moved. Let us navigate you back.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-primary">
            Return Home
          </Link>
          <Link to="/fleet" className="btn-ghost">
            View Fleet
          </Link>
        </div>
      </div>
    </main>
  );
}
