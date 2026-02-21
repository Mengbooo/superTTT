import React, { InputHTMLAttributes, forwardRef, useId } from 'react';

export interface GeistInputProps {
  // Required
  value: string;
  onChange: (value: string) => void;
  
  // Optional - Appearance
  type?: 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url';
  placeholder?: string;
  label?: string;
  helperText?: string;
  error?: string;
  
  // Optional - Behavior
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  autoFocus?: boolean;
  
  // Optional - Validation
  pattern?: string;
  minLength?: number;
  maxLength?: number;
  
  // Optional - Layout
  fullWidth?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  
  // Optional - Accessibility
  id?: string;
  name?: string;
  ariaDescribedBy?: string;
  
  // Optional - Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

/**
 * GeistInput - Geist Design System Input Component
 * 
 * Text input field with Geist styling, supporting various input types and validation states.
 */
export const GeistInput = forwardRef<HTMLInputElement, GeistInputProps>(
  function GeistInput(
    {
      value,
      onChange,
      type = 'text',
      placeholder,
      label,
      helperText,
      error,
      disabled = false,
      readOnly = false,
      required = false,
      autoFocus = false,
      pattern,
      minLength,
      maxLength,
      fullWidth = false,
      leftElement,
      rightElement,
      id: providedId,
      name,
      ariaDescribedBy,
      className = '',
      style,
      ...props
    },
    ref
  ) {
    const generatedId = useId();
    const inputId = providedId || generatedId;
    const hasError = !!error;
    
    const baseStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      width: fullWidth ? '100%' : 'auto',
      borderRadius: 'var(--radius-sm)',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: hasError 
        ? 'var(--geist-error)' 
        : 'var(--neutral-300)',
      backgroundColor: disabled ? 'var(--neutral-100)' : 'var(--geist-background)',
      padding: 'var(--space-2) var(--space-3)',
      minHeight: '44px', // Touch target minimum
      transition: 'border-color var(--transition-fast) var(--ease-in-out)',
      fontFamily: 'var(--font-sans)',
      fontSize: '16px',
      lineHeight: '24px',
      color: 'var(--geist-foreground)',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? '0.6' : '1',
    };

    const inputWrapperStyles: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-2)',
      flex: '1',
    };

    const inputStyles: React.CSSProperties = {
      flex: '1',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      color: 'inherit',
      minWidth: '0', // Allow text truncation
    };

    if (readOnly) {
      baseStyles.backgroundColor = 'transparent';
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!readOnly && !disabled) {
        onChange(e.target.value);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled && !readOnly) {
        e.currentTarget.style.borderColor = 'var(--geist-primary)';
        e.currentTarget.style.boxShadow = '0 0 0 2px var(--geist-primary)';
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = hasError 
        ? 'var(--geist-error)' 
        : 'var(--neutral-300)';
      e.currentTarget.style.boxShadow = 'none';
    };

    return (
      <div className={`geist-input-wrapper ${className}`} style={style}>
        {label && (
          <label 
            htmlFor={inputId}
            style={{
              display: 'block',
              marginBottom: 'var(--space-2)',
              fontSize: 'var(--text-small)',
              lineHeight: 'var(--line-height-small)',
              fontWeight: '500',
              color: 'var(--geist-foreground)',
            }}
          >
            {label}
            {required && (
              <span style={{ color: 'var(--geist-error)', marginLeft: 'var(--space-1)' }}>*</span>
            )}
          </label>
        )}
        
        <div 
          className="geist-input"
          style={baseStyles}
          data-geist-component="input"
          data-state={hasError ? 'error' : disabled ? 'disabled' : 'default'}
        >
          {leftElement && (
            <span className="geist-input__left-element" style={{ display: 'flex', alignItems: 'center' }}>
              {leftElement}
            </span>
          )}
          
          <div style={inputWrapperStyles}>
            <input
              ref={ref}
              id={inputId}
              type={type}
              value={value}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              required={required}
              autoFocus={autoFocus}
              pattern={pattern}
              minLength={minLength}
              maxLength={maxLength}
              name={name}
              aria-describedby={ariaDescribedBy || (error ? `${inputId}-error` : undefined)}
              aria-invalid={hasError}
              style={inputStyles}
              {...props}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          
          {rightElement && (
            <span className="geist-input__right-element" style={{ display: 'flex', alignItems: 'center' }}>
              {rightElement}
            </span>
          )}
        </div>
        
        {(helperText || error) && (
          <p
            id={`${inputId}-error`}
            style={{
              marginTop: 'var(--space-2)',
              fontSize: 'var(--text-small)',
              lineHeight: 'var(--line-height-small)',
              color: hasError ? 'var(--geist-error)' : 'var(--neutral-500)',
            }}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
