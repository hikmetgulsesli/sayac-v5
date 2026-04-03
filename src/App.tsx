import { useState, useEffect } from 'react';
import { CounterDisplay } from './components/CounterDisplay';
import { CounterButtons } from './components/CounterButtons';
import { ErrorBanner } from './components/ErrorBanner';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('sayac-v5-count');
    return saved !== null ? parseInt(saved, 10) : 0;
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('sayac-v5-count', count.toString());
      setError(null);
    } catch {
      setError('localStorage yazma hatası');
    }
  }, [count]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === '+' || e.key === '=') {
        e.preventDefault();
        setCount(c => c + 1);
      } else if (e.key === 'ArrowDown' || e.key === '-') {
        e.preventDefault();
        setCount(c => c - 1);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setCount(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(0);

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-4">
      <ErrorBanner error={error} onDismiss={() => setError(null)} />
      <CounterDisplay count={count} />
      <CounterButtons
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
      />
      <div className="mt-8 flex items-center gap-2 text-slate-500 text-sm">
        <kbd className="px-2 py-1 bg-slate-800 rounded">↑</kbd>
        <kbd className="px-2 py-1 bg-slate-800 rounded">↓</kbd>
        <kbd className="px-2 py-1 bg-slate-800 rounded">R</kbd>
        <span>Klavye Kısayolları</span>
      </div>
    </div>
  );
}

export default App;
