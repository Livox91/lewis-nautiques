import type { ApiResponse, Boat, Inquiry, InquiryFormData } from '../types';

const BASE = import.meta.env.VITE_API_URL ?? '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  const json: ApiResponse<T> = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.error ?? `Request failed with status ${res.status}`);
  }
  return json.data as T;
}

export const api = {
  boats: {
    list: (featured?: boolean): Promise<Boat[]> =>
      request<Boat[]>(`/boats${featured ? '?featured=true' : ''}`),
    get: (slug: string): Promise<Boat> =>
      request<Boat>(`/boats/${slug}`),
  },

  inquiries: {
    submit: (data: InquiryFormData): Promise<{ id: string }> =>
      request<{ id: string }>('/inquiries', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  },

  admin: {
    list: (params: { status?: string; search?: string }, token: string): Promise<Inquiry[]> => {
      const qs = new URLSearchParams();
      if (params.status) qs.set('status', params.status);
      if (params.search) qs.set('search', params.search);
      const query = qs.toString() ? `?${qs}` : '';
      return request<Inquiry[]>(`/admin/inquiries${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    },
    updateStatus: (id: string, status: string, token: string): Promise<Inquiry> =>
      request<Inquiry>(`/admin/inquiries/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
        headers: { Authorization: `Bearer ${token}` },
      }),
    delete: (id: string, token: string): Promise<void> =>
      request<void>(`/admin/inquiries/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }),
  },
};
