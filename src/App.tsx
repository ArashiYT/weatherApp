import { ThemeContext } from "./components/ThemeProvider";
import React, { useContext } from "react";
import "./assets/css/App.css";

export default function AppComponent(): React.ReactElement {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
      <div>
          <span>Theme: { theme || "light" }</span>
          <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    )
}