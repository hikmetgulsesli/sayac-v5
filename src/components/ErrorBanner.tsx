import './ErrorBanner.css'

interface ErrorBannerProps {
  message: string
}

export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="error-banner">
      <span className="error-icon">⚠️</span>
      <h2 className="error-title">ERİŞİM ENGELLENDİ</h2>
      <p className="error-message">{message}</p>
      <p className="error-message">Lütfen tarayıcı ayarlarınızı kontrol edin.</p>
    </div>
  )
}
