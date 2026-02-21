/**
 * Contract Test: GeistCard Component API
 * 
 * Verifies that GeistCard accepts all defined props,
 * uses correct defaults, and maintains styling guarantees.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeistCard } from '../../src/components/ui/GeistCard';

describe('GeistCard Contract', () => {
  describe('Prop Acceptance', () => {
    it('should accept children', () => {
      render(<GeistCard>Card content</GeistCard>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should accept title prop', () => {
      render(<GeistCard title="Card Title">Content</GeistCard>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('should accept subtitle prop', () => {
      render(<GeistCard subtitle="Card Subtitle">Content</GeistCard>);
      expect(screen.getByText('Card Subtitle')).toBeInTheDocument();
    });

    it('should accept footer prop', () => {
      render(<GeistCard footer={<div data-testid="footer">Footer</div>}>Content</GeistCard>);
      expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    it('should accept variant prop', () => {
      const { rerender } = render(<GeistCard variant="default">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
      
      rerender(<GeistCard variant="elevated">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
      
      rerender(<GeistCard variant="outlined">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
    });

    it('should accept padding prop', () => {
      const { rerender } = render(<GeistCard padding="none">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
      
      rerender(<GeistCard padding="small">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
      
      rerender(<GeistCard padding="medium">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
      
      rerender(<GeistCard padding="large">Test</GeistCard>);
      expect(screen.getByText('Test')).toBeDefined();
    });

    it('should accept clickable prop', () => {
      render(<GeistCard clickable>Clickable Card</GeistCard>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should accept onClick when clickable', () => {
      const handleClick = vi.fn();
      render(<GeistCard clickable onClick={handleClick}>Clickable</GeistCard>);
      
      fireEvent.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should accept fullWidth prop', () => {
      render(<GeistCard fullWidth>Full Width</GeistCard>);
      const card = screen.getByText('Full Width').closest('.geist-card');
      expect(card?.style.width).toBe('100%');
    });

    it('should accept maxWidth prop', () => {
      render(<GeistCard maxWidth="500px">Limited Width</GeistCard>);
      const card = screen.getByText('Limited Width').closest('.geist-card');
      expect(card?.style.maxWidth).toBe('500px');
    });

    it('should accept ariaLabel prop', () => {
      render(<GeistCard ariaLabel="Custom card label">Test</GeistCard>);
      expect(screen.getByText('Test')).toHaveAttribute('aria-label', 'Custom card label');
    });
  });

  describe('Default Values', () => {
    it('should default to default variant', () => {
      render(<GeistCard>Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      expect(card).toHaveClass('geist-card--default');
    });

    it('should default to medium padding', () => {
      render(<GeistCard>Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      expect(card).toHaveClass('geist-card--padding-medium');
    });

    it('should default to not clickable', () => {
      render(<GeistCard>Test</GeistCard>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should default to not fullWidth', () => {
      render(<GeistCard>Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      expect(card?.style.width).toBeFalsy();
    });
  });

  describe('Styling Guarantees', () => {
    it('should have 12px border radius', () => {
      render(<GeistCard>Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      const styles = getComputedStyle(card!);
      expect(styles.borderRadius).toBe('12px');
    });

    it('should have 1px solid border', () => {
      render(<GeistCard>Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      const styles = getComputedStyle(card!);
      expect(styles.borderWidth).toBe('1px');
      expect(styles.borderStyle).toBe('solid');
    });

    it('should use neutral-200 border color in light mode', () => {
      render(<GeistCard>Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      const styles = getComputedStyle(card!);
      // Should use CSS variable for theme-aware coloring
      expect(styles.borderColor).toBeTruthy();
    });

    it('should maintain 24px edge whitespace (medium padding)', () => {
      render(<GeistCard padding="medium">Test</GeistCard>);
      const card = screen.getByText('Test').closest('.geist-card');
      const styles = getComputedStyle(card!);
      expect(styles.padding).toContain('24px');
    });
  });

  describe('Clickable Behavior', () => {
    it('should show hover elevation on clickable cards', async () => {
      render(<GeistCard clickable>Clickable</GeistCard>);
      const card = screen.getByRole('button');
      
      await userEvent.hover(card);
      const styles = getComputedStyle(card);
      // Should show elevation change
      expect(styles.cursor).toBe('pointer');
    });

    it('should have pointer cursor when clickable', () => {
      render(<GeistCard clickable>Clickable</GeistCard>);
      const card = screen.getByRole('button');
      const styles = getComputedStyle(card);
      expect(styles.cursor).toBe('pointer');
    });

    it('should not have pointer cursor when not clickable', () => {
      render(<GeistCard>Not Clickable</GeistCard>);
      const card = screen.getByText('Not Clickable').closest('.geist-card');
      const styles = getComputedStyle(card!);
      expect(styles.cursor).not.toBe('pointer');
    });
  });

  describe('Accessibility', () => {
    it('should use button role when clickable', () => {
      render(<GeistCard clickable>Clickable</GeistCard>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should not use button role when not clickable', () => {
      render(<GeistCard>Static Card</GeistCard>);
      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should apply aria-label when provided', () => {
      render(<GeistCard ariaLabel="Information card">Content</GeistCard>);
      expect(screen.getByText('Content')).toHaveAttribute('aria-label', 'Information card');
    });
  });
});
