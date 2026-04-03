/**
 * Safe localStorage wrapper utilities
 * Handles SecurityError, QuotaExceededError and other exceptions
 */

/**
 * Safely get an item from localStorage
 * @param key - The key to retrieve
 * @returns The stored value or null if not found/error
 */
export function getStorageItem(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

/**
 * Safely set an item in localStorage
 * @param key - The key to set
 * @param value - The value to store
 * @returns true if successful, false if error
 */
export function setStorageItem(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value)
    return true
  } catch {
    return false
  }
}
