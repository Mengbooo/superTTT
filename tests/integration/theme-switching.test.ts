/**
 * Integration Test: Theme Switching
 * 
 * Verifies that the Geist theme switching works correctly,
 * including localStorage persistence and system preference detection.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useGeistTheme } from '../../src/hooks/useGeistTheme';

describe('Theme Switching Integration', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    vi.restoreAllMocks();
  });

  describe('Initial Theme Loading', () => {
    it('should default to light mode when no preference exists', async () => {
      // Mock system preference as light
      vi.spyOn(window.matchMedia, 'matches', 'get').mockReturnValue(false);

      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(result.current.theme).toBe('light');
    });

    it('should use dark mode if system prefers dark and no saved preference', async () => {
      // Mock system preference as dark
      vi.spyOn(window.matchMedia, 'matches', 'get').mockReturnValue(true);

      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should load saved theme from localStorage', async () => {
      localStorage.setItem('geist-theme', 'dark');

      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(result.current.theme).toBe('dark');
    });

    it('should prioritize localStorage over system preference', async () => {
      // Saved preference is light, but system prefers dark
      localStorage.setItem('geist-theme', 'light');
      vi.spyOn(window.matchMedia, 'matches', 'get').mockReturnValue(true);

      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(result.current.theme).toBe('light');
    });
  });

  describe('Theme Application', () => {
    it('should set data-theme attribute on document element', async () => {
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    it('should update data-theme when theme changes', async () => {
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      // Toggle theme
      result.current.toggleTheme();

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      });
    });
  });

  describe('Theme Persistence', () => {
    it('should save theme to localStorage on mount', async () => {
      renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(localStorage.getItem('geist-theme')).toBe('light');
      });
    });

    it('should save theme to localStorage when toggled', async () => {
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      // Toggle to dark
      result.current.toggleTheme();

      await waitFor(() => {
        expect(localStorage.getItem('geist-theme')).toBe('dark');
      });

      // Toggle back to light
      result.current.toggleTheme();

      await waitFor(() => {
        expect(localStorage.getItem('geist-theme')).toBe('light');
      });
    });
  });

  describe('Theme Toggle Functionality', () => {
    it('should toggle from light to dark', async () => {
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(result.current.theme).toBe('light');

      result.current.toggleTheme();

      await waitFor(() => {
        expect(result.current.theme).toBe('dark');
      });
    });

    it('should toggle from dark to light', async () => {
      localStorage.setItem('geist-theme', 'dark');
      
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      expect(result.current.theme).toBe('dark');

      result.current.toggleTheme();

      await waitFor(() => {
        expect(result.current.theme).toBe('light');
      });
    });

    it('should support multiple rapid toggles', async () => {
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      // Rapid toggles
      result.current.toggleTheme(); // dark
      result.current.toggleTheme(); // light
      result.current.toggleTheme(); // dark

      await waitFor(() => {
        expect(result.current.theme).toBe('dark');
      });
    });
  });

  describe('CSS Variable Availability', () => {
    it('should have Geist color tokens available after theme loads', async () => {
      // This verifies that CSS variables are accessible
      renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBeDefined();
      });

      // Check that computed styles can access CSS variables
      const rootStyles = getComputedStyle(document.documentElement);
      
      // These should be defined in geist-tokens.css
      expect(rootStyles.getPropertyValue('--geist-primary')).toBeTruthy();
      expect(rootStyles.getPropertyValue('--geist-background')).toBeTruthy();
      expect(rootStyles.getPropertyValue('--geist-foreground')).toBeTruthy();
    });

    it('should update CSS variables when theme changes', async () => {
      const { result } = renderHook(() => useGeistTheme());

      await waitFor(() => {
        expect(result.current.isLoaded).toBe(true);
      });

      const lightBg = getComputedStyle(document.documentElement)
        .getPropertyValue('--geist-background')
        .trim();

      result.current.toggleTheme();

      await waitFor(() => {
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
      });

      const darkBg = getComputedStyle(document.documentElement)
        .getPropertyValue('--geist-background')
        .trim();

      // Background should change between light and dark modes
      expect(lightBg).not.toBe(darkBg);
    });
  });
});
