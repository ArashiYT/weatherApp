import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ThemeContext } from "./components/ThemeProvider";
import React, { useContext } from "react";
import "./assets/css/App.css";

export default function AppComponent(): React.ReactElement {
    const { theme, toggleTheme } = useContext(ThemeContext)

    return (
      <div className="container">
          <FontAwesomeIcon icon={theme == "" ? faSun : faMoon} className="icon" onClick={toggleTheme} />
      </div>
    )
}