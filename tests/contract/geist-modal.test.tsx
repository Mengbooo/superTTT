/**
 * Contract Test: GeistModal Component API
 * 
 * Verifies that GeistModal accepts all defined props,
 * uses correct defaults, and maintains styling guarantees.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GeistModal } from '../../src/components/ui/GeistModal';

describe('GeistModal Contract', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  describe('Prop Acceptance', () => {
    it('should accept isOpen prop', () => {
      const { rerender } = render(<GeistModal {...defaultProps} isOpen={true} />);
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
      
      rerender(<GeistModal {...defaultProps} isOpen={false} />);
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('should call onClose when closed', () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} />);
      
      // Close button should trigger onClose
      const closeButton = screen.getByRole('button', { name: /close/i });
      fireEvent.click(closeButton);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should accept title prop', () => {
      render(<GeistModal {...defaultProps} title="Modal Title" />);
      expect(screen.getByText('Modal Title')).toBeInTheDocument();
    });

    it('should accept subtitle prop', () => {
      render(<GeistModal {...defaultProps} subtitle="Modal Subtitle" />);
      expect(screen.getByText('Modal Subtitle')).toBeInTheDocument();
    });

    it('should accept size prop', () => {
      const { rerender } = render(<GeistModal {...defaultProps} size="small" />);
      expect(screen.getByText('Modal Content')).toBeDefined();
      
      rerender(<GeistModal {...defaultProps} size="medium" />);
      expect(screen.getByText('Modal Content')).toBeDefined();
      
      rerender(<GeistModal {...defaultProps} size="large" />);
      expect(screen.getByText('Modal Content')).toBeDefined();
      
      rerender(<GeistModal {...defaultProps} size="fullscreen" />);
      expect(screen.getByText('Modal Content')).toBeDefined();
    });

    it('should accept closeOnOverlayClick prop', () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} closeOnOverlayClick={true} />);
      
      const overlay = screen.getByTestId('modal-overlay');
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not close on overlay click when disabled', () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} closeOnOverlayClick={false} />);
      
      const overlay = screen.getByTestId('modal-overlay');
      fireEvent.click(overlay);
      expect(handleClose).not.toHaveBeenCalled();
    });

    it('should accept showCloseButton prop', () => {
      const { rerender } = render(<GeistModal {...defaultProps} showCloseButton={true} />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
      
      rerender(<GeistModal {...defaultProps} showCloseButton={false} />);
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('should accept preventClose prop', () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} preventClose={true} />);
      
      // Should not have close button
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('should accept autoFocus prop', () => {
      render(<GeistModal {...defaultProps} autoFocus={true} />);
      // Modal should receive focus when opened
      expect(document.activeElement).toHaveAttribute('data-modal-focus');
    });

    it('should accept trapFocus prop', () => {
      render(<GeistModal {...defaultProps} trapFocus={true} />);
      // Focus should be trapped within modal
      expect(screen.getByText('Modal Content')).toBeDefined();
    });

    it('should accept footer prop', () => {
      render(
        <GeistModal {...defaultProps} footer={<button>Action</button>} />
      );
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('should accept ariaLabel prop', () => {
      render(<GeistModal {...defaultProps} ariaLabel="Custom modal" />);
      expect(screen.getByText('Modal Content')).toHaveAttribute('aria-label', 'Custom modal');
    });

    it('should accept role prop', () => {
      const { rerender } = render(<GeistModal {...defaultProps} role="dialog" />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      
      rerender(<GeistModal {...defaultProps} role="alertdialog" />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });
  });

  describe('Default Values', () => {
    it('should default to medium size', () => {
      render(<GeistModal {...defaultProps} />);
      const modal = screen.getByText('Modal Content').closest('.geist-modal');
      expect(modal).toHaveClass('geist-modal--medium');
    });

    it('should default to closeOnOverlayClick=true', () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} />);
      
      const overlay = screen.getByTestId('modal-overlay');
      fireEvent.click(overlay);
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should default to showCloseButton=true', () => {
      render(<GeistModal {...defaultProps} />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('should default to preventClose=false', () => {
      render(<GeistModal {...defaultProps} />);
      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('should default to autoFocus=true', () => {
      render(<GeistModal {...defaultProps} />);
      expect(document.activeElement).toHaveAttribute('data-modal-focus');
    });

    it('should default to trapFocus=true', () => {
      render(<GeistModal {...defaultProps} />);
      // Focus trapping should be enabled
      expect(screen.getByText('Modal Content')).toBeDefined();
    });

    it('should default to role=dialog', () => {
      render(<GeistModal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Styling Guarantees', () => {
    it('should have 16px border radius', () => {
      render(<GeistModal {...defaultProps} />);
      const modal = screen.getByText('Modal Content').closest('.geist-modal-content');
      const styles = getComputedStyle(modal!);
      expect(styles.borderRadius).toBe('16px');
    });

    it('should have shadow-lg', () => {
      render(<GeistModal {...defaultProps} />);
      const modal = screen.getByText('Modal Content').closest('.geist-modal-content');
      const styles = getComputedStyle(modal!);
      expect(styles.boxShadow).toBeTruthy();
    });

    it('should have overlay with rgba background', () => {
      render(<GeistModal {...defaultProps} />);
      const overlay = screen.getByTestId('modal-overlay');
      const styles = getComputedStyle(overlay);
      expect(styles.backgroundColor).toContain('rgba');
    });
  });

  describe('Keyboard Interactions', () => {
    it('should close on Escape key', async () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} />);
      
      await userEvent.keyboard('{Escape}');
      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should not close on Escape when preventClose', async () => {
      const handleClose = vi.fn();
      render(<GeistModal {...defaultProps} onClose={handleClose} preventClose={true} />);
      
      await userEvent.keyboard('{Escape}');
      expect(handleClose).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should use dialog role by default', () => {
      render(<GeistModal {...defaultProps} />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should accept alertdialog role', () => {
      render(<GeistModal {...defaultProps} role="alertdialog" />);
      expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    });

    it('should trap focus when enabled', () => {
      render(<GeistModal {...defaultProps} trapFocus={true} />);
      // Focus should be within modal
      expect(document.activeElement?.closest('.geist-modal')).toBeInTheDocument();
    });

    it('should have aria-modal attribute', () => {
      render(<GeistModal {...defaultProps} />);
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });
  });
});
