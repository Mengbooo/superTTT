import React, { useEffect, useRef, HTMLAttributes } from 'react';

export interface GeistModalProps {
  // Required
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  
  // Optional - Appearance
  title?: string;
  subtitle?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
  closeOnOverlayClick?: boolean;
  showCloseButton?: boolean;
  
  // Optional - Behavior
  preventClose?: boolean;
  autoFocus?: boolean;
  trapFocus?: boolean;
  
  // Optional - Footer
  footer?: React.ReactNode;
  
  // Optional - Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  role?: 'dialog' | 'alertdialog';
  
  // Optional - Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

const sizeStyles: Record<string, React.CSSProperties> = {
  small: { maxWidth: '400px', padding: 'var(--space-6)' },
  medium: { maxWidth: '600px', padding: 'var(--space-6)' },
  large: { maxWidth: '800px', padding: 'var(--space-8)' },
  fullscreen: { maxWidth: '100vw', width: '100vw', height: '100vh', padding: 'var(--space-10)' },
};

/**
 * GeistModal - Geist Design System Modal Component
 * 
 * Dialog overlay for focused user interactions and confirmations.
 */
export function GeistModal({
  isOpen,
  onClose,
  children,
  title,
  subtitle,
  size = 'medium',
  closeOnOverlayClick = true,
  showCloseButton = true,
  preventClose = false,
  autoFocus = true,
  trapFocus = true,
  footer,
  ariaLabel,
  ariaDescribedBy,
  role = 'dialog',
  className = '',
  style,
}: GeistModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !preventClose) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, preventClose, onClose]);

  // Focus management
  useEffect(() => {
    if (!isOpen) return;

    // Store previous focus
    previousActiveElement.current = document.activeElement;

    // Focus modal on open
    if (autoFocus && modalRef.current) {
      modalRef.current.focus();
    }

    // Cleanup: restore focus on close
    return () => {
      if (previousActiveElement.current instanceof HTMLElement) {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, autoFocus]);

  // Trap focus
  useEffect(() => {
    if (!isOpen || !trapFocus || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleTabKey);
    return () => modal.removeEventListener('keydown', handleTabKey);
  }, [isOpen, trapFocus]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && !preventClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const baseStyles: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 'var(--space-6)',
    animation: 'geistModalFadeIn 200ms ease-out',
  };

  const modalContentStyles: React.CSSProperties = {
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    backgroundColor: 'var(--geist-background)',
    color: 'var(--geist-foreground)',
    maxHeight: '90vh',
    overflow: 'auto',
    position: 'relative',
    ...sizeStyles[size],
    ...style,
  };

  return (
    <div
      className="geist-modal-overlay"
      style={baseStyles}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
      role={role}
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
      aria-describedby={ariaDescribedBy || (subtitle ? 'modal-subtitle' : undefined)}
    >
      <div
        ref={modalRef}
        className={`geist-modal geist-modal--${size} ${className}`}
        tabIndex={-1}
        data-modal-focus
        data-geist-component="modal"
      >
        {/* Close Button */}
        {showCloseButton && !preventClose && (
          <button
            onClick={onClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: 'var(--space-4)',
              right: 'var(--space-4)',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--neutral-500)',
              fontSize: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all var(--transition-fast) var(--ease-in-out)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--neutral-100)';
              e.currentTarget.style.color = 'var(--geist-foreground)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--neutral-500)';
            }}
          >
            ✕
          </button>
        )}

        {/* Title */}
        {title && (
          <h2
            id="modal-title"
            style={{
              fontSize: 'var(--text-h2)',
              lineHeight: 'var(--line-height-h2)',
              fontWeight: '600',
              marginBottom: subtitle ? 'var(--space-1)' : 'var(--space-4)',
              paddingRight: showCloseButton ? 'var(--space-10)' : '0',
            }}
          >
            {title}
          </h2>
        )}

        {/* Subtitle */}
        {subtitle && (
          <p
            id="modal-subtitle"
            style={{
              fontSize: 'var(--text-small)',
              lineHeight: 'var(--line-height-small)',
              color: 'var(--neutral-500)',
              marginBottom: 'var(--space-4)',
              paddingRight: showCloseButton ? 'var(--space-10)' : '0',
            }}
          >
            {subtitle}
          </p>
        )}

        {/* Content */}
        <div style={!title && !subtitle ? { paddingTop: '0' } : {}}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            style={{
              marginTop: 'var(--space-6)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--neutral-200)',
              display: 'flex',
              gap: 'var(--space-2)',
              justifyContent: 'flex-end',
            }}
          >
            {footer}
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes geistModalFadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .geist-modal {
          animation: geistModalSlideIn 200ms ease-out;
        }
        
        @keyframes geistModalSlideIn {
          from {
            transform: scale(0.95) translateY(-10px);
            opacity: 0;
          }
          to {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
