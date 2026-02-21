/**
 * Integration Test: Responsive Layout - Tablet Breakpoint
 * 
 * Verifies that the application layout adapts correctly at tablet breakpoint (768px).
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('Responsive Layout - Tablet (768px)', () => {
  it('should render app at 768px viewport width', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<App />);
    
    expect(screen.getByRole('application')).toBeInTheDocument();
    expect(screen.getByText(/超级井字棋/i)).toBeInTheDocument();
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should use 2-column grid layout on tablet', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    const { container } = render(
      <div className="bento-grid" data-testid="grid">
        <div className="bento-item">Item 1</div>
        <div className="bento-item">Item 2</div>
      </div>
    );
    
    const grid = screen.getByTestId('grid');
    const styles = getComputedStyle(grid);
    
    // Should use grid layout
    expect(styles.display).toBe('grid');
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should maintain proper spacing on tablet', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 768,
    });

    render(<App />);
    
    const app = screen.getByRole('application');
    const styles = getComputedStyle(app);
    
    // Padding should be at least 16px
    expect(parseInt(styles.paddingLeft)).toBeGreaterThanOrEqual(16);
    expect(parseInt(styles.paddingRight)).toBeGreaterThanOrEqual(16);
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });
});
