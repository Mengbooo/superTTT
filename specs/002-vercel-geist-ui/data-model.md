# Data Model: Geist Design System Entities

**Feature**: Vercel Geist Design System Integration  
**Date**: 2026-02-21  
**Status**: Draft

## Overview

This document defines the core entities and their relationships for implementing Geist Design System tokens and components in the Ultimate Tic-Tac-Toe application.

---

## Entity 1: ColorToken

**Description**: Represents a single color value in the Geist palette with semantic naming and theme variants.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Semantic token name (e.g., "geist-primary", "neutral-200") |
| `lightValue` | string | Yes | Hex value for light mode (e.g., "#0070F3") |
| `darkValue` | string | No | Hex value for dark mode (defaults to lightValue) |
| `category` | enum | Yes | Category: "neutral" | "accent" | "feedback" |
| `usage` | string[] | No | Array of use cases (e.g., ["buttons", "links", "focus-rings"]) |

### Validation Rules

- `name` MUST follow kebab-case convention
- `lightValue` and `darkValue` MUST be valid 6-digit hex colors
- `category` MUST be one of the defined enum values
- All accent colors MUST have corresponding feedback usage defined

### Example Instance

```typescript
{
  name: "geist-primary",
  lightValue: "#0070F3",
  darkValue: "#0070F3",
  category: "accent",
  usage: ["buttons", "links", "focus-rings", "interactive-elements"]
}
```

---

## Entity 2: SpacingToken

**Description**: Represents a spacing value based on the 4px grid system.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `scale` | number | Yes | Multiplier of base unit (e.g., 1 = 4px, 2 = 8px) |
| `pixelValue` | number | Yes | Actual pixel value (scale × 4) |
| `cssName` | string | Yes | CSS variable name (e.g., "--space-1") |
| `tailwindName` | string | Yes | Tailwind class extension (e.g., "geist-1") |
| `commonUses` | string[] | No | Typical applications (e.g., ["button-padding", "gap-small"]) |

### Validation Rules

- `scale` MUST be a positive integer or half-integer (0.5, 1, 1.5, 2, ...)
- `pixelValue` MUST equal `scale × 4`
- `cssName` MUST follow pattern `--space-{scale}`
- `tailwindName` MUST follow pattern `geist-{scale}`

### Complete Token Set

| Scale | Pixel Value | CSS Name | Tailwind Name | Common Uses |
|-------|-------------|----------|---------------|-------------|
| 1 | 4px | --space-1 | geist-1 | Icon gaps, tight spacing |
| 2 | 8px | --space-2 | geist-2 | Input padding, small gaps |
| 3 | 12px | --space-3 | geist-3 | Card padding, button gaps |
| 4 | 16px | --space-4 | geist-4 | Section spacing |
| 5 | 20px | --space-5 | geist-5 | Large component gaps |
| 6 | 24px | --space-6 | geist-6 | Page margins, modal padding |
| 8 | 32px | --space-8 | geist-8 | Section margins |
| 10 | 40px | --space-10 | geist-10 | Hero spacing |

---

## Entity 3: TypographyScale

**Description**: Defines a typography level with size, line height, weight, and usage guidelines.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `level` | enum | Yes | Hierarchy level: "display" | "h1" | "h2" | "h3" | "body" | "small" | "caption" |
| `fontSize` | number | Yes | Font size in pixels |
| `lineHeight` | number | Yes | Line height in pixels |
| `fontWeight` | number | No | Default weight (400 | 500 | 600 | 700) |
| `fontFamily` | enum | Yes | "sans" | "mono" |
| `letterSpacing` | string | No | Letter spacing (e.g., "-0.02em") |
| `semanticUse` | string | Yes | When to use (e.g., "Page titles", "Body content") |

### Validation Rules

- `fontSize` MUST be ≥12px and ≤64px (Geist range)
- `lineHeight` MUST be ≥ fontSize (minimum 1.0 ratio)
- `fontWeight` MUST be one of: 400, 500, 600, 700
- Contrast ratio for text using this scale MUST meet WCAG AA

### Complete Type Scale

| Level | Size | Line Height | Weight | Family | Use Case |
|-------|------|-------------|--------|--------|----------|
| display | 48-64px | 56-72px | 700 | sans | Hero sections, feature highlights |
| h1 | 32px | 40px | 600 | sans | Page titles |
| h2 | 24px | 32px | 600 | sans | Section headers |
| h3 | 20px | 28px | 500 | sans | Subsections, card titles |
| body | 16px | 24px | 400 | sans | Primary content, descriptions |
| small | 14px | 20px | 400 | sans | Secondary text, metadata |
| caption | 12px | 16px | 400 | sans | Labels, hints, timestamps |
| code | 14px | 20px | 400 | mono | Code snippets, technical terms |

---

## Entity 4: ComponentStyle

**Description**: Encapsulates the complete visual styling for a specific UI component type.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `componentName` | string | Yes | Component name (e.g., "Button", "Input", "Card") |
| `borderRadius` | string | Yes | CSS value (e.g., "8px", "var(--radius-sm)") |
| `borderWidth` | string | Yes | CSS value (e.g., "1px solid var(--neutral-300)") |
| `padding` | string | Yes | Spacing token or value (e.g., "var(--space-3) var(--space-4)") |
| `shadow` | enum | No | Shadow level: "sm" | "md" | "lg" | "none" |
| `minHeight` | number | No | Minimum height in pixels (for touch targets) |
| `hoverTransition` | string | Yes | Transition CSS value |
| `variants` | object[] | No | Array of style variants (primary, secondary, etc.) |

### Validation Rules

- `borderRadius` MUST match Geist spec for component type
- `minHeight` MUST be ≥44px for interactive elements (WCAG)
- `hoverTransition` MUST include duration (150-300ms) and easing
- All dimensions MUST use spacing tokens where possible

### Component Specifications

#### Button Style
```typescript
{
  componentName: "Button",
  borderRadius: "8px",
  borderWidth: "1px solid transparent",
  padding: "var(--space-2) var(--space-4)",
  shadow: "sm",
  minHeight: 44,
  hoverTransition: "all 150ms ease-in-out",
  variants: [
    {
      name: "primary",
      background: "var(--geist-primary)",
      color: "#ffffff",
      hoverBackground: "#0060df"
    },
    {
      name: "secondary",
      background: "transparent",
      color: "var(--geist-foreground)",
      border: "1px solid var(--neutral-300)",
      hoverBackground: "var(--neutral-100)"
    }
  ]
}
```

#### Input Style
```typescript
{
  componentName: "Input",
  borderRadius: "8px",
  borderWidth: "1px solid var(--neutral-300)",
  padding: "var(--space-2) var(--space-3)",
  minHeight: 44,
  hoverTransition: "border-color 150ms ease-in-out",
  focusRing: "2px solid var(--geist-primary)"
}
```

#### Card Style
```typescript
{
  componentName: "Card",
  borderRadius: "12px",
  borderWidth: "1px solid var(--neutral-200)",
  padding: "var(--space-6)",
  shadow: "md",
  background: "var(--geist-background)"
}
```

#### Modal Style
```typescript
{
  componentName: "Modal",
  borderRadius: "16px",
  shadow: "lg",
  padding: "var(--space-6)",
  maxWidth: "600px",
  background: "var(--geist-background)"
}
```

---

## Entity 5: ThemeState

**Description**: Represents the current theme configuration and user preferences.

### Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `mode` | enum | Yes | "light" | "dark" |
| `source` | enum | Yes | "manual" | "system" |
| `persisted` | boolean | Yes | Whether preference is saved to localStorage |
| `systemPrefersDark` | boolean | No | System preference if source is "system" |

### State Transitions

```
[Initial Load]
    ↓
Check localStorage → [Has Saved Preference] → Apply Saved Theme
    ↓
[No Saved Preference]
    ↓
Check prefers-color-scheme → [System Dark] → Apply Dark Mode
    ↓                              ↓
[System Light]              Apply Light Mode
    ↓
[User Toggle] ←→ [Update State & Persist]
```

### Validation Rules

- `mode` MUST be consistent with DOM `[data-theme]` attribute
- If `persisted` is true, localStorage MUST contain matching value
- Theme transitions MUST complete within 150ms

---

## Relationships

### One-to-Many Relationships

- **ThemeState → ColorToken**: One theme state maps to many color token values
- **ComponentStyle → Variants**: One component has many style variants

### Usage Dependencies

```
TypographyScale ─┬─> ComponentStyle (buttons, cards use specific type scales)
                 │
SpacingToken ────┼─> ComponentStyle (all components use spacing tokens)
                 │
ColorToken ──────┘
```

---

## Implementation Notes

### TypeScript Interfaces

All entities will be implemented as TypeScript interfaces/types for compile-time validation:

```typescript
// src/utils/geist-constants.ts
export interface ColorToken { /* ... */ }
export interface SpacingToken { /* ... */ }
export interface TypographyScale { /* ... */ }
export interface ComponentStyle { /* ... */ }
export interface ThemeState { /* ... */ }
```

### CSS Custom Properties

Entities map to CSS custom properties for runtime access:

```css
/* Color Tokens */
--geist-primary: #0070F3;
--neutral-200: #eaeaea;

/* Spacing Tokens */
--space-1: 4px;
--space-2: 8px;

/* Typography Tokens */
--font-sans: 'Geist Sans', system-ui;
--text-display: 48px;
--line-height-display: 56px;
```

---

**Data Model Status**: DRAFT  
**Ready for Contract Generation**: YES
