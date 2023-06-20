import React, { useState, useEffect } from 'react';

export type TTheme = "" | "dark"
export type TThemeContext = { theme: TTheme; toggleTheme: () => void };
export const ThemeContext = React.createContext<TThemeContext>(
    {} as TThemeContext
);

export const ThemeProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const [theme, setTheme] = useState <TTheme> ( document.body.className as TTheme );
    const toggleTheme = () => setTheme(theme === "" ? "dark" : "");
  
    useEffect(() => {
        document.body.className = theme 
    }, [theme])
  
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        { children }
      </ThemeContext.Provider>
    );
  };
  