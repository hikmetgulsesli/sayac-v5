import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBanner } from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders when error is passed', () => {
    render(<ErrorBanner error="Test error message" />);
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.getByText('Hata')).toBeInTheDocument();
  });

  it('is hidden when error is null', () => {
    const { container } = render(<ErrorBanner error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onDismiss when close button clicked', () => {
    const onDismiss = vi.fn();
    render(<ErrorBanner error="Test error" onDismiss={onDismiss} />);
    
    fireEvent.click(screen.getByLabelText('Kapat'));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });
});
