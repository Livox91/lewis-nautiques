import { query } from '../config/database';
import { Boat } from '../types';

export async function getAllBoats(featured?: boolean): Promise<Boat[]> {
  if (featured === true) {
    return query<Boat>('SELECT * FROM boats WHERE featured = true ORDER BY created_at ASC');
  }
  return query<Boat>('SELECT * FROM boats ORDER BY created_at ASC');
}

export async function getBoatBySlug(slug: string): Promise<Boat | null> {
  const rows = await query<Boat>('SELECT * FROM boats WHERE slug = $1', [slug]);
  return rows[0] ?? null;
}

export async function getBoatById(id: string): Promise<Boat | null> {
  const rows = await query<Boat>('SELECT * FROM boats WHERE id = $1', [id]);
  return rows[0] ?? null;
}
