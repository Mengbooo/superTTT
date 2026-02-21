/**
 * Integration Test: Touch Target Size Verification
 * 
 * Verifies that all interactive elements meet WCAG minimum touch target size (44x44px).
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeistButton } from '../../src/components/ui/GeistButton';
import { GeistInput } from '../../src/components/ui/GeistInput';
import { ThemeToggle } from '../../src/components/ui/ThemeToggle';

describe('Touch Target Size Verification', () => {
  describe('GeistButton Touch Targets', () => {
    it('should have minimum 44px height for medium button', () => {
      render(<GeistButton onClick={() => {}}>Test Button</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
      expect(parseInt(styles.height)).toBeGreaterThanOrEqual(44);
    });

    it('should have minimum 44px height for large button', () => {
      render(<GeistButton size="large" onClick={() => {}}>Large Button</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      
      expect(parseInt(styles.height)).toBeGreaterThanOrEqual(44);
    });

    it('should have adequate width for touch target', () => {
      render(<GeistButton onClick={() => {}}>Btn</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      
      // Minimum width should be at least 44px
      expect(parseInt(styles.minWidth)).toBeGreaterThanOrEqual(44);
    });
  });

  describe('GeistInput Touch Targets', () => {
    it('should have minimum 44px height', () => {
      render(<GeistInput value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      const styles = getComputedStyle(input);
      
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
    });

    it('should have adequate click area', () => {
      render(<GeistInput value="" onChange={() => {}} />);
      const input = screen.getByRole('textbox');
      const rect = input.getBoundingClientRect();
      
      expect(rect.height).toBeGreaterThanOrEqual(44);
    });
  });

  describe('ThemeToggle Touch Target', () => {
    it('should have 44x44px dimensions', () => {
      render(<ThemeToggle />);
      const toggle = screen.getByRole('button');
      const styles = getComputedStyle(toggle);
      const rect = toggle.getBoundingClientRect();
      
      expect(parseInt(styles.width)).toBeGreaterThanOrEqual(44);
      expect(parseInt(styles.height)).toBeGreaterThanOrEqual(44);
      expect(rect.width).toBeGreaterThanOrEqual(44);
      expect(rect.height).toBeGreaterThanOrEqual(44);
    });
  });

  describe('General Interactive Elements', () => {
    it('should have cursor pointer on clickable elements', async () => {
      render(<GeistButton onClick={() => {}}>Clickable</GeistButton>);
      const button = screen.getByRole('button');
      
      await userEvent.hover(button);
      const styles = getComputedStyle(button);
      
      expect(styles.cursor).toBe('pointer');
    });

    it('should have visible focus indicator', async () => {
      render(<GeistButton onClick={() => {}}>Focusable</GeistButton>);
      const button = screen.getByRole('button');
      
      await userEvent.tab();
      expect(button).toHaveFocus();
      
      const styles = getComputedStyle(button);
      // Should have outline or box-shadow for focus
      expect(styles.outlineWidth).toBeTruthy();
    });
  });

  describe('Mobile-Specific Touch Targets', () => {
    it('should maintain 44px minimum on mobile viewport', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 320,
      });

      render(<GeistButton onClick={() => {}}>Mobile Button</GeistButton>);
      const button = screen.getByRole('button');
      const styles = getComputedStyle(button);
      
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
      
      // Reset viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });
    });
  });
});
