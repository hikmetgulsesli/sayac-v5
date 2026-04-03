import { useEffect } from 'react'
import { useCounter } from './hooks/useCounter'
import { CounterDisplay } from './components/CounterDisplay'
import { CounterButtons } from './components/CounterButtons'
import { ErrorBanner } from './components/ErrorBanner'
import './index.css'

function App() {
  const { count, increment, decrement, reset, loading, error } = useCounter()

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default for our shortcut keys to avoid page scroll
      if (['ArrowUp', 'ArrowDown', 'r', 'R', '+', '-'].includes(e.key)) {
        e.preventDefault()
      }

      switch (e.key) {
        case 'ArrowUp':
        case '+':
          increment()
          break
        case 'ArrowDown':
        case '-':
          decrement()
          break
        case 'r':
        case 'R':
          reset()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [increment, decrement, reset])

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Yükleniyor...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <ErrorBanner message={error} />
      </div>
    )
  }

  return (
    <div className="container">
      <CounterDisplay count={count} />
      <CounterButtons 
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
      />
    </div>
  )
}

export default App
