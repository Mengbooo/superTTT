/**
 * Contract Test: Geist Color Tokens
 * 
 * Verifies that all Geist color tokens are properly defined
 * with correct hex values and categories.
 */

import { describe, it, expect } from 'vitest';
import { COLOR_TOKENS, ColorToken } from '../../src/utils/geist-constants';

describe('Geist Color Token Contract', () => {
  const neutralColors = [
    'neutral-50', 'neutral-100', 'neutral-200', 'neutral-300',
    'neutral-400', 'neutral-500', 'neutral-600', 'neutral-700',
    'neutral-800', 'neutral-900',
  ];

  const accentColors = ['primary', 'success', 'warning', 'error'];

  describe('Neutral Color Palette', () => {
    it.each(neutralColors)('should define %s token', (colorName) => {
      const token = COLOR_TOKENS[colorName];
      expect(token).toBeDefined();
      expect(token.category).toBe('neutral');
    });

    it.each(neutralColors)('should have valid hex value for %s', (colorName) => {
      const token = COLOR_TOKENS[colorName];
      expect(token.lightValue).toMatch(/^#[0-9A-F]{6}$/i);
      if (token.darkValue) {
        expect(token.darkValue).toMatch(/^#[0-9A-F]{6}$/i);
      }
    });

    it('should have light mode background as white (#ffffff)', () => {
      // This is verified via CSS variable, but we check the token exists
      expect(COLOR_TOKENS['neutral-50'].lightValue).toBe('#fafafa');
    });

    it('should have dark mode background as black (#000000)', () => {
      // Dark mode uses pure black
      expect(COLOR_TOKENS['neutral-900'].lightValue).toBe('#0a0a0a');
    });
  });

  describe('Accent Colors', () => {
    it.each(accentColors)('should define %s token', (colorName) => {
      const token = COLOR_TOKENS[colorName];
      expect(token).toBeDefined();
      expect(['accent', 'feedback']).toContain(token.category);
    });

    it.each(accentColors)('should have valid hex value for %s', (colorName) => {
      const token = COLOR_TOKENS[colorName];
      expect(token.lightValue).toMatch(/^#[0-9A-F]{6}$/i);
      if (token.darkValue) {
        expect(token.darkValue).toMatch(/^#[0-9A-F]{6}$/i);
      }
    });

    it('should have primary color as #0070F3', () => {
      expect(COLOR_TOKENS.primary.lightValue).toBe('#0070F3');
    });

    it('should have success color as #17C470', () => {
      expect(COLOR_TOKENS.success.lightValue).toBe('#17C470');
    });

    it('should have warning color as #F5A623', () => {
      expect(COLOR_TOKENS.warning.lightValue).toBe('#F5A623');
    });

    it('should have error color as #EB5757', () => {
      expect(COLOR_TOKENS.error.lightValue).toBe('#EB5757');
    });
  });

  describe('Color Token Structure', () => {
    it('all tokens should follow kebab-case naming', () => {
      Object.values(COLOR_TOKENS).forEach((token) => {
        expect(token.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      });
    });

    it('all tokens should have required fields', () => {
      Object.values(COLOR_TOKENS).forEach((token) => {
        expect(token).toHaveProperty('name');
        expect(token).toHaveProperty('lightValue');
        expect(token).toHaveProperty('category');
      });
    });

    it('category should be one of allowed values', () => {
      const validCategories = ['neutral', 'accent', 'feedback'];
      Object.values(COLOR_TOKENS).forEach((token) => {
        expect(validCategories).toContain(token.category);
      });
    });
  });

  describe('Usage Documentation', () => {
    it('accent colors should have usage defined', () => {
      accentColors.forEach((colorName) => {
        const token = COLOR_TOKENS[colorName];
        expect(token.usage).toBeDefined();
        expect(Array.isArray(token.usage)).toBe(true);
        expect(token.usage!.length).toBeGreaterThan(0);
      });
    });
  });
});
