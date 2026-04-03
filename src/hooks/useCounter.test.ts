import { useCounter } from './useCounter'
import { getStorageItem, setStorageItem } from '../utils/storage'
import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock storage module
vi.mock('../utils/storage', () => ({
  getStorageItem: vi.fn(),
  setStorageItem: vi.fn(),
}))

describe('useCounter', () => {
  const mockedGetStorageItem = vi.mocked(getStorageItem)
  const mockedSetStorageItem = vi.mocked(setStorageItem)

  beforeEach(() => {
    vi.clearAllMocks()
    mockedSetStorageItem.mockReturnValue(true)
  })

  it('should initialize with count 0 when no saved value', async () => {
    mockedGetStorageItem.mockReturnValue(null)

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.count).toBe(0)
    expect(result.current.error).toBeNull()
  })

  it('should load initial count from localStorage', async () => {
    mockedGetStorageItem.mockReturnValue('42')

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.count).toBe(42)
  })

  it('should increment count by 1', async () => {
    mockedGetStorageItem.mockReturnValue('0')

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('should decrement count by 1', async () => {
    mockedGetStorageItem.mockReturnValue('5')

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(4)
  })

  it('should reset count to 0', async () => {
    mockedGetStorageItem.mockReturnValue('100')

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.reset()
    })

    expect(result.current.count).toBe(0)
  })

  it('should fallback to 0 on storage error', async () => {
    mockedGetStorageItem.mockImplementation(() => {
      throw new Error('SecurityError')
    })

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.count).toBe(0)
    expect(result.current.error).not.toBeNull()
  })

  it('should save count to localStorage when changed', async () => {
    mockedGetStorageItem.mockReturnValue('0')

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.increment()
    })

    expect(mockedSetStorageItem).toHaveBeenCalledWith('sayac-v5-count', '1')
  })

  it('should set error when save fails', async () => {
    mockedGetStorageItem.mockReturnValue('0')
    mockedSetStorageItem.mockReturnValue(false)

    const { result } = renderHook(() => useCounter())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    act(() => {
      result.current.increment()
    })

    await waitFor(() => {
      expect(result.current.error).not.toBeNull()
    })
  })
})
