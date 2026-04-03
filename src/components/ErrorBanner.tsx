interface ErrorBannerProps {
  error: string | null;
  onDismiss?: () => void;
}

export function ErrorBanner({ error, onDismiss }: ErrorBannerProps) {
  if (!error) return null;

  return (
    <div className="w-full max-w-md mb-6 p-4 bg-red-900/50 border border-red-500/30 rounded-xl flex items-start gap-3">
      <span className="material-symbols-outlined text-red-400">error</span>
      <div className="flex-1">
        <h2 className="text-red-400 font-bold">Hata</h2>
        <p className="text-red-200/80 text-sm">{error}</p>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Kapat"
          className="text-red-400 hover:text-red-200 transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      )}
    </div>
  );
}
