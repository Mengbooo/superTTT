/**
 * Contract Test: Geist Typography Scale
 * 
 * Verifies that all typography tokens are properly defined
 * with correct sizes, line heights, and font families.
 */

import { describe, it, expect } from 'vitest';
import { TYPOGRAPHY_SCALE, TypographyScale, SPACING_TOKENS } from '../../src/utils/geist-constants';

describe('Geist Typography Contract', () => {
  const typographyLevels = [
    'display', 'h1', 'h2', 'h3', 'body', 'small', 'caption', 'code',
  ];

  describe('Typography Levels', () => {
    it.each(typographyLevels)('should define %s level', (level) => {
      const scale = TYPOGRAPHY_SCALE[level];
      expect(scale).toBeDefined();
      expect(scale.level).toBe(level);
    });

    it.each(typographyLevels)('should have valid fontSize for %s', (level) => {
      const scale = TYPOGRAPHY_SCALE[level];
      expect(scale.fontSize).toBeGreaterThanOrEqual(12);
      expect(scale.fontSize).toBeLessThanOrEqual(64);
    });

    it.each(typographyLevels)('should have valid lineHeight for %s', (level) => {
      const scale = TYPOGRAPHY_SCALE[level];
      // Line height must be >= font size
      expect(scale.lineHeight).toBeGreaterThanOrEqual(scale.fontSize);
    });
  });

  describe('Font Sizes', () => {
    it('display should be 48px', () => {
      expect(TYPOGRAPHY_SCALE.display.fontSize).toBe(48);
    });

    it('h1 should be 32px', () => {
      expect(TYPOGRAPHY_SCALE.h1.fontSize).toBe(32);
    });

    it('h2 should be 24px', () => {
      expect(TYPOGRAPHY_SCALE.h2.fontSize).toBe(24);
    });

    it('h3 should be 20px', () => {
      expect(TYPOGRAPHY_SCALE.h3.fontSize).toBe(20);
    });

    it('body should be 16px', () => {
      expect(TYPOGRAPHY_SCALE.body.fontSize).toBe(16);
    });

    it('small should be 14px', () => {
      expect(TYPOGRAPHY_SCALE.small.fontSize).toBe(14);
    });

    it('caption should be 12px', () => {
      expect(TYPOGRAPHY_SCALE.caption.fontSize).toBe(12);
    });

    it('code should be 14px', () => {
      expect(TYPOGRAPHY_SCALE.code.fontSize).toBe(14);
    });
  });

  describe('Font Families', () => {
    it('all levels except code should use sans-serif', () => {
      const sansLevels = ['display', 'h1', 'h2', 'h3', 'body', 'small', 'caption'];
      sansLevels.forEach((level) => {
        expect(TYPOGRAPHY_SCALE[level].fontFamily).toBe('sans');
      });
    });

    it('code should use monospace', () => {
      expect(TYPOGRAPHY_SCALE.code.fontFamily).toBe('mono');
    });
  });

  describe('Font Weights', () => {
    const validWeights = [400, 500, 600, 700];

    it.each(['display', 'h1', 'h2', 'h3'])('%s should have bold weight', (level) => {
      const scale = TYPOGRAPHY_SCALE[level];
      expect(scale.fontWeight).toBeDefined();
      expect(validWeights).toContain(scale.fontWeight!);
    });

    it('display should be 700 (bold)', () => {
      expect(TYPOGRAPHY_SCALE.display.fontWeight).toBe(700);
    });

    it('h1 and h2 should be 600 (semi-bold)', () => {
      expect(TYPOGRAPHY_SCALE.h1.fontWeight).toBe(600);
      expect(TYPOGRAPHY_SCALE.h2.fontWeight).toBe(600);
    });

    it('h3 should be 500 (medium)', () => {
      expect(TYPOGRAPHY_SCALE.h3.fontWeight).toBe(500);
    });

    it('body, small, caption should be 400 (regular)', () => {
      expect(TYPOGRAPHY_SCALE.body.fontWeight).toBe(400);
      expect(TYPOGRAPHY_SCALE.small.fontWeight).toBe(400);
      expect(TYPOGRAPHY_SCALE.caption.fontWeight).toBe(400);
    });
  });

  describe('Semantic Usage', () => {
    it('all levels should have semantic use defined', () => {
      typographyLevels.forEach((level) => {
        const scale = TYPOGRAPHY_SCALE[level];
        expect(scale.semanticUse).toBeDefined();
        expect(typeof scale.semanticUse).toBe('string');
        expect(scale.semanticUse.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Typography Structure', () => {
    it('all scales should have required fields', () => {
      typographyLevels.forEach((level) => {
        const scale = TYPOGRAPHY_SCALE[level];
        expect(scale).toHaveProperty('level');
        expect(scale).toHaveProperty('fontSize');
        expect(scale).toHaveProperty('lineHeight');
        expect(scale).toHaveProperty('fontFamily');
        expect(scale).toHaveProperty('semanticUse');
      });
    });

    it('letter spacing should use em units when defined', () => {
      const display = TYPOGRAPHY_SCALE.display;
      if (display.letterSpacing) {
        expect(display.letterSpacing).toMatch(/^-?[\d.]+em$/);
      }
    });
  });
});

describe('Geist Spacing Token Contract', () => {
  const spacingScales = ['1', '2', '3', '4', '5', '6', '8', '10'];

  describe('Spacing Scale', () => {
    it.each(spacingScales)('should define scale %s', (scale) => {
      const token = SPACING_TOKENS[scale];
      expect(token).toBeDefined();
    });

    it.each(spacingScales)('should have correct pixel value for scale %s', (scale) => {
      const token = SPACING_TOKENS[scale];
      const expectedPixel = parseInt(scale) * 4;
      expect(token.pixelValue).toBe(expectedPixel);
    });

    it('should follow 4px base unit system', () => {
      Object.values(SPACING_TOKENS).forEach((token) => {
        expect(token.pixelValue % 4).toBe(0);
        expect(token.scale * 4).toBe(token.pixelValue);
      });
    });
  });

  describe('Spacing Token Structure', () => {
    it('all tokens should have required fields', () => {
      Object.values(SPACING_TOKENS).forEach((token) => {
        expect(token).toHaveProperty('scale');
        expect(token).toHaveProperty('pixelValue');
        expect(token).toHaveProperty('cssName');
        expect(token).toHaveProperty('tailwindName');
      });
    });

    it('css names should follow --space-{scale} pattern', () => {
      Object.values(SPACING_TOKENS).forEach((token) => {
        expect(token.cssName).toMatch(/^--space-\d+$/);
      });
    });

    it('tailwind names should follow geist-{scale} pattern', () => {
      Object.values(SPACING_TOKENS).forEach((token) => {
        expect(token.tailwindName).toMatch(/^geist-\d+$/);
      });
    });
  });
});
