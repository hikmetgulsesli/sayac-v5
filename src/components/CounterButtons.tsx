import './CounterButtons.css'

interface CounterButtonsProps {
  onIncrement: () => void
  onDecrement: () => void
  onReset: () => void
}

export function CounterButtons({ onIncrement, onDecrement, onReset }: CounterButtonsProps) {
  return (
    <div className="counter-buttons">
      <button className="btn btn-secondary" onClick={onDecrement}>Azalt</button>
      <button className="btn btn-primary" onClick={onReset}>Sıfırla</button>
      <button className="btn btn-secondary" onClick={onIncrement}>Arttır</button>
    </div>
  )
}
