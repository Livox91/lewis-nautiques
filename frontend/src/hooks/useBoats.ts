import { useState, useEffect } from 'react';
import { api } from '../services/api';
import type { Boat } from '../types';

export function useBoats(featured?: boolean) {
  const [boats, setBoats] = useState<Boat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.boats
      .list(featured)
      .then((data) => { if (!cancelled) { setBoats(data); setLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [featured]);

  return { boats, loading, error };
}

export function useBoat(slug: string) {
  const [boat, setBoat] = useState<Boat | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!slug) return;
    setLoading(true);
    setError(null);
    api.boats
      .get(slug)
      .then((data) => { if (!cancelled) { setBoat(data); setLoading(false); } })
      .catch((err: Error) => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [slug]);

  return { boat, loading, error };
}
