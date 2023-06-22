import { TThemeContext, ThemeContext } from "./components/ThemeProvider";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useRef } from "react";
import OutputComponent from "./components/Output";
import InputComponent from "./components/Input";
import ErrorData from "./assets/func/ErrorData";
import wait from "./assets/func/wait";
import { ENDPOINT } from "./options";
import "./assets/css/App.css";

export default function AppComponent(): React.ReactElement {
    const { theme, toggleTheme } = useContext <TThemeContext> (ThemeContext)
    const [data, setData] = useState <IWeatherResponse | null> (null)
    const [errorMessage, setErrorMessage] = useState <string> ("")
    const output = useRef <HTMLInputElement | null> (null)
    const abort: AbortController = new AbortController();
    const input = useRef <IInputRef | null> (null)

    const sendData = async (coords: ICoordsResponse | null = null) => {  
      setErrorMessage("")

      try {
        const apiID: string = import.meta.env.VITE_WEATHER_API;
        const town_name: string = input.current?.getTownName() ?? ""
        if(!coords && town_name.length <= 0) throw new ErrorData(null, "Please Enter a town name")

        const dataWeather: IWeatherResponse = await fetch(`${ENDPOINT}&key=${apiID}&q=${coords ? `${coords.latitude},${coords.longitude}`: town_name}`, 
          {
            headers: { 'Content-Type': 'application/json' },
            signal: abort.signal
        })
          .then(res => res.json())
          .catch(()=> abort.abort())

      if(dataWeather?.error) throw new ErrorData(dataWeather.error);

      //Downloading parent Elemet in input Component
        const parent = input.current?.getParentElement()
        if(!parent) return

      //Animation and save data
        output.current?.classList.remove("hidden")
        parent.classList.add("hidden")
        await wait(800)
        setData(dataWeather)
      }

      catch(err) {
        const error: ErrorData = err as ErrorData
        setErrorMessage(error.data?.message.replace(".", "") ?? error.message )
      }
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
    }

    const returnHandler = async () => {
      //Return Animation
      output.current?.classList.add("hidden")
      await wait(800)
      setData(null)

      const parent = input.current?.getParentElement()
      parent?.classList.remove("hidden")
      input.current?.resetTownName();
    }

    return (
      <main className="container">
        <button className="btn"  onClick={toggleTheme}>
          <FontAwesomeIcon icon={theme == "" ? faSun : faMoon} className="icon" />
        </button>
        <section className="main">
            {data ? 
              <OutputComponent ref={output} data={data} returnClick={returnHandler} /> : 
              <InputComponent ref={input} errorMessage={errorMessage} onclick={sendData} getLocation={getLocation} />
            }
        </section>
      </main>
    )
}