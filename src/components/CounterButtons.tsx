interface CounterButtonsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
}

export function CounterButtons({ onIncrement, onDecrement, onReset }: CounterButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <button
        onClick={onIncrement}
        aria-label="Arttır"
        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">add</span>
        Arttır
      </button>
      <button
        onClick={onDecrement}
        aria-label="Azalt"
        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">remove</span>
        Azalt
      </button>
      <button
        onClick={onReset}
        aria-label="Sıfırla"
        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
      >
        <span className="material-symbols-outlined">refresh</span>
        Sıfırla
      </button>
    </div>
  );
}
