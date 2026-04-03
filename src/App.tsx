import { useState, useEffect } from 'react'
import './index.css'

function App() {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem('sayac-deger')
    return saved !== null ? parseInt(saved, 10) : 0
  })

  useEffect(() => {
    localStorage.setItem('sayac-deger', count.toString())
  }, [count])

  const artir = () => setCount((c) => c + 1)
  const azalt = () => setCount((c) => c - 1)
  const sifirla = () => setCount(0)

  return (
    <div className="container">
      <div className="metric-card">
        <span className="trend-indicator">SAYAÇ</span>
        <div className="display-lg">{count}</div>
      </div>
      <div className="button-group">
        <button className="btn btn-secondary" onClick={azalt}>Azalt</button>
        <button className="btn btn-primary" onClick={sifirla}>Sıfırla</button>
        <button className="btn btn-secondary" onClick={artir}>Artır</button>
      </div>
    </div>
  )
}

export default App
