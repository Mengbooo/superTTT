/**
 * Contract Test: GeistButton Component API
 * 
 * Verifies that GeistButton accepts all defined props,
 * uses correct defaults, and maintains styling guarantees.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeistButton } from '../../src/components/ui/GeistButton';

describe('GeistButton Contract', () => {
  describe('Prop Acceptance', () => {
    it('should accept children', () => {
      render(<GeistButton onClick={vi.fn()}>Click me</GeistButton>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('should accept onClick handler', () => {
      const handleClick = vi.fn();
      render(<GeistButton onClick={handleClick}>Test</GeistButton>);
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should accept variant prop', () => {
      const { rerender } = render(<GeistButton variant="primary">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
      
      rerender(<GeistButton variant="secondary">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
      
      rerender(<GeistButton variant="ghost">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
      
      rerender(<GeistButton variant="danger">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
    });

    it('should accept size prop', () => {
      const { rerender } = render(<GeistButton size="small">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
      
      rerender(<GeistButton size="medium">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
      
      rerender(<GeistButton size="large">Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDefined();
    });

    it('should accept disabled prop', () => {
      render(<GeistButton disabled>Test</GeistButton>);
      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should accept loading prop', () => {
      render(<GeistButton loading>Testing</GeistButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });

    it('should accept fullWidth prop', () => {
      render(<GeistButton fullWidth>Test</GeistButton>);
      const button = screen.getByRole('button');
      expect(button.style.width).toBe('100%');
    });

    it('should accept leftIcon and rightIcon props', () => {
      render(
        <GeistButton 
          leftIcon={<span data-testid="left">←</span>}
          rightIcon={<span data-testid="right">→</span>}
        >
          Test
        </GeistButton>
      );
      expect(screen.getByTestId('left')).toBeInTheDocument();
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });

    it('should accept ariaLabel prop', () => {
      render(<GeistButton ariaLabel="Custom label">Test</GeistButton>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should accept type prop', () => {
      const { rerender } = render(<GeistButton type="button">Test</GeistButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
      
      rerender(<GeistButton type="submit">Test</GeistButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
      
      rerender(<GeistButton type="reset">Test</GeistButton>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('Default Values', () => {
    it('should default to primary variant', () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('geist-button--primary');
    });

    it('should default to medium size', () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('geist-button--medium');
    });

    it('should default to enabled state', () => {
      render(<GeistButton>Test</GeistButton>);
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('should default to not loading', () => {
      render(<GeistButton>Test</GeistButton>);
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy');
    });
  });

  describe('Styling Guarantees', () => {
    it('should have 8px border radius', () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      expect(styles.borderRadius).toBe('8px');
    });

    it('should maintain 44px minimum height for medium size', () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
    });

    it('should have font-family Geist Sans', () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      expect(styles.fontFamily).toContain('Geist Sans');
    });

    it('should have font-weight 500', () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      expect(styles.fontWeight).toBe('500');
    });
  });

  describe('Interaction States', () => {
    it('should show focus ring on keyboard navigation', async () => {
      render(<GeistButton>Test</GeistButton>);
      const button = screen.getByRole('button');
      
      await userEvent.tab();
      expect(button).toHaveFocus();
      
      const styles = getComputedStyle(button);
      expect(styles.boxShadow).toContain('var(--geist-primary)');
    });

    it('should reduce opacity when disabled', () => {
      render(<GeistButton disabled>Test</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      expect(parseFloat(styles.opacity)).toBeLessThan(1);
    });
  });
});
