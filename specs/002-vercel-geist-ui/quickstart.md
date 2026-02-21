# Quickstart: Geist Design System Integration

**Feature**: Vercel Geist Design System Integration  
**Date**: 2026-02-21  
**Version**: 1.0.0

## Overview

This guide walks you through integrating Geist Design System into the Ultimate Tic-Tac-Toe application. Follow these steps to achieve visual consistency across your application.

---

## Prerequisites

- Node.js 18+ and npm/yarn installed
- Existing React + TypeScript + Tailwind CSS project (this repo)
- Basic understanding of CSS custom properties
- Familiarity with React component patterns

---

## Step 1: Install Geist Fonts

Add Geist Sans and Geist Mono fonts via Google Fonts CDN.

### Action

Edit `index.html` in the project root:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- Add these lines before existing stylesheets -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- Existing stylesheets -->
    <link rel="stylesheet" href="/src/styles/index.css">
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### Verification

Open browser DevTools → Network tab → Reload page → Verify Geist fonts are loaded.

---

## Step 2: Create Geist Design Tokens

Create the CSS custom properties file with all Geist tokens.

### Action

Create `src/styles/geist-tokens.css`:

```css
/* Geist Design System Tokens */

/* Font Families */
:root {
  --font-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

/* Neutral Color Palette */
:root {
  /* Light Mode Defaults */
  --geist-background: #ffffff;
  --geist-foreground: #000000;
  
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #eaeaea;
  --neutral-300: #cdcdcd;
  --neutral-400: #999999;
  --neutral-500: #666666;
  --neutral-600: #444444;
  --neutral-700: #333333;
  --neutral-800: #171717;
  --neutral-900: #0a0a0a;
  
  /* Accent Colors */
  --geist-primary: #0070F3;
  --geist-success: #17C470;
  --geist-warning: #F5A623;
  --geist-error: #EB5757;
  
  /* Spacing Scale (4px base unit) */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  
  /* Border Radius */
  --radius-sm: 8px;    /* Buttons, Inputs */
  --radius-md: 12px;   /* Cards */
  --radius-lg: 16px;   /* Modals */
  --radius-full: 9999px; /* Pills, badges */
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  
  /* Typography Scale */
  --text-display: 48px;
  --line-height-display: 56px;
  
  --text-h1: 32px;
  --line-height-h1: 40px;
  
  --text-h2: 24px;
  --line-height-h2: 32px;
  
  --text-h3: 20px;
  --line-height-h3: 28px;
  
  --text-body: 16px;
  --line-height-body: 24px;
  
  --text-small: 14px;
  --line-height-small: 20px;
  
  --text-caption: 12px;
  --line-height-caption: 16px;
  
  /* Animation */
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 300ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Dark Mode Overrides */
[data-theme='dark'] {
  --geist-background: #000000;
  --geist-foreground: #ffffff;
  
  --neutral-50: #171717;
  --neutral-100: #1a1a1a;
  --neutral-200: #222222;
  --neutral-300: #333333;
  --neutral-400: #444444;
  --neutral-500: #666666;
  --neutral-600: #888888;
  --neutral-700: #aaaaaa;
  --neutral-800: #cccccc;
  --neutral-900: #eeeeee;
  
  /* Adjust shadows for dark mode */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.4);
}
```

### Verification

Run the development server and inspect any element to verify CSS variables are available.

---

## Step 3: Update Main Stylesheet

Import Geist tokens into your main stylesheet.

### Action

Edit `src/styles/index.css`:

```css
/* Import Geist tokens first */
@import './geist-tokens.css';

/* Tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--geist-background);
  color: var(--geist-foreground);
  transition: background-color var(--transition-fast) var(--ease-in-out),
              color var(--transition-fast) var(--ease-in-out);
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid var(--geist-primary);
  outline-offset: 2px;
}
```

### Verification

Check that the app loads without console errors and fonts render correctly.

---

## Step 4: Create Theme Hook

Implement React hook for theme management.

### Action

Create `src/hooks/useGeistTheme.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useGeistTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('geist-theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
    
    setIsLoaded(true);
  }, []);
  
  // Apply theme to DOM
  useEffect(() => {
    if (!isLoaded) return;
    
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('geist-theme', theme);
  }, [theme, isLoaded]);
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return { theme, isLoaded, toggleTheme };
}
```

### Verification

Test the hook in a component and verify localStorage persistence.

---

## Step 5: Integrate Theme Provider

Apply theme context at the app root.

### Action

Edit `src/App.tsx`:

```tsx
import { useGeistTheme } from './hooks/useGeistTheme';

function App() {
  const { theme, isLoaded, toggleTheme } = useGeistTheme();
  
  if (!isLoaded) {
    return <div>Loading...</div>; // Prevent flash of unstyled content
  }
  
  return (
    <div className="app">
      {/* Theme toggle button */}
      <button 
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          top: 'var(--space-4)',
          right: 'var(--space-4)',
          zIndex: 1000
        }}
      >
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
      
      {/* Your existing app content */}
      {/* ... */}
    </div>
  );
}

export default App;
```

### Verification

Click the theme toggle button and verify smooth transition between light/dark modes.

---

## Step 6: Update Existing Components

Apply Geist styling to existing components.

### Example: Update Game Board

Edit your existing board component to use Geist tokens:

```tsx
// Before
const Board = () => (
  <div style={{ padding: '20px', background: '#f5f5f5' }}>
    {/* ... */}
  </div>
);

// After
const Board = () => (
  <div style={{ 
    padding: 'var(--space-5)', 
    background: 'var(--neutral-100)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow)'
  }}>
    {/* ... */}
  </div>
);
```

### Verification

Navigate to game board and verify consistent Geist styling.

---

## Step 7: Test Accessibility

Verify WCAG compliance.

### Actions

1. **Automated Testing**: Run axe-core or Lighthouse accessibility audit
2. **Manual Testing**:
   - Tab through all interactive elements
   - Verify focus rings are visible
   - Check contrast ratios with WebAIM Contrast Checker
   - Test with screen reader (NVDA/VoiceOver)

### Expected Results

- All text has contrast ratio ≥4.5:1
- All interactive elements have visible focus states
- Touch targets are minimum 44×44px
- Keyboard navigation works for all features

---

## Troubleshooting

### Issue: Fonts not loading

**Solution**: Check network tab for 404 errors. Verify Google Fonts URL is correct.

### Issue: Theme flicker on reload

**Solution**: Ensure theme initialization happens before first paint. Consider inline script in `<head>`:

```html
<script>
  const saved = localStorage.getItem('geist-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
</script>
```

### Issue: CSS variables undefined

**Solution**: Verify `geist-tokens.css` is imported before components that use the variables.

### Issue: Transitions janky

**Solution**: Ensure only animating `transform` and `opacity`. Avoid animating `width`, `height`, `top`, `left`.

---

## Next Steps

After completing quickstart:

1. Review `data-model.md` for entity specifications
2. Review `contracts/component-api.md` for component APIs
3. Begin implementing reusable Geist components (Button, Input, Card, Modal)
4. Write contract tests for each component
5. Update remaining screens with Geist styling

---

**Quickstart Status**: COMPLETE  
**Estimated Time**: 30-45 minutes  
**Difficulty**: Beginner-friendly
