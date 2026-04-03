import { useState, useCallback, useEffect, useRef } from 'react'
import { getStorageItem, setStorageItem } from '../utils/storage'

const STORAGE_KEY = 'sayac-v5-count'

interface UseCounterReturn {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  loading: boolean
  error: string | null
}

/**
 * Custom hook for managing counter state with localStorage persistence
 * Handles increment (+1), decrement (-1), reset (to 0)
 * Loads from localStorage on mount, defaults to 0
 * Handles errors (SecurityError, QuotaExceededError)
 */
export function useCounter(): UseCounterReturn {
  const [count, setCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const isMounted = useRef(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = getStorageItem(STORAGE_KEY)
      if (saved !== null) {
        const parsed = parseInt(saved, 10)
        if (!isNaN(parsed)) {
          setCount(parsed)
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'localStorage erişim hatası')
    } finally {
      setLoading(false)
    }
    isMounted.current = true
  }, [])

  // Save to localStorage whenever count changes
  useEffect(() => {
    if (!isMounted.current || loading) return

    const success = setStorageItem(STORAGE_KEY, count.toString())
    if (!success && error === null) {
      setError('localStorage kaydetme hatası')
    }
  }, [count, loading, error])

  const increment = useCallback((): void => {
    setCount((c) => c + 1)
    setError(null)
  }, [])

  const decrement = useCallback((): void => {
    setCount((c) => c - 1)
    setError(null)
  }, [])

  const reset = useCallback((): void => {
    setCount(0)
    setError(null)
  }, [])

  return {
    count,
    increment,
    decrement,
    reset,
    loading,
    error,
  }
}
