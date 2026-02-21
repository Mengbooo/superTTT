# Component API Contracts

**Feature**: Geist Design System Integration  
**Date**: 2026-02-21  
**Status**: Draft

## Overview

This document defines the public API contracts for all Geist-styled UI components. Each contract specifies props, behavior, and styling guarantees.

---

## Contract 1: GeistButton

### Purpose

Primary interactive element for user actions, following Geist design specifications.

### Props Interface

```typescript
interface GeistButtonProps {
  // Required
  children: React.ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  
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
```

### Default Values

```typescript
const defaultProps: GeistButtonProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  fullWidth: false,
  type: 'button'
};
```

### Behavior Guarantees

1. **Hover State**: Background color transition completes within 150ms with ease-in-out timing
2. **Focus Ring**: Visible 2px solid ring in primary color when focused via keyboard
3. **Disabled State**: Opacity reduced to 0.5, pointer-events set to none
4. **Loading State**: Shows spinner, disables interactions, maintains button dimensions
5. **Touch Target**: Minimum 44×44px regardless of visual size

### Styling Guarantees

| Property | Value |
|----------|-------|
| Border Radius | 8px |
| Font Family | Geist Sans (or system sans-serif) |
| Font Weight | 500 (medium) |
| Transition | all 150ms ease-in-out |
| White Space | nowrap (text truncation with ellipsis if needed) |

### Size Specifications

| Size | Height | Padding-X | Font Size |
|------|--------|-----------|-----------|
| small | 36px | 12px | 14px |
| medium | 44px | 16px | 16px |
| large | 52px | 20px | 18px |

### Usage Examples

```tsx
// Primary action
<GeistButton onClick={handleSubmit}>Submit</GeistButton>

// Secondary action with icon
<GeistButton variant="secondary" leftIcon={<DownloadIcon />}>
  Download
</GeistButton>

// Loading state
<GeistButton loading onClick={handleSave}>
  Saving...
</GeistButton>

// Full width button
<GeistButton fullWidth variant="danger">
  Delete Account
</GeistButton>
```

---

## Contract 2: GeistInput

### Purpose

Text input field with Geist styling, supporting various input types and validation states.

### Props Interface

```typescript
interface GeistInputProps {
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
```

### Default Values

```typescript
const defaultProps: GeistInputProps = {
  type: 'text',
  disabled: false,
  readOnly: false,
  required: false,
  fullWidth: false
};
```

### Behavior Guarantees

1. **Focus State**: Border color changes to primary color with 2px focus ring
2. **Hover State**: Border color enhances slightly (neutral-300 → neutral-400)
3. **Error State**: Border color becomes error red (#EB5757), helper text shows error message
4. **Transition**: All state changes complete within 150ms
5. **Touch Target**: Minimum height 44px

### Styling Guarantees

| Property | Value |
|----------|-------|
| Border Radius | 8px |
| Border Width | 1px |
| Border Color (default) | neutral-300 |
| Border Color (focus) | geist-primary |
| Padding | 8px 12px |
| Font Size | 16px |
| Line Height | 24px |

### States

| State | Border Color | Background | Notes |
|-------|--------------|------------|-------|
| Default | neutral-300 | background | Initial state |
| Hover | neutral-400 | background | User hovering |
| Focus | geist-primary | background | Keyboard/tab focus |
| Error | geist-error | background | Validation failed |
| Disabled | neutral-200 | neutral-100 | No interaction |
| ReadOnly | neutral-300 | transparent | No border change |

### Usage Examples

```tsx
// Basic input
<GeistInput 
  value={email} 
  onChange={setEmail} 
  placeholder="Enter your email"
/>

// Input with label and helper
<GeistInput
  value={username}
  onChange={setUsername}
  label="Username"
  helperText="Choose a unique username"
/>

// Input with error
<GeistInput
  value={password}
  onChange={setPassword}
  type="password"
  label="Password"
  error="Password must be at least 8 characters"
/>

// Input with icon
<GeistInput
  value={search}
  onChange={setSearch}
  placeholder="Search..."
  leftElement={<SearchIcon />}
/>
```

---

## Contract 3: GeistCard

### Purpose

Container component for grouping related content with Geist styling.

### Props Interface

```typescript
interface GeistCardProps {
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
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  
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
```

### Default Values

```typescript
const defaultProps: GeistCardProps = {
  variant: 'default',
  padding: 'medium',
  clickable: false,
  fullWidth: false
};
```

### Behavior Guarantees

1. **Clickable Cards**: Show hover elevation and cursor pointer
2. **Responsive**: Content wraps appropriately based on container width
3. **Edge Whitespace**: Maintains minimum 24px padding from card edges

### Styling Guarantees

| Property | Value |
|----------|-------|
| Border Radius | 12px |
| Border | 1px solid neutral-200 (light) / neutral-800 (dark) |
| Background | geist-background |
| Shadow (default) | shadow-sm |
| Shadow (elevated) | shadow |
| Shadow (outlined) | none |

### Padding Options

| Padding | Value | Use Case |
|---------|-------|----------|
| none | 0px | Custom internal layout |
| small | 16px | Compact cards |
| medium | 24px | Standard cards (default) |
| large | 32px | Feature cards, prominent content |

### Usage Examples

```tsx
// Basic card
<GeistCard title="Game Stats" subtitle="Current session">
  <p>Games played: 10</p>
  <p>Win rate: 60%</p>
</GeistCard>

// Elevated card with footer
<GeistCard 
  variant="elevated" 
  title="Premium Features"
  footer={<GeistButton fullWidth>Upgrade Now</GeistButton>}
>
  <p>Unlock advanced analytics and more!</p>
</GeistCard>

// Clickable card
<GeistCard 
  clickable 
  onClick={() => navigate('/settings')}
  ariaLabel="Go to settings"
>
  <SettingsContent />
</GeistCard>
```

---

## Contract 4: GeistModal

### Purpose

Dialog overlay for focused user interactions and confirmations.

### Props Interface

```typescript
interface GeistModalProps {
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
```

### Default Values

```typescript
const defaultProps: GeistModalProps = {
  size: 'medium',
  closeOnOverlayClick: true,
  showCloseButton: true,
  preventClose: false,
  autoFocus: true,
  trapFocus: true,
  role: 'dialog'
};
```

### Behavior Guarantees

1. **Focus Trap**: When open, focus cycles within modal (trapFocus: true)
2. **Escape Key**: Closes modal unless preventClose is true
3. **Overlay Click**: Closes modal if closeOnOverlayClick is true
4. **Scroll Lock**: Body scroll is disabled when modal is open
5. **Animation**: Fade-in/scale-up animation completes within 200ms

### Styling Guarantees

| Property | Value |
|----------|-------|
| Border Radius | 16px |
| Shadow | shadow-lg |
| Max Width (small) | 400px |
| Max Width (medium) | 600px |
| Max Width (large) | 800px |
| Max Width (fullscreen) | 100vw |
| Overlay Background | rgba(0, 0, 0, 0.5) |
| Animation Duration | 200ms |

### Size Specifications

| Size | Max Width | Padding | Use Case |
|------|-----------|---------|----------|
| small | 400px | 24px | Confirmations, alerts |
| medium | 600px | 24px | Forms, detailed messages |
| large | 800px | 32px | Complex content, wizards |
| fullscreen | 100vw | 40px | Immersive experiences |

### Usage Examples

```tsx
// Simple confirmation modal
<GeistModal
  isOpen={showDeleteConfirm}
  onClose={() => setShowDeleteConfirm(false)}
  title="Delete Item?"
  footer={
    <>
      <GeistButton variant="secondary" onClick={cancel}>Cancel</GeistButton>
      <GeistButton variant="danger" onClick={confirm}>Delete</GeistButton>
    </>
  }
>
  <p>This action cannot be undone.</p>
</GeistModal>

// Large modal with custom content
<GeistModal
  isOpen={showSettings}
  onClose={closeSettings}
  size="large"
  title="Settings"
>
  <SettingsForm />
</GeistModal>

// Modal that prevents accidental closing
<GeistModal
  isOpen={showCriticalAlert}
  onClose={handleAcknowledge}
  preventClose={true}
  closeOnOverlayClick={false}
  role="alertdialog"
>
  <CriticalAlertContent />
</GeistModal>
```

---

## Testing Requirements

### Contract Tests

Each component MUST have contract tests verifying:

1. **Prop Acceptance**: All defined props are accepted without errors
2. **Default Values**: Omitted props use specified defaults
3. **Event Handling**: onClick, onChange fire correctly
4. **Accessibility**: ARIA attributes applied correctly
5. **Styling**: CSS classes and inline styles applied as specified

### Example Test Structure

```typescript
// tests/contract/geist-button.test.tsx
describe('GeistButton Contract', () => {
  it('accepts all required props', () => {
    render(<GeistButton onClick={vi.fn()}>Click me</GeistButton>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });
  
  it('uses default variant (primary)', () => {
    const { container } = render(<GeistButton>Test</GeistButton>);
    expect(container.firstChild).toHaveClass('geist-button--primary');
  });
  
  it('maintains 44px minimum height for medium size', () => {
    const { container } = render(<GeistButton>Test</GeistButton>);
    expect(container.firstChild).toHaveStyle('min-height: 44px');
  });
  
  it('applies focus ring on keyboard navigation', async () => {
    render(<GeistButton>Test</GeistButton>);
    const button = screen.getByRole('button');
    await userEvent.tab();
    expect(button).toHaveFocus();
    expect(button).toHaveStyle('box-shadow: 0 0 0 2px var(--geist-primary)');
  });
});
```

---

**Contract Status**: DRAFT  
**Ready for Implementation**: PENDING APPROVAL
