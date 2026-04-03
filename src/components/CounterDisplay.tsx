import './CounterDisplay.css'

interface CounterDisplayProps {
  count: number
}

export function CounterDisplay({ count }: CounterDisplayProps) {
  return (
    <div className="counter-display">
      <span className="counter-label">SAYAÇ</span>
      <div className="counter-value">{count}</div>
    </div>
  )
}
