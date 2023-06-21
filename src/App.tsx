import { TThemeContext, ThemeContext } from "./components/ThemeProvider";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useRef } from "react";
import OutputComponent from "./components/Output";
import InputComponent from "./components/Input";
import wait from "./assets/func/wait";
import "./assets/css/App.css";

export default function AppComponent(): React.ReactElement {
    const { theme, toggleTheme } = useContext <TThemeContext> (ThemeContext)
    const [data, setData] = useState <IWeatherResponse | null> (null)
    const [errorMessage, setErrorMessage] = useState <string> ("")
    const input = useRef <IInputRef | null> (null)

    const sendData = async (coords: ICoordsResponse | null = null) => {  
      //Fetch data
        //...

      // Downloading parent Elemet in input Component
        const parent = input.current?.getParentElement()
        if(!parent) return

      //Animation and save data
        parent.classList.add("hidden")
        await wait(800)
        setData({})
    }

    const getLocation = async () => {
        if(navigator.geolocation) {
        
          //Handle Success
            const onSuccess = (location: GeolocationPosition) => {
                const { longitude, latitude }: GeolocationCoordinates = location.coords;
              
                //Save Coords
                  return sendData({ longitude, latitude })
            }

          //Handle Error
            const onError = (location: GeolocationPositionError) => {
                setErrorMessage(location.message)
            }
          
          //Downloading position
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
            
        }

        setErrorMessage("Your browser not support geolocation api!")
    }

    return (
      <main className="container">
        <button className="btn"  onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme == "" ? faSun : faMoon} className="icon" />
        </button>
        <section className="main">
            {data ? <OutputComponent /> : <InputComponent ref={input} onclick={sendData} getLocation={getLocation} />}
        </section>
      </main>
    )
}