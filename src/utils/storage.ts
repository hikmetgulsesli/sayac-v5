/**
 * Safe localStorage wrapper utilities
 * Handles SecurityError, QuotaExceededError, and other exceptions
 */

/**
 * Safely get an item from localStorage
 * @param key - The key to retrieve
 * @returns The stored value or null if not found or error occurred
 */
export function getStorageItem(key: string): string | null {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return null
    }
    return window.localStorage.getItem(key)
  } catch {
    // Handle SecurityError (private browsing), QuotaExceededError, etc.
    return null
  }
}

/**
 * Safely set an item in localStorage
 * @param key - The key to set
 * @param value - The value to store
 * @returns true if successful, false if error occurred
 */
export function setStorageItem(key: string, value: string): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return false
    }
    window.localStorage.setItem(key, value)
    return true
  } catch {
    // Handle SecurityError, QuotaExceededError, etc.
    return false
  }
}
