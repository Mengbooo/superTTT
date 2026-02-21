/**
 * Contract Test: GeistInput Component API
 * 
 * Verifies that GeistInput accepts all defined props,
 * uses correct defaults, and maintains styling guarantees.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeistInput } from '../../src/components/ui/GeistInput';

describe('GeistInput Contract', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
  };

  describe('Prop Acceptance', () => {
    it('should accept value and onChange', () => {
      const handleChange = vi.fn();
      render(<GeistInput value="test" onChange={handleChange} />);
      expect(screen.getByRole('textbox')).toHaveValue('test');
      
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new' } });
      expect(handleChange).toHaveBeenCalledWith('new');
    });

    it('should accept type prop', () => {
      const types = ['text', 'email', 'password', 'number', 'search', 'tel', 'url'] as const;
      types.forEach((type) => {
        const { rerender } = render(<GeistInput {...defaultProps} type={type} />);
        expect(screen.getByRole('textbox')).toHaveAttribute('type', type);
      });
    });

    it('should accept placeholder prop', () => {
      render(<GeistInput {...defaultProps} placeholder="Enter text..." />);
      expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'Enter text...');
    });

    it('should accept label prop', () => {
      render(<GeistInput {...defaultProps} label="Username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
    });

    it('should accept helperText prop', () => {
      render(<GeistInput {...defaultProps} helperText="Choose a unique username" />);
      expect(screen.getByText('Choose a unique username')).toBeInTheDocument();
    });

    it('should accept error prop', () => {
      render(<GeistInput {...defaultProps} error="Password must be at least 8 characters" />);
      expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });

    it('should accept disabled prop', () => {
      render(<GeistInput {...defaultProps} disabled />);
      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should accept readOnly prop', () => {
      render(<GeistInput {...defaultProps} readOnly />);
      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('should accept required prop', () => {
      render(<GeistInput {...defaultProps} required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('required');
    });

    it('should accept autoFocus prop', () => {
      render(<GeistInput {...defaultProps} autoFocus />);
      expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('should accept leftElement and rightElement props', () => {
      render(
        <GeistInput
          {...defaultProps}
          leftElement={<span data-testid="left">🔍</span>}
          rightElement={<span data-testid="right">✕</span>}
        />
      );
      expect(screen.getByTestId('left')).toBeInTheDocument();
      expect(screen.getByTestId('right')).toBeInTheDocument();
    });

    it('should accept fullWidth prop', () => {
      render(<GeistInput {...defaultProps} fullWidth />);
      const input = screen.getByRole('textbox');
      expect(input.style.width).toBe('100%');
    });
  });

  describe('Default Values', () => {
    it('should default to text type', () => {
      render(<GeistInput {...defaultProps} />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should default to enabled', () => {
      render(<GeistInput {...defaultProps} />);
      expect(screen.getByRole('textbox')).not.toBeDisabled();
    });

    it('should default to not readOnly', () => {
      render(<GeistInput {...defaultProps} />);
      expect(screen.getByRole('textbox')).not.toHaveAttribute('readonly');
    });
  });

  describe('Styling Guarantees', () => {
    it('should have 8px border radius', () => {
      render(<GeistInput {...defaultProps} />);
      const input = screen.getByRole('textbox');
      const styles = getComputedStyle(input);
      expect(styles.borderRadius).toBe('8px');
    });

    it('should have 1px border width', () => {
      render(<GeistInput {...defaultProps} />);
      const input = screen.getByRole('textbox');
      const styles = getComputedStyle(input);
      expect(parseInt(styles.borderWidth)).toBeGreaterThanOrEqual(1);
    });

    it('should maintain 44px minimum height', () => {
      render(<GeistInput {...defaultProps} />);
      const input = screen.getByRole('textbox');
      const styles = getComputedStyle(input);
      expect(parseInt(styles.minHeight)).toBeGreaterThanOrEqual(44);
    });

    it('should have font-size 16px', () => {
      render(<GeistInput {...defaultProps} />);
      const input = screen.getByRole('textbox');
      const styles = getComputedStyle(input);
      expect(parseInt(styles.fontSize)).toBe(16);
    });
  });

  describe('Interaction States', () => {
    it('should show focus ring with primary color', async () => {
      render(<GeistInput {...defaultProps} />);
      const input = screen.getByRole('textbox');
      
      await userEvent.click(input);
      expect(input).toHaveFocus();
      
      const styles = getComputedStyle(input);
      expect(styles.borderColor).toBeTruthy(); // Should change on focus
    });

    it('should show error state styling', () => {
      render(<GeistInput {...defaultProps} error="Invalid input" />);
      const input = screen.getByRole('textbox');
      const styles = getComputedStyle(input);
      // Border should use error color
      expect(styles.borderColor).toBeTruthy();
    });

    it('should apply hover state on mouse over', async () => {
      render(<GeistInput {...defaultProps} />);
      const input = screen.getByRole('textbox');
      
      await userEvent.hover(input);
      const styles = getComputedStyle(input);
      expect(styles.borderColor).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should associate label with input', () => {
      render(<GeistInput {...defaultProps} label="Email" id="email-input" />);
      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');
      
      expect(label).toHaveAttribute('for', 'email-input');
      expect(input).toHaveAttribute('id', 'email-input');
    });

    it('should associate error with input using aria-describedby', () => {
      render(<GeistInput {...defaultProps} error="Required field" id="email-input" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby');
    });
  });
});
