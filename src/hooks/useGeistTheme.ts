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
