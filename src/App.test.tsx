import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import App from './App'
import * as storage from './utils/storage'

describe('App Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders CounterDisplay with initial count of 0', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  it('increments display when Arttır button is clicked', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Arttır'))

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  it('decrements display when Azalt button is clicked', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue('5')
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Azalt'))

    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument()
    })
  })

  it('resets to 0 when Sıfırla button is clicked', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue('10')
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Sıfırla'))

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  it('increments on ArrowUp key press', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    fireEvent.keyDown(window, { key: 'ArrowUp' })

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  it('increments on + key press', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    fireEvent.keyDown(window, { key: '+' })

    await waitFor(() => {
      expect(screen.getByText('1')).toBeInTheDocument()
    })
  })

  it('decrements on ArrowDown key press', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue('5')
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    fireEvent.keyDown(window, { key: 'ArrowDown' })

    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument()
    })
  })

  it('decrements on - key press', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue('5')
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    fireEvent.keyDown(window, { key: '-' })

    await waitFor(() => {
      expect(screen.getByText('4')).toBeInTheDocument()
    })
  })

  it('resets on r key press', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue('10')
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    fireEvent.keyDown(window, { key: 'r' })

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  it('resets on R key press', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue('10')
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('10')).toBeInTheDocument()
    })

    fireEvent.keyDown(window, { key: 'R' })

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })

  it('renders ErrorBanner when localStorage is unavailable after operation', async () => {
    // First call returns null (initial load), subsequent calls return false (save fails)
    let callCount = 0
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)
    vi.spyOn(storage, 'setStorageItem').mockImplementation(() => {
      callCount++
      return false // Simulate save failure
    })

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    // Trigger a save operation by clicking increment
    fireEvent.click(screen.getByText('Arttır'))

    await waitFor(() => {
      expect(screen.getByText('ERİŞİM ENGELLENDİ')).toBeInTheDocument()
    })
  })

  it('uses correct localStorage key', async () => {
    const setStorageSpy = vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText('Arttır'))

    await waitFor(() => {
      expect(setStorageSpy).toHaveBeenCalledWith('sayac-v5-count', '1')
    })
  })

  it('has no placeholder text', async () => {
    vi.spyOn(storage, 'getStorageItem').mockReturnValue(null)
    vi.spyOn(storage, 'setStorageItem').mockReturnValue(true)

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('0')).toBeInTheDocument()
    })

    const bodyText = document.body.textContent || ''
    expect(bodyText).not.toContain('TODO')
    expect(bodyText).not.toContain('Yakında')
    expect(bodyText).not.toContain('Coming soon')
  })
})
