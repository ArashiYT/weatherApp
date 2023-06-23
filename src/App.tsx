import { TThemeContext, ThemeContext } from "./components/ThemeProvider";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useRef, useEffect } from "react";
import OutputComponent from "./components/Output";
import InputComponent from "./components/Input";
import ErrorData from "./assets/func/ErrorData";
import wait from "./assets/func/wait";
import { ENDPOINT } from "./options";
import "./assets/css/App.css";

export default function AppComponent(): React.ReactElement {
    const [errorMessage, setErrorMessage] = useState <IErrorResponse | null> (null)
    const { theme, toggleTheme } = useContext <TThemeContext> (ThemeContext)
    const [geolocationOff, setGeolocationOff] = useState <boolean> (false);
    const [data, setData] = useState <IWeatherResponse | null> (null)
    const [isLoading, setIsLoading] = useState <boolean> (false)
    const output = useRef <HTMLInputElement | null> (null)
    const abort: AbortController = new AbortController();
    const input = useRef <IInputRef | null> (null)

    const sendData = async (coords: ICoordsResponse | null = null) => {  
      //Reset error message and start lodaing
      setErrorMessage(null)
      if(!isLoading) setIsLoading(true)
      await wait(500)

      try {
        //Validation data
        const town_name: string = input.current?.getTownName() ?? ""
        if(!coords && town_name.length <= 0) throw new ErrorData({ message: "Please Enter a town name", inputError: true })
        
        //Check if you are disconnect in internet
        if(!navigator.onLine) throw new ErrorData({ message: "You must be connected to Internet!", inputError: false })

        //Fetching data
        const apiID: string = import.meta.env.VITE_WEATHER_API;
        const dataWeather: IWeatherResponse = await fetch(`${ENDPOINT}&key=${apiID}&q=${coords ? `${coords.latitude},${coords.longitude}`: town_name}`, 
          {
            headers: { 'Content-Type': 'application/json' },
            signal: abort.signal
        })
          .then(res => res.json())
          .catch(()=> abort.abort())

      //Handle error
      if(dataWeather?.error) throw new ErrorData({message: dataWeather.error.message, inputError: true});

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
        setErrorMessage({message: error.data?.message.replace(".", ""), inputError: error.data?.inputError})
      }

      finally {
        setIsLoading(false)
      }
    }

    //Check status geoloctation
    useEffect(() => {
        navigator.permissions.query({ name: "geolocation" })
          .then(permission => setGeolocationOff(permission.state == "denied")) 
    }, [])

    const getLocation = async () => {
        //start loading 
        if(!isLoading) setIsLoading(true); 

        if(navigator.geolocation) {
        
          //Handle Success
            const onSuccess = (location: GeolocationPosition) => {
                const { longitude, latitude }: GeolocationCoordinates = location.coords;
              
                //Save Coords
                  return sendData({ longitude, latitude })
            }

          //Handle Error
            const onError = (location: GeolocationPositionError) => {
                setErrorMessage({message: location.message, inputError: false})
                setGeolocationOff(true)
            }
          
          //Downloading position
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
            
        }

        //End Loading when you decied localitation
        setIsLoading(false)
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
              <InputComponent disabled={isLoading} geolocationOff={geolocationOff} ref={input} errorMessage={errorMessage} onclick={sendData} getLocation={getLocation} />
            }
        </section>
      </main>
    )
}