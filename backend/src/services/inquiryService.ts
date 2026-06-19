import { query } from '../config/database';
import { Inquiry, CreateInquiryDto } from '../types';

export async function createInquiry(dto: CreateInquiryDto): Promise<Inquiry> {
  let boatName: string | null = null;
  if (dto.boat_id) {
    const boats = await query<{ name: string }>('SELECT name FROM boats WHERE id = $1', [dto.boat_id]);
    boatName = boats[0]?.name ?? null;
  }
  const rows = await query<Inquiry>(
    `INSERT INTO inquiries (name, email, phone, message, boat_id, boat_name)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [dto.name, dto.email, dto.phone, dto.message ?? null, dto.boat_id ?? null, boatName]
  );
  return rows[0];
}

export async function getAllInquiries(filters: { status?: string; search?: string } = {}): Promise<Inquiry[]> {
  const params: unknown[] = [];
  const conditions: string[] = [];
  let idx = 1;

  if (filters.status) {
    conditions.push(`status = $${idx++}`);
    params.push(filters.status);
  }
  if (filters.search) {
    conditions.push(`(name ILIKE $${idx} OR email ILIKE $${idx} OR phone ILIKE $${idx} OR COALESCE(boat_name, '') ILIKE $${idx})`);
    params.push(`%${filters.search}%`);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
  return query<Inquiry>(`SELECT * FROM inquiries ${where} ORDER BY created_at DESC`, params);
}

export async function updateInquiryStatus(
  id: string,
  status: 'new' | 'contacted' | 'closed'
): Promise<Inquiry | null> {
  const rows = await query<Inquiry>(
    `UPDATE inquiries SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, id]
  );
  return rows[0] ?? null;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const rows = await query<{ id: string }>('DELETE FROM inquiries WHERE id = $1 RETURNING id', [id]);
  return rows.length > 0;
}
