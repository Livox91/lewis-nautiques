import { useState } from 'react';
import { api } from '../services/api';
import type { InquiryFormData } from '../types';

export function useInquiry() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: InquiryFormData) => {
    setLoading(true);
    setError(null);
    try {
      await api.inquiries.submit(data);
      setSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSuccess(false);
    setError(null);
  };

  return { submit, loading, success, error, reset };
}
