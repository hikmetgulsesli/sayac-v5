import { useCounter } from './hooks/useCounter'
import './index.css'

function App() {
  const { count, increment, decrement, reset, loading, error } = useCounter()

  if (loading) {
    return (
      <div className="container">
        <div className="metric-card">
          <span className="trend-indicator">SAYAÇ</span>
          <div className="display-lg">...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error-card">
          <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--error)' }}>encrypted</span>
          <h1 className="error-title">ERİŞİM ENGELLENDİ</h1>
          <p className="error-message">{error}</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Sayfayı Yenile</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="metric-card">
        <span className="trend-indicator">SAYAÇ</span>
        <div className="display-lg">{count}</div>
      </div>
      <div className="button-group">
        <button className="btn btn-secondary" onClick={decrement}>Azalt</button>
        <button className="btn btn-primary" onClick={reset}>Sıfırla</button>
        <button className="btn btn-secondary" onClick={increment}>Arttır</button>
      </div>
    </div>
  )
}

export default App
