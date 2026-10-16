"use client";
import { useThemeStore } from '@/store/useThemeStore';
import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';
import styles from './Portfolio.module.css';

const emptySubscribe = () => () => {};

export function ThemeControl() {
  const { theme, toggleTheme } = useThemeStore();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const label = mounted && theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode';
  return (
    <button
      disabled={!mounted}
      className={styles.themeControl}
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      {mounted && theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}
