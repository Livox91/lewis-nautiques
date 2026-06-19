import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';

export function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    setError('');
    try {
      await api.admin.list({}, password);
      sessionStorage.setItem('ln_admin_token', password);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest flex items-center justify-center px-gutter">
      <div className="w-full max-w-sm">
        <div className="text-center mb-12">
          <span className="font-sans text-label-caps text-primary tracking-[0.4em] block mb-4">
            LEWIS NAUTIQUES
          </span>
          <h1 className="font-serif text-headline-md text-on-surface">
            Administration
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="hull-card p-10">
          <div className="mb-8">
            <label htmlFor="admin-pw" className="font-sans text-label-caps text-on-surface-variant tracking-widest block mb-3">
              ACCESS KEY
            </label>
            <input
              id="admin-pw"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your access key"
              className="field-input"
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="font-sans text-[11px] text-error mb-6 border border-error/30 px-3 py-2">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center disabled:opacity-60"
          >
            {loading ? 'VERIFYING...' : 'ENTER'}
          </button>
        </form>
      </div>
    </main>
  );
}
