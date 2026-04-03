import { useCounter } from './hooks/useCounter';
import './index.css';

function App() {
  const { count, increment, decrement, reset, loading, error } = useCounter();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-on-surface font-headline text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col items-center justify-center p-6">
      {/* Error Display */}
      {error && (
        <div className="mb-8 p-4 bg-error-container/20 border-l-4 border-error rounded-xl max-w-md">
          <div className="flex items-center gap-2 text-error">
            <span className="material-symbols-outlined">error</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Counter Display */}
      <div className="text-center mb-12">
        <span className="font-label text-xs tracking-[0.2em] uppercase text-on-surface-variant block mb-4">
          Mevcut Değer
        </span>
        <div 
          className="font-headline text-[8rem] md:text-[12rem] leading-none font-bold tracking-tighter text-on-surface"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {count}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={decrement}
          aria-label="Azalt"
          className="px-8 py-4 bg-surface-container-high hover:bg-surface-bright text-on-secondary-container rounded-xl font-label text-sm uppercase tracking-widest transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">remove</span>
          Azalt
        </button>
        <button
          onClick={reset}
          aria-label="Sıfırla"
          className="px-8 py-4 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label text-sm uppercase tracking-widest transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">refresh</span>
          Sıfırla
        </button>
        <button
          onClick={increment}
          aria-label="Arttır"
          className="px-8 py-4 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label text-sm uppercase tracking-widest transition-all duration-200 active:scale-95 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">add</span>
          Arttır
        </button>
      </div>
    </div>
  );
}

export default App;
