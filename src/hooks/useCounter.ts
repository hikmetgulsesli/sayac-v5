import { useState, useCallback } from 'react'
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
  const [count, setCount] = useState<number>(() => {
    try {
      const saved = getStorageItem(STORAGE_KEY)
      return saved !== null ? parseInt(saved, 10) || 0 : 0
    } catch {
      return 0
    }
  })
  const [error, setError] = useState<string | null>(null)

  const increment = useCallback((): void => {
    const saved = getStorageItem(STORAGE_KEY)
    const currentCount = saved !== null ? parseInt(saved, 10) || 0 : 0
    const newCount = currentCount + 1
    const success = setStorageItem(STORAGE_KEY, newCount.toString())
    if (success) {
      setCount(newCount)
      setError(null)
    } else {
      setError('localStorage erişimi engellendi')
    }
  }, [])

  const decrement = useCallback((): void => {
    const saved = getStorageItem(STORAGE_KEY)
    const currentCount = saved !== null ? parseInt(saved, 10) || 0 : 0
    const newCount = currentCount - 1
    const success = setStorageItem(STORAGE_KEY, newCount.toString())
    if (success) {
      setCount(newCount)
      setError(null)
    } else {
      setError('localStorage erişimi engellendi')
    }
  }, [])

  const reset = useCallback((): void => {
    const success = setStorageItem(STORAGE_KEY, '0')
    if (success) {
      setCount(0)
      setError(null)
    } else {
      setError('localStorage erişimi engellendi')
    }
  }, [])

  return {
    count,
    increment,
    decrement,
    reset,
    loading: false,
    error,
  }
}
