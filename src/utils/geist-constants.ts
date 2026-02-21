/**
 * Geist Design System - Core Entities and Constants
 * 
 * This file defines the TypeScript interfaces and constant values
 * for the Geist Design System tokens and components.
 */

// ============================================================================
// Color Token Entity
// ============================================================================

export type ColorCategory = 'neutral' | 'accent' | 'feedback';

export interface ColorToken {
  name: string;
  lightValue: string;
  darkValue?: string;
  category: ColorCategory;
  usage?: string[];
}

export const COLOR_TOKENS: Record<string, ColorToken> = {
  // Neutral Colors
  'neutral-50': {
    name: 'neutral-50',
    lightValue: '#fafafa',
    darkValue: '#171717',
    category: 'neutral',
    usage: ['backgrounds', 'surfaces'],
  },
  'neutral-100': {
    name: 'neutral-100',
    lightValue: '#f5f5f5',
    darkValue: '#1a1a1a',
    category: 'neutral',
    usage: ['backgrounds', 'hover-states'],
  },
  'neutral-200': {
    name: 'neutral-200',
    lightValue: '#eaeaea',
    darkValue: '#222222',
    category: 'neutral',
    usage: ['borders', 'dividers'],
  },
  'neutral-300': {
    name: 'neutral-300',
    lightValue: '#cdcdcd',
    darkValue: '#333333',
    category: 'neutral',
    usage: ['borders', 'input-borders'],
  },
  'neutral-400': {
    name: 'neutral-400',
    lightValue: '#999999',
    darkValue: '#444444',
    category: 'neutral',
    usage: ['secondary-text', 'icons'],
  },
  'neutral-500': {
    name: 'neutral-500',
    lightValue: '#666666',
    darkValue: '#666666',
    category: 'neutral',
    usage: ['secondary-text'],
  },
  'neutral-600': {
    name: 'neutral-600',
    lightValue: '#444444',
    darkValue: '#888888',
    category: 'neutral',
    usage: ['body-text'],
  },
  'neutral-700': {
    name: 'neutral-700',
    lightValue: '#333333',
    darkValue: '#aaaaaa',
    category: 'neutral',
    usage: ['headings'],
  },
  'neutral-800': {
    name: 'neutral-800',
    lightValue: '#171717',
    darkValue: '#cccccc',
    category: 'neutral',
    usage: ['primary-text', 'foreground'],
  },
  'neutral-900': {
    name: 'neutral-900',
    lightValue: '#0a0a0a',
    darkValue: '#eeeeee',
    category: 'neutral',
    usage: ['primary-text'],
  },
  
  // Accent Colors
  primary: {
    name: 'geist-primary',
    lightValue: '#0070F3',
    darkValue: '#0070F3',
    category: 'accent',
    usage: ['buttons', 'links', 'focus-rings', 'interactive-elements'],
  },
  success: {
    name: 'geist-success',
    lightValue: '#17C470',
    darkValue: '#17C470',
    category: 'feedback',
    usage: ['success-states', 'positive-feedback'],
  },
  warning: {
    name: 'geist-warning',
    lightValue: '#F5A623',
    darkValue: '#F5A623',
    category: 'feedback',
    usage: ['warning-states', 'caution-indicators'],
  },
  error: {
    name: 'geist-error',
    lightValue: '#EB5757',
    darkValue: '#EB5757',
    category: 'feedback',
    usage: ['error-states', 'destructive-actions'],
  },
};

// ============================================================================
// Spacing Token Entity
// ============================================================================

export interface SpacingToken {
  scale: number;
  pixelValue: number;
  cssName: string;
  tailwindName: string;
  commonUses?: string[];
}

export const SPACING_TOKENS: Record<string, SpacingToken> = {
  '1': {
    scale: 1,
    pixelValue: 4,
    cssName: '--space-1',
    tailwindName: 'geist-1',
    commonUses: ['icon-gaps', 'tight-spacing'],
  },
  '2': {
    scale: 2,
    pixelValue: 8,
    cssName: '--space-2',
    tailwindName: 'geist-2',
    commonUses: ['input-padding', 'small-gaps'],
  },
  '3': {
    scale: 3,
    pixelValue: 12,
    cssName: '--space-3',
    tailwindName: 'geist-3',
    commonUses: ['card-padding', 'button-gaps'],
  },
  '4': {
    scale: 4,
    pixelValue: 16,
    cssName: '--space-4',
    tailwindName: 'geist-4',
    commonUses: ['section-spacing'],
  },
  '5': {
    scale: 5,
    pixelValue: 20,
    cssName: '--space-5',
    tailwindName: 'geist-5',
    commonUses: ['large-component-gaps'],
  },
  '6': {
    scale: 6,
    pixelValue: 24,
    cssName: '--space-6',
    tailwindName: 'geist-6',
    commonUses: ['page-margins', 'modal-padding'],
  },
  '8': {
    scale: 8,
    pixelValue: 32,
    cssName: '--space-8',
    tailwindName: 'geist-8',
    commonUses: ['section-margins'],
  },
  '10': {
    scale: 10,
    pixelValue: 40,
    cssName: '--space-10',
    tailwindName: 'geist-10',
    commonUses: ['hero-spacing'],
  },
};

// ============================================================================
// Typography Scale Entity
// ============================================================================

export type TypographyLevel = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'caption' | 'code';
export type FontFamily = 'sans' | 'mono';

export interface TypographyScale {
  level: TypographyLevel;
  fontSize: number;
  lineHeight: number;
  fontWeight?: number;
  fontFamily: FontFamily;
  letterSpacing?: string;
  semanticUse: string;
}

export const TYPOGRAPHY_SCALE: Record<string, TypographyScale> = {
  display: {
    level: 'display',
    fontSize: 48,
    lineHeight: 56,
    fontWeight: 700,
    fontFamily: 'sans',
    letterSpacing: '-0.02em',
    semanticUse: 'Hero sections, feature highlights',
  },
  h1: {
    level: 'h1',
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 600,
    fontFamily: 'sans',
    semanticUse: 'Page titles',
  },
  h2: {
    level: 'h2',
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 600,
    fontFamily: 'sans',
    semanticUse: 'Section headers',
  },
  h3: {
    level: 'h3',
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 500,
    fontFamily: 'sans',
    semanticUse: 'Subsections, card titles',
  },
  body: {
    level: 'body',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: 400,
    fontFamily: 'sans',
    semanticUse: 'Primary content, descriptions',
  },
  small: {
    level: 'small',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
    fontFamily: 'sans',
    semanticUse: 'Secondary text, metadata',
  },
  caption: {
    level: 'caption',
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
    fontFamily: 'sans',
    semanticUse: 'Labels, hints, timestamps',
  },
  code: {
    level: 'code',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
    fontFamily: 'mono',
    semanticUse: 'Code snippets, technical terms',
  },
};

// ============================================================================
// Component Style Entity
// ============================================================================

export type ShadowLevel = 'sm' | 'md' | 'lg' | 'none';

export interface ComponentVariant {
  name: string;
  background?: string;
  color?: string;
  border?: string;
  hoverBackground?: string;
  hoverColor?: string;
}

export interface ComponentStyle {
  componentName: string;
  borderRadius: string;
  borderWidth: string;
  padding: string;
  shadow?: ShadowLevel;
  minHeight?: number;
  hoverTransition: string;
  variants?: ComponentVariant[];
}

export const COMPONENT_STYLES: Record<string, ComponentStyle> = {
  button: {
    componentName: 'Button',
    borderRadius: 'var(--radius-sm)',
    borderWidth: '1px solid transparent',
    padding: 'var(--space-2) var(--space-4)',
    shadow: 'sm',
    minHeight: 44,
    hoverTransition: 'all var(--transition-fast) var(--ease-in-out)',
    variants: [
      {
        name: 'primary',
        background: 'var(--geist-primary)',
        color: '#ffffff',
        hoverBackground: '#0060df',
      },
      {
        name: 'secondary',
        background: 'transparent',
        color: 'var(--geist-foreground)',
        border: '1px solid var(--neutral-300)',
        hoverBackground: 'var(--neutral-100)',
      },
      {
        name: 'ghost',
        background: 'transparent',
        color: 'var(--geist-foreground)',
        hoverBackground: 'var(--neutral-100)',
      },
      {
        name: 'danger',
        background: 'var(--geist-error)',
        color: '#ffffff',
        hoverBackground: '#d42525',
      },
    ],
  },
  input: {
    componentName: 'Input',
    borderRadius: 'var(--radius-sm)',
    borderWidth: '1px solid var(--neutral-300)',
    padding: 'var(--space-2) var(--space-3)',
    minHeight: 44,
    hoverTransition: 'border-color var(--transition-fast) var(--ease-in-out)',
  },
  card: {
    componentName: 'Card',
    borderRadius: 'var(--radius-md)',
    borderWidth: '1px solid var(--neutral-200)',
    padding: 'var(--space-6)',
    shadow: 'md',
    hoverTransition: 'box-shadow var(--transition-fast) var(--ease-in-out)',
  },
  modal: {
    componentName: 'Modal',
    borderRadius: 'var(--radius-lg)',
    borderWidth: 'none',
    padding: 'var(--space-6)',
    shadow: 'lg',
    hoverTransition: 'none',
  },
};

// ============================================================================
// Theme State Entity
// ============================================================================

export type ThemeMode = 'light' | 'dark';
export type ThemeSource = 'manual' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  source: ThemeSource;
  persisted: boolean;
  systemPrefersDark?: boolean;
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Get CSS variable value from spacing token
 */
export function getSpacingVar(scale: number): string {
  return `var(--space-${scale})`;
}

/**
 * Get CSS variable value from color token
 */
export function getColorVar(name: string): string {
  if (name.startsWith('neutral-')) {
    return `var(--${name})`;
  }
  return `var(--geist-${name})`;
}

/**
 * Get typography styles for a given level
 */
export function getTypographyStyles(level: TypographyLevel): React.CSSProperties {
  const scale = TYPOGRAPHY_SCALE[level];
  return {
    fontSize: `${scale.fontSize}px`,
    lineHeight: `${scale.lineHeight}px`,
    fontWeight: scale.fontWeight,
    fontFamily: scale.fontFamily === 'mono' ? 'var(--font-mono)' : 'var(--font-sans)',
    letterSpacing: scale.letterSpacing,
  };
}
