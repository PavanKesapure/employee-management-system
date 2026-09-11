import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

// Day / Night mode provider. Persists choice in localStorage.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('ems-theme') || 'light');
  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ems-theme', theme);
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
