import { useCounter } from './hooks/useCounter';
import { CounterDisplay } from './components/CounterDisplay';
import { CounterButtons } from './components/CounterButtons';
import { ErrorBanner } from './components/ErrorBanner';
import './App.css';

function App() {
  const { count, increment, decrement, reset, error } = useCounter();

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans flex flex-col items-center justify-center p-4">
      <ErrorBanner error={error} onDismiss={() => {}} />
      <CounterDisplay count={count} />
      <CounterButtons
        onIncrement={increment}
        onDecrement={decrement}
        onReset={reset}
      />
    </div>
  );
}

export default App;
