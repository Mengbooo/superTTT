import React, { createContext, useContext, ReactNode } from 'react';
import { useGeistTheme } from '../hooks/useGeistTheme';
import { ThemeState } from '../utils/geist-constants';

interface GeistProviderProps {
  children: ReactNode;
}

interface GeistContextType extends ThemeState {
  toggleTheme: () => void;
}

const GeistContext = createContext<GeistContextType | undefined>(undefined);

/**
 * GeistProvider - Root provider for Geist Design System
 * 
 * Provides theme state and toggle functionality to all child components.
 * Should be wrapped around the entire application.
 */
export function GeistProvider({ children }: GeistProviderProps) {
  const { theme, isLoaded, toggleTheme } = useGeistTheme();
  
  const contextValue: GeistContextType = {
    mode: theme,
    source: 'manual',
    persisted: true,
    systemPrefersDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
    toggleTheme,
  };
  
  // Prevent flash of unstyled content
  if (!isLoaded) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        backgroundColor: 'var(--geist-background)',
        color: 'var(--geist-foreground)',
      }}>
        Loading...
      </div>
    );
  }
  
  return (
    <GeistContext.Provider value={contextValue}>
      {children}
    </GeistContext.Provider>
  );
}

/**
 * useGeistContext - Hook to access Geist theme context
 * 
 * Must be used within a GeistProvider
 */
export function useGeistContext() {
  const context = useContext(GeistContext);
  if (context === undefined) {
    throw new Error('useGeistContext must be used within a GeistProvider');
  }
  return context;
}
