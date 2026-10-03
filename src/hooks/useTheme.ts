import { useCallback, useEffect, useState } from 'react';
import type { ThemeMode } from '../types';

const STORAGE_KEY = 'cova-theme';

const resolveSystem = (): 'dark' | 'light' =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
    if (stored === 'dark' || stored === 'light' || stored === 'system') {
      setMode(stored);
    }
  }, []);

  useEffect(() => {
    const effective = mode === 'system' ? resolveSystem() : mode;
    document.documentElement.classList.toggle('light', effective === 'light');
    document.documentElement.style.colorScheme = effective;
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  const cycle = useCallback(() => {
    setMode((current) => (current === 'dark' ? 'light' : current === 'light' ? 'system' : 'dark'));
  }, []);

  return { mode, setMode, cycle };
}
