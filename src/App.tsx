import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useRef } from "react";
import { TThemeContext, ThemeContext } from "./components/ThemeProvider";
import OutputComponent from "./components/Output";
import InputComponent from "./components/Input";
import "./assets/css/App.css";

export default function AppComponent(): React.ReactElement {
    const { theme, toggleTheme } = useContext <TThemeContext> (ThemeContext)
    const [data, setData] = useState <WeatherResponse | null> (null)
    const town_name = useRef <HTMLInputElement | null> (null)

    const sendData = () => {
      console.log(town_name.current?.value)
    }

    return (
      <main className="container">
        <button className="btn"  onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme == "" ? faSun : faMoon} className="icon" />
        </button>
        <section className="main">
            {data ? <OutputComponent /> : <InputComponent ref={town_name} onclick={sendData} />}
        </section>
      </main>
    )
}