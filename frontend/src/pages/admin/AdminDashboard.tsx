import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import type { Inquiry } from '../../types';
import { cn } from '../../utils/cn';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-primary/20 text-primary',
  contacted: 'bg-tertiary/20 text-tertiary',
  closed: 'bg-outline/20 text-outline',
};

export function AdminDashboard() {
  const navigate = useNavigate();
  const [token] = useState(() => sessionStorage.getItem('ln_admin_token') ?? '');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
  }, [token, navigate]);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);

  const fetchInquiries = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await api.admin.list(
        { status: statusFilter || undefined, search: debouncedSearch || undefined },
        token
      );
      setInquiries(data);
      setError('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load inquiries';
      setError(msg);
      if (msg.includes('Forbidden') || msg.includes('Unauthorized')) {
        sessionStorage.removeItem('ln_admin_token');
        navigate('/admin');
      }
    } finally {
      setLoading(false);
    }
  }, [token, statusFilter, debouncedSearch, navigate]);

  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  const handleStatus = async (id: string, status: string) => {
    try {
      const updated = await api.admin.updateStatus(id, status, token);
      setInquiries((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Update failed');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this inquiry? This action cannot be undone.')) return;
    try {
      await api.admin.delete(id, token);
      setInquiries((prev) => prev.filter((i) => i.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('ln_admin_token');
    navigate('/admin');
  };

  const counts = {
    all: inquiries.length,
    new: inquiries.filter((i) => i.status === 'new').length,
    contacted: inquiries.filter((i) => i.status === 'contacted').length,
    closed: inquiries.filter((i) => i.status === 'closed').length,
  };

  const fmt = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      {/* Admin nav */}
      <header className="bg-surface-container border-b border-outline-variant/20 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <span className="font-sans text-label-caps text-primary tracking-widest block">
              LEWIS NAUTIQUES
            </span>
            <span className="font-sans text-[11px] text-on-surface-variant">Lead Management System</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 font-sans text-label-caps text-on-surface-variant hover:text-error transition-colors"
          >
            <span className="material-symbols-outlined text-base">logout</span>
            LOGOUT
          </button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Inquiries', val: counts.all, color: 'text-on-surface' },
            { label: 'New', val: counts.new, color: 'text-primary' },
            { label: 'Contacted', val: counts.contacted, color: 'text-tertiary' },
            { label: 'Closed', val: counts.closed, color: 'text-outline' },
          ].map((s) => (
            <div key={s.label} className="hull-card p-6">
              <p className={cn('font-serif text-display-mobile mb-1', s.color)}>{s.val}</p>
              <p className="font-sans text-label-caps text-on-surface-variant">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-base">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, phone..."
              className="w-full bg-surface-container border border-outline-variant/30 text-on-surface font-sans text-body-md pl-10 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-surface-container border border-outline-variant/30 text-on-surface font-sans text-body-md px-4 py-3 focus:outline-none focus:border-primary transition-colors"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* Table */}
        {loading && (
          <div className="space-y-2">
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="h-16 bg-surface-container animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="font-sans text-body-md text-error mb-4">{error}</p>
            <button onClick={fetchInquiries} className="btn-ghost text-sm">Retry</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {inquiries.length === 0 ? (
              <div className="text-center py-20">
                <span className="material-symbols-outlined text-5xl text-outline-variant block mb-4">inbox</span>
                <p className="font-sans text-body-md text-on-surface-variant">
                  No inquiries found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-outline-variant/30">
                      {['Name', 'Email', 'Phone', 'Vessel Interest', 'Date', 'Status', 'Actions'].map((h) => (
                        <th
                          key={h}
                          className="text-left font-sans text-label-caps text-on-surface-variant tracking-widest py-4 px-4"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className="border-b border-outline-variant/10 hover:bg-surface-container/50 transition-colors group"
                      >
                        <td className="py-4 px-4">
                          <p className="font-sans text-body-md text-on-surface">{inq.name}</p>
                          {inq.message && (
                            <p className="font-sans text-[11px] text-on-surface-variant mt-1 max-w-[200px] truncate">
                              {inq.message}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <a
                            href={`mailto:${inq.email}`}
                            className="font-sans text-body-md text-primary hover:underline"
                          >
                            {inq.email}
                          </a>
                        </td>
                        <td className="py-4 px-4">
                          <a
                            href={`tel:${inq.phone}`}
                            className="font-sans text-body-md text-on-surface hover:text-primary transition-colors"
                          >
                            {inq.phone}
                          </a>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-sans text-mono-data text-on-surface-variant">
                            {inq.boat_name ?? '—'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-sans text-mono-data text-on-surface-variant whitespace-nowrap">
                            {fmt(inq.created_at)}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={cn(
                              'font-sans text-label-caps tracking-wider px-3 py-1 rounded-full capitalize',
                              STATUS_COLORS[inq.status]
                            )}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {inq.status !== 'contacted' && (
                              <button
                                onClick={() => handleStatus(inq.id, 'contacted')}
                                title="Mark as Contacted"
                                className="p-1.5 text-on-surface-variant hover:text-tertiary transition-colors"
                              >
                                <span className="material-symbols-outlined text-base">check_circle</span>
                              </button>
                            )}
                            {inq.status !== 'closed' && (
                              <button
                                onClick={() => handleStatus(inq.id, 'closed')}
                                title="Mark as Closed"
                                className="p-1.5 text-on-surface-variant hover:text-outline transition-colors"
                              >
                                <span className="material-symbols-outlined text-base">archive</span>
                              </button>
                            )}
                            {inq.status !== 'new' && (
                              <button
                                onClick={() => handleStatus(inq.id, 'new')}
                                title="Reopen"
                                className="p-1.5 text-on-surface-variant hover:text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-base">refresh</span>
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(inq.id)}
                              title="Delete"
                              className="p-1.5 text-on-surface-variant hover:text-error transition-colors"
                            >
                              <span className="material-symbols-outlined text-base">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
