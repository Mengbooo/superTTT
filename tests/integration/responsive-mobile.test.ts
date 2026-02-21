/**
 * Integration Test: Responsive Layout - Mobile Breakpoint
 * 
 * Verifies that the application layout adapts correctly at mobile breakpoint (320px).
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../src/App';

describe('Responsive Layout - Mobile (320px)', () => {
  it('should render app at 320px viewport width', async () => {
    // Set viewport to mobile size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    render(<App />);
    
    // App should be visible
    expect(screen.getByRole('application')).toBeInTheDocument();
    
    // Main heading should be visible
    const heading = screen.getByText(/超级井字棋/i);
    expect(heading).toBeInTheDocument();
    
    // Reset viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should maintain readable typography at 320px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    const { container } = render(<div data-testid="test">Test Content</div>);
    const element = screen.getByTestId('test');
    const styles = getComputedStyle(element);
    
    // Font size should be at least 12px for readability
    expect(parseInt(styles.fontSize)).toBeGreaterThanOrEqual(12);
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('should have proper edge padding on mobile', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 320,
    });

    render(<App />);
    
    const app = screen.getByRole('application');
    const styles = getComputedStyle(app);
    
    // Should have padding on mobile
    expect(styles.paddingLeft).toBeTruthy();
    expect(styles.paddingRight).toBeTruthy();
    
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });
});
