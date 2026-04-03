import { useState, useCallback, useRef, useSyncExternalStore } from 'react'
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

// Subscribe function for useSyncExternalStore
const subscribe = (): (() => void) => () => {}

// Get snapshot from localStorage
const getSnapshot = (): number => {
  const savedValue = getStorageItem(STORAGE_KEY)
  if (savedValue !== null) {
    const parsed = parseInt(savedValue, 10)
    if (!isNaN(parsed)) {
      return parsed
    }
  }
  return 0
}

const getServerSnapshot = (): number => 0

/**
 * Custom hook for managing counter state with localStorage persistence
 * Handles increment (+1), decrement (-1), reset (to 0)
 * Loads from localStorage on mount, defaults to 0
 * Handles errors (SecurityError, QuotaExceededError)
 */
export function useCounter(): UseCounterReturn {
  const initialCount = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [count, setCount] = useState<number>(initialCount)
  const [error, setError] = useState<string | null>(null)
  const errorRef = useRef<string | null>(null)

  // Check for localStorage errors on each update by trying to save
  const trySave = useCallback((value: number): boolean => {
    const success = setStorageItem(STORAGE_KEY, value.toString())
    if (!success && errorRef.current === null) {
      errorRef.current = 'localStorage erişim hatası'
      setError(errorRef.current)
    }
    return success
  }, [])

  const increment = useCallback(() => {
    setCount((c) => {
      const newValue = c + 1
      trySave(newValue)
      return newValue
    })
  }, [trySave])

  const decrement = useCallback(() => {
    setCount((c) => {
      const newValue = c - 1
      trySave(newValue)
      return newValue
    })
  }, [trySave])

  const reset = useCallback(() => {
    setCount(0)
    trySave(0)
  }, [trySave])

  return {
    count,
    increment,
    decrement,
    reset,
    loading: false,
    error,
  }
}
