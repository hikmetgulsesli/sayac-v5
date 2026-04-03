import { getStorageItem, setStorageItem } from './storage'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('getStorageItem', () => {
    it('should return value when key exists', () => {
      localStorage.setItem('test-key', 'test-value')

      const result = getStorageItem('test-key')

      expect(result).toBe('test-value')
    })

    it('should return null when key does not exist', () => {
      const result = getStorageItem('non-existent-key')

      expect(result).toBeNull()
    })

    it('should return null on localStorage error', () => {
      // Mock localStorage.getItem to throw
      const originalGetItem = Storage.prototype.getItem
      Storage.prototype.getItem = vi.fn(() => {
        throw new Error('SecurityError')
      })

      const result = getStorageItem('test-key')

      expect(result).toBeNull()

      // Restore original
      Storage.prototype.getItem = originalGetItem
    })
  })

  describe('setStorageItem', () => {
    it('should return true when set succeeds', () => {
      const result = setStorageItem('test-key', 'test-value')

      expect(result).toBe(true)
      expect(localStorage.getItem('test-key')).toBe('test-value')
    })

    it('should return false on localStorage error', () => {
      // Mock localStorage.setItem to throw QuotaExceededError
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('QuotaExceededError')
      })

      const result = setStorageItem('test-key', 'test-value')

      expect(result).toBe(false)

      // Restore original
      Storage.prototype.setItem = originalSetItem
    })

    it('should return false on SecurityError', () => {
      // Mock localStorage.setItem to throw SecurityError
      const originalSetItem = Storage.prototype.setItem
      Storage.prototype.setItem = vi.fn(() => {
        throw new Error('SecurityError')
      })

      const result = setStorageItem('test-key', 'test-value')

      expect(result).toBe(false)

      // Restore original
      Storage.prototype.setItem = originalSetItem
    })
  })
})
