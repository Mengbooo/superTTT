import React from 'react';
import { useGeistContext } from '../GeistProvider';

interface ThemeToggleProps {
  className?: string;
}

/**
 * ThemeToggle - Button to switch between light and dark modes
 * 
 * Uses Geist design tokens for styling and provides accessible
 * theme switching functionality.
 */
export function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const { mode, toggleTheme } = useGeistContext();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className={`theme-toggle ${className}`}
      aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--neutral-300)',
        backgroundColor: 'var(--geist-background)',
        color: 'var(--geist-foreground)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast) var(--ease-in-out)',
        fontSize: '20px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--neutral-100)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--geist-background)';
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 2px var(--geist-primary)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {mode === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
