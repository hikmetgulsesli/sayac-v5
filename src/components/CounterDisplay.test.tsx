import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CounterDisplay } from './CounterDisplay';

describe('CounterDisplay', () => {
  it('renders numeric count correctly', () => {
    render(<CounterDisplay count={42} />);
    expect(screen.getByTestId('counter-display')).toHaveTextContent('42');
  });

  it('renders zero correctly', () => {
    render(<CounterDisplay count={0} />);
    expect(screen.getByTestId('counter-display')).toHaveTextContent('0');
  });

  it('renders negative numbers correctly', () => {
    render(<CounterDisplay count={-5} />);
    expect(screen.getByTestId('counter-display')).toHaveTextContent('-5');
  });
});
