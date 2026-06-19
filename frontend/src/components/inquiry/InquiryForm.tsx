import { useState, FormEvent } from 'react';
import { useInquiry } from '../../hooks/useInquiry';
import { cn } from '../../utils/cn';
import type { FieldError } from '../../types';

interface Props {
  boatId?: string;
  boatName?: string;
  className?: string;
}

function validateForm(data: { name: string; email: string; phone: string; message: string }): FieldError {
  const errors: FieldError = {};
  if (!data.name.trim() || data.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!/^\+?[\d\s\-().]{7,20}$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  return errors;
}

export function InquiryForm({ boatId, boatName, className }: Props) {
  const { submit, loading, success, error, reset } = useInquiry();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldError>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((fe) => { const next = { ...fe }; delete next[name]; return next; });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    await submit({ ...form, boat_id: boatId });
  };

  if (success) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="inline-flex items-center justify-center w-16 h-16 border border-primary mb-8">
          <span className="material-symbols-outlined text-primary text-3xl">check</span>
        </div>
        <h3 className="font-serif text-headline-sm text-on-surface mb-4">
          Inquiry Received
        </h3>
        <p className="font-sans text-body-md text-on-surface-variant mb-8 max-w-sm mx-auto">
          Our team will be in touch within 24 hours. We look forward to speaking with you.
        </p>
        <button onClick={reset} className="btn-ghost text-sm">
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-8', className)} noValidate>
      {boatName && (
        <div className="p-4 border-l-2 border-primary bg-primary-container/20">
          <p className="font-sans text-label-caps text-primary tracking-widest">ENQUIRING ABOUT</p>
          <p className="font-serif text-headline-sm text-on-surface mt-1">{boatName}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Name */}
        <div>
          <label htmlFor="inq-name" className="font-sans text-label-caps text-on-surface-variant tracking-widest block mb-3">
            FULL NAME *
          </label>
          <input
            id="inq-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="James Harrington"
            className={cn('field-input', fieldErrors.name && 'error')}
            autoComplete="name"
          />
          {fieldErrors.name && (
            <p className="mt-2 font-sans text-[11px] text-error">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="inq-email" className="font-sans text-label-caps text-on-surface-variant tracking-widest block mb-3">
            EMAIL ADDRESS *
          </label>
          <input
            id="inq-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="james@example.com"
            className={cn('field-input', fieldErrors.email && 'error')}
            autoComplete="email"
          />
          {fieldErrors.email && (
            <p className="mt-2 font-sans text-[11px] text-error">{fieldErrors.email}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="inq-phone" className="font-sans text-label-caps text-on-surface-variant tracking-widest block mb-3">
          PHONE NUMBER *
        </label>
        <input
          id="inq-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+1 (305) 000-0000"
          className={cn('field-input', fieldErrors.phone && 'error')}
          autoComplete="tel"
        />
        {fieldErrors.phone && (
          <p className="mt-2 font-sans text-[11px] text-error">{fieldErrors.phone}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="inq-message" className="font-sans text-label-caps text-on-surface-variant tracking-widest block mb-3">
          MESSAGE (OPTIONAL)
        </label>
        <textarea
          id="inq-message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={5}
          placeholder="Tell us about your requirements, preferred timeline, or any questions you may have..."
          className="field-input resize-none"
        />
      </div>

      {error && (
        <p className="font-sans text-[12px] text-error border border-error/30 px-4 py-3">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full md:w-auto flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined text-base animate-spin">autorenew</span>
            SUBMITTING...
          </>
        ) : (
          <>
            SUBMIT INQUIRY
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </>
        )}
      </button>

      <p className="font-sans text-[11px] text-on-surface-variant/50 tracking-widest uppercase">
        Strict confidentiality guaranteed
      </p>
    </form>
  );
}
