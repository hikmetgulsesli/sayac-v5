import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useCounter } from './useCounter';

const STORAGE_KEY = 'sayac-v5-count';

describe('useCounter', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should initialize with loading true', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.loading).toBe(true);
  });

  it('should initialize with 0 when no saved value exists', async () => {
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.count).toBe(0);
  });

  it('should load saved value from localStorage', async () => {
    localStorage.setItem(STORAGE_KEY, '42');
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.count).toBe(42);
  });

  it('should increment count by +1', async () => {
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
  });

  it('should decrement count by -1', async () => {
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.decrement();
    });
    expect(result.current.count).toBe(1);
  });

  it('should reset count to 0', async () => {
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });

  it('should save count to localStorage', async () => {
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    act(() => {
      result.current.increment();
    });
    expect(localStorage.getItem(STORAGE_KEY)).toBe('1');
  });

  it('should fallback to 0 on invalid localStorage value', async () => {
    localStorage.setItem(STORAGE_KEY, 'invalid');
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.count).toBe(0);
  });

  it('should have null error initially', async () => {
    const { result } = renderHook(() => useCounter());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBeNull();
  });
});
