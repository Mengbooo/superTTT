import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface GeistButtonProps {
  // Required
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  
  // Optional - Appearance
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  
  // Optional - Layout
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  
  // Optional - Accessibility
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
  
  // Optional - Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--geist-primary)',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--geist-foreground)',
    border: '1px solid var(--neutral-300)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--geist-foreground)',
    border: '1px solid transparent',
  },
  danger: {
    backgroundColor: 'var(--geist-error)',
    color: '#ffffff',
    border: '1px solid transparent',
  },
};

const sizeStyles: Record<string, React.CSSProperties> = {
  small: {
    height: '36px',
    padding: 'var(--space-2) var(--space-3)',
    fontSize: '14px',
  },
  medium: {
    height: '44px',
    padding: 'var(--space-2) var(--space-4)',
    fontSize: '16px',
  },
  large: {
    height: '52px',
    padding: 'var(--space-3) var(--space-5)',
    fontSize: '18px',
  },
};

/**
 * GeistButton - Geist Design System Button Component
 * 
 * Primary interactive element for user actions, following Geist design specifications.
 */
export const GeistButton = forwardRef<HTMLButtonElement, GeistButtonProps>(
  function GeistButton(
    {
      children,
      onClick,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      ariaLabel,
      type = 'button',
      className = '',
      style,
      ...props
    },
    ref
  ) {
    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      borderRadius: 'var(--radius-sm)',
      fontFamily: 'var(--font-sans)',
      fontWeight: '500',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      transition: 'all var(--transition-fast) var(--ease-in-out)',
      whiteSpace: 'nowrap',
      minWidth: '44px', // Touch target minimum
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    if (fullWidth) {
      baseStyles.width = '100%';
    }

    if (disabled || loading) {
      baseStyles.opacity = '0.5';
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!disabled && !loading) {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = '#0060df';
        } else if (variant === 'secondary' || variant === 'ghost') {
          e.currentTarget.style.backgroundColor = 'var(--neutral-100)';
        } else if (variant === 'danger') {
          e.currentTarget.style.backgroundColor = '#d42525';
        }
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.style.backgroundColor = variantStyles[variant].backgroundColor as string;
    };

    return (
      <button
        ref={ref}
        type={type}
        className={`geist-button geist-button--${variant} geist-button--${size} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-busy={loading}
        style={{ ...baseStyles, ...style }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-geist-component="button"
      >
        {loading && (
          <svg
            className="geist-button__spinner"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="31.4 31.4"
              opacity="0.3"
            />
            <path
              d="M12 2a10 10 0 0 1 10 10"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}
        {leftIcon && !loading && <span className="geist-button__icon-left">{leftIcon}</span>}
        <span className="geist-button__content">{children}</span>
        {rightIcon && !loading && <span className="geist-button__icon-right">{rightIcon}</span>}
      </button>
    );
  }
);
