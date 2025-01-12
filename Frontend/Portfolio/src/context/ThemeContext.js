import React, { createContext, useContext, useState, useEffect } from "react";

// Create a Context
const ThemeContext = createContext();

// ThemeProvider component to wrap around your app
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light"); // Default theme is light

  // On initial load, check if there's a stored theme in localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme); // Set the theme from localStorage
    }
  }, []);

  // Update the body class whenever the theme changes
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme); // Save the theme to localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
