// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleTheme = () => setIsDark((prev) => !prev);

  const colors = {
    light: {
      background: '#ffffff',
      text: '#1a1a1a',
      primary: '#007AFF',
      secondary: '#6c757d',
      accent: '#0056b3',
      cursorColor: '#007AFF',
      cursorHover: 'rgba(0, 122, 255, 0.2)',
    },
    dark: {
      background: '#121212',
      text: '#ffffff',
      primary: '#0A84FF',
      secondary: '#6c757d',
      accent: '#409CFF',
      cursorColor: '#0A84FF',
      cursorHover: 'rgba(10, 132, 255, 0.2)',
    },
  };

  useEffect(() => {
    const root = document.documentElement;
    const theme = isDark ? 'dark' : 'light';
    const themeColors = colors[theme];

    Object.entries(themeColors).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value);
    });

    localStorage.setItem('theme', theme);
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);