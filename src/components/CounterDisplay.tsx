interface CounterDisplayProps {
  count: number;
}

export function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <div className="text-center">
      <div 
        className="text-[8rem] md:text-[12rem] font-bold leading-none tracking-tighter text-white"
        style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        data-testid="counter-display"
      >
        {count}
      </div>
    </div>
  );
}
