import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CounterButtons } from './CounterButtons';

describe('CounterButtons', () => {
  it('calls onIncrement when Arttır button clicked', () => {
    const onIncrement = vi.fn();
    render(<CounterButtons onIncrement={onIncrement} onDecrement={vi.fn()} onReset={vi.fn()} />);
    
    fireEvent.click(screen.getByLabelText('Arttır'));
    expect(onIncrement).toHaveBeenCalledTimes(1);
  });

  it('calls onDecrement when Azalt button clicked', () => {
    const onDecrement = vi.fn();
    render(<CounterButtons onIncrement={vi.fn()} onDecrement={onDecrement} onReset={vi.fn()} />);
    
    fireEvent.click(screen.getByLabelText('Azalt'));
    expect(onDecrement).toHaveBeenCalledTimes(1);
  });

  it('calls onReset when Sıfırla button clicked', () => {
    const onReset = vi.fn();
    render(<CounterButtons onIncrement={vi.fn()} onDecrement={vi.fn()} onReset={onReset} />);
    
    fireEvent.click(screen.getByLabelText('Sıfırla'));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-labels', () => {
    render(<CounterButtons onIncrement={vi.fn()} onDecrement={vi.fn()} onReset={vi.fn()} />);
    
    expect(screen.getByLabelText('Arttır')).toBeInTheDocument();
    expect(screen.getByLabelText('Azalt')).toBeInTheDocument();
    expect(screen.getByLabelText('Sıfırla')).toBeInTheDocument();
  });
});
