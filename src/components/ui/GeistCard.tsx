import React, { HTMLAttributes, forwardRef } from 'react';

export interface GeistCardProps {
  // Content
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  
  // Optional - Appearance
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  
  // Optional - Interactions
  clickable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  
  // Optional - Layout
  fullWidth?: boolean;
  maxWidth?: string | number;
  
  // Optional - Accessibility
  role?: string;
  ariaLabel?: string;
  
  // Optional - Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

const paddingStyles: Record<string, React.CSSProperties> = {
  none: { padding: '0' },
  small: { padding: 'var(--space-4)' },
  medium: { padding: 'var(--space-6)' },
  large: { padding: 'var(--space-8)' },
};

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    backgroundColor: 'var(--geist-background)',
    border: '1px solid var(--neutral-200)',
    boxShadow: 'var(--shadow-sm)',
  },
  elevated: {
    backgroundColor: 'var(--geist-background)',
    border: '1px solid var(--neutral-200)',
    boxShadow: 'var(--shadow)',
  },
  outlined: {
    backgroundColor: 'var(--geist-background)',
    border: '1px solid var(--neutral-300)',
    boxShadow: 'none',
  },
};

/**
 * GeistCard - Geist Design System Card Component
 * 
 * Container component for grouping related content with Geist styling.
 */
export const GeistCard = forwardRef<HTMLDivElement, GeistCardProps>(
  function GeistCard(
    {
      children,
      title,
      subtitle,
      footer,
      variant = 'default',
      padding = 'medium',
      clickable = false,
      onClick,
      fullWidth = false,
      maxWidth,
      role,
      ariaLabel,
      className = '',
      style,
      ...props
    },
    ref
  ) {
    const baseStyles: React.CSSProperties = {
      borderRadius: 'var(--radius-md)',
      transition: 'all var(--transition-fast) var(--ease-in-out)',
      fontFamily: 'var(--font-sans)',
      ...variantStyles[variant],
      ...paddingStyles[padding],
    };

    if (fullWidth) {
      baseStyles.width = '100%';
    }

    if (maxWidth) {
      baseStyles.maxWidth = typeof maxWidth === 'string' ? maxWidth : `${maxWidth}px`;
    }

    if (clickable) {
      baseStyles.cursor = 'pointer';
      // Hover state will be applied via onMouseEnter
    }

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable) {
        e.currentTarget.style.boxShadow = 'var(--shadow)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable) {
        e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow as string;
        e.currentTarget.style.transform = 'translateY(0)';
      }
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (clickable && onClick) {
        onClick(e);
      }
    };

    return (
      <div
        ref={ref}
        className={`geist-card geist-card--${variant} geist-card--padding-${padding} ${className}`}
        role={clickable ? 'button' : role}
        aria-label={ariaLabel}
        tabIndex={clickable ? 0 : undefined}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ ...baseStyles, ...style }}
        data-geist-component="card"
        {...props}
      >
        {(title || subtitle) && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            {title && (
              <h3
                style={{
                  fontSize: 'var(--text-h3)',
                  lineHeight: 'var(--line-height-h3)',
                  fontWeight: '500',
                  color: 'var(--geist-foreground)',
                  margin: '0 0 var(--space-1) 0',
                }}
              >
                {title}
              </h3>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: 'var(--text-small)',
                  lineHeight: 'var(--line-height-small)',
                  color: 'var(--neutral-500)',
                  margin: '0',
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
        )}

        <div>{children}</div>

        {footer && (
          <div
            style={{
              marginTop: 'var(--space-4)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--neutral-200)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);
