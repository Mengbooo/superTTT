# Research: Geist Design System Implementation

**Feature**: Vercel Geist Design System Integration  
**Date**: 2026-02-21  
**Status**: Complete

## Research Objectives

This document resolves all technical unknowns and provides implementation guidance for integrating Geist Design System into the Ultimate Tic-Tac-Toe application.

---

## Decision 1: CSS Custom Properties for Design Tokens

**Decision**: Use native CSS custom properties (CSS variables) to implement Geist design tokens without external dependencies like Styled Components or Emotion.

**Rationale**:
- Project already uses Tailwind CSS for utility-first styling
- Zero runtime overhead compared to JS-in-CSS solutions
- Native browser support enables fast theme switching (light/dark mode)
- Compatible with existing React component architecture
- Performance: <1ms variable lookup vs ~5-10ms for JS-based theming
- Aligns with constraint: "Zero external UI component dependencies"

**Alternatives Considered**:
1. **Tailwind Config Extension**: Could extend Tailwind theme config, but limits runtime theme switching flexibility
2. **Styled Components**: Adds 13KB bundle size, overkill for token-only implementation
3. **CSS Modules**: Doesn't solve global token sharing across components
4. **PostCSS Theme Plugin**: Unnecessary complexity, conflicts with existing PostCSS setup

**Implementation Pattern**:
```css
/* src/styles/geist-tokens.css */
:root {
  /* Geist Neutral Palette */
  --geist-background: #ffffff;
  --geist-foreground: #000000;
  --neutral-50: #fafafa;
  --neutral-100: #f5f5f5;
  --neutral-200: #eaeaea;
  /* ... full palette */
  
  /* Accent Colors */
  --geist-primary: #0070F3;
  --geist-success: #17C470;
  --geist-warning: #F5A623;
  --geist-error: #EB5757;
}

[data-theme='dark'] {
  --geist-background: #000000;
  --geist-foreground: #ffffff;
  --neutral-50: #171717;
  /* ... inverted palette */
}
```

---

## Decision 2: Geist Sans Font Integration via System Font Stack

**Decision**: Use system font stack with Geist Sans as preferred font via Google Fonts CDN, with fallback to system sans-serif.

**Rationale**:
- Geist Sans is open-source (MIT licensed) and free to use
- Google Fonts CDN provides automatic optimization (WOFF2 format, subset loading)
- System font fallback ensures zero layout shift if CDN unavailable
- Performance: Geist Sans Regular + Medium = ~40KB total (compressed)
- Alternative: Self-host fonts increases bundle complexity without significant benefit

**Alternatives Considered**:
1. **Self-hosting Geist Fonts**: More control but adds build complexity
2. **System Fonts Only**: Fastest (0KB) but loses Geist visual identity
3. **Vercel Sans (new rebrand)**: Same as Geist, just renamed - using Geist name for consistency

**Implementation Pattern**:
```css
/* In geist-tokens.css */
@import url('https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap');

:root {
  --font-sans: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Geist Mono', 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}
```

**Type Scale Specification**:
| Level | Size | Line Height | Weight | Use Case |
|-------|------|-------------|--------|----------|
| Display | 48px | 56px | 700 | Hero sections |
| H1 | 32px | 40px | 600 | Page titles |
| H2 | 24px | 32px | 600 | Section headers |
| H3 | 20px | 28px | 500 | Subsections |
| Body | 16px | 24px | 400 | Primary content |
| Small | 14px | 20px | 400 | Secondary text |
| Caption | 12px | 16px | 400 | Labels, hints |

---

## Decision 3: Spacing System Based on 4px Grid

**Decision**: Implement Geist spacing using 4px increment system with both CSS tokens and Tailwind config extension.

**Rationale**:
- Geist Design uses 4px base unit for all spacing
- Extending Tailwind config maintains compatibility with existing codebase
- Dual approach (CSS + Tailwind) enables flexible usage patterns
- Consistent with existing project structure (already uses Tailwind)

**Implementation Pattern**:
```css
/* CSS Tokens */
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
}
```

```js
// tailwind.config.js extension
module.exports = {
  theme: {
    extend: {
      spacing: {
        'geist-1': '4px',
        'geist-2': '8px',
        'geist-3': '12px',
        'geist-4': '16px',
        'geist-5': '20px',
        'geist-6': '24px',
        'geist-8': '32px',
        'geist-10': '40px',
      }
    }
  }
}
```

---

## Decision 4: Component Border Radius Strategy

**Decision**: Standardize border radius values per component type as specified in Geist documentation.

**Rationale**:
- Geist has specific radius values that define its visual language
- Consistent application creates cohesive appearance
- Simple CSS tokens enable easy overrides

**Specification**:
| Component Type | Border Radius | Token |
|----------------|---------------|-------|
| Buttons | 8px | `--radius-sm` |
| Inputs | 8px | `--radius-sm` |
| Cards | 12px | `--radius-md` |
| Modals/Dialogs | 16px | `--radius-lg` |
| Badges/Tags | 9999px (pill) | `--radius-full` |

---

## Decision 5: Shadow System for Depth

**Decision**: Implement Geist shadow system using three elevation levels with CSS box-shadow tokens.

**Rationale**:
- Geist uses subtle shadows for depth hierarchy
- Three levels sufficient for all use cases
- CSS tokens enable theme-aware adjustments (darker shadows in light mode)

**Specification**:
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
}
```

**Usage**:
- `shadow-sm`: Hover states, subtle elevation
- `shadow`: Cards, dropdowns, default modals
- `shadow-lg`: Prominent modals, popovers

---

## Decision 6: Animation Timing and Easing

**Decision**: Standardize on Geist animation specifications: 150ms duration with ease-in-out timing for all transitions.

**Rationale**:
- Geist specifies 150ms as standard transition duration
- Matches user requirement: "interaction feedback follows Geist specifications (150ms transition)"
- Ease-in-out provides natural feel for UI transitions
- Performance: Using transform/opacity only avoids layout thrashing

**Specification**:
```css
:root {
  --transition-fast: 150ms;
  --transition-normal: 250ms;
  --transition-slow: 300ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Usage pattern */
.button {
  transition: background-color var(--transition-fast) var(--ease-in-out),
              transform var(--transition-fast) var(--ease-in-out);
}
```

**Performance Optimization**:
- Only animate `transform` and `opacity` (composite properties)
- Avoid animating `width`, `height`, `top`, `left` (trigger layout)
- Use `will-change: transform` sparingly for complex animations

---

## Decision 7: Responsive Breakpoint Strategy

**Decision**: Implement Geist responsive breakpoints using mobile-first approach with Tailwind's breakpoint system.

**Rationale**:
- Project already uses Tailwind CSS
- Geist emphasizes mobile responsiveness
- Mobile-first approach reduces CSS payload

**Breakpoint Specification**:
| Name | Min Width | Tailwind Class | Use Case |
|------|-----------|----------------|----------|
| sm | 640px | `sm:` | Small tablets |
| md | 768px | `md:` | Tablets |
| lg | 1024px | `lg:` | Laptops |
| xl | 1280px | `xl:` | Desktops |
| 2xl | 1536px | `2xl:` | Large screens |

**Touch Target Compliance**:
- Minimum touch target: 44×44px (WCAG requirement)
- Implemented via min-height/min-width constraints
- Verified through automated accessibility tests

---

## Decision 8: Dark Mode Implementation

**Decision**: Use CSS data attribute (`[data-theme='dark']`) for theme switching with localStorage persistence.

**Rationale**:
- No JavaScript framework dependencies
- Instant theme switching (no flash of unstyled content)
- Works with system preference detection via `prefers-color-scheme`
- Simple React hook integration for manual toggle

**Implementation Pattern**:
```typescript
// hooks/useGeistTheme.ts
export function useGeistTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  useEffect(() => {
    // Load from localStorage or system preference
    const saved = localStorage.getItem('geist-theme');
    if (saved) {
      setTheme(saved as 'light' | 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);
  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('geist-theme', theme);
  }, [theme]);
  
  return { theme, toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light') };
}
```

---

## Best Practices Summary

### Color Contrast Compliance
- All text/background combinations MUST pass WCAG AA (≥4.5:1)
- Use automated testing: axe-core or similar
- Manual verification for edge cases (accent colors on colored backgrounds)

### Component Reusability
- Each UI component must be self-contained
- Props interface defines customization points
- Avoid hard-coded values; always use design tokens

### Testing Strategy
1. **Contract Tests**: Verify component API stability
2. **Visual Regression Tests**: Percy or Chromatic for screenshot comparison
3. **Accessibility Tests**: Automated contrast checks + keyboard navigation
4. **Interaction Tests**: Hover, focus, active states verified

### Performance Budget
- Additional CSS payload: <50KB (gzipped)
- Font payload: <50KB ( Geist Sans + Mono, compressed)
- Theme switch latency: <16ms (1 frame at 60fps)
- No layout shift during font loading (use `font-display: swap`)

---

## References

- [Geist Design Documentation](https://vercel.com/design)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Custom Properties Best Practices](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Tailwind CSS Configuration](https://tailwindcss.com/docs/configuration)

---

**Research Status**: COMPLETE  
**All NEEDS CLARIFICATION items resolved**: YES  
**Ready for Phase 1**: YES
