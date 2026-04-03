import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sayac-v5-count';

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  loading: boolean;
  error: string | null;
}

export function useCounter(): UseCounterReturn {
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) {
          setCount(parsed);
        }
      }
    } catch (e) {
      setError('Tarayıcı depolama erişimi engellendi.');
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever count changes
  useEffect(() => {
    if (loading) return;
    
    try {
      localStorage.setItem(STORAGE_KEY, count.toString());
    } catch (e) {
      setError('Tarayıcı depolama erişimi engellendi.');
    }
  }, [count, loading]);

  const increment = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount(c => c - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return {
    count,
    increment,
    decrement,
    reset,
    loading,
    error,
  };
}
