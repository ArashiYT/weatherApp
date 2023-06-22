import { faLocationDot, faDroplet, faThermometerHalf, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../assets/css/Output.css"
import { forwardRef } from 'react';

export type TOutputProps = { data: IWeatherResponse; returnClick: () => Promise<void>; }
const OutputComponent = forwardRef<HTMLElement | null, TOutputProps>(({ data, returnClick }, ref) => {
    return (
        <article className="output" ref={ref}>
            <div className="title"> 
                <button className="btnReturn" onClick={() => returnClick()}>
                    <FontAwesomeIcon className="icon-btn" icon={faArrowLeft} />
                </button>
                <span>Weather App</span> 
            </div>
            <div className="img">
                <img src={`https:${data.current.condition.icon}`} alt="weather" />
                <div className="info">
                    <div className="temp">
                        <span>{data.current.temp_c}</span>
                        <sup>&deg;</sup>
                        <span>C</span>
                    </div>
                    <div className="weatherInfo">{data.current.condition.text}</div>
                    <div className="location">
                        <FontAwesomeIcon className="icon-weather" icon={faLocationDot} />
                        <span className="name">{data.location.name}, {data.location.country}</span>
                    </div>
                </div>
            </div>
            <div className="otherInfo">
                <div className="temp-feel">
                    <FontAwesomeIcon className="icon-info" icon={faThermometerHalf} />
                    <div className="info">
                        <div className="temp">
                            <span>{data.current.feelslike_c}</span>
                            <sup>&deg;</sup>
                            <span>C</span>
                        </div>
                        <div className="feel">Feels Like</div>
                    </div>
                </div>
                <div className="damp">
                    <FontAwesomeIcon className="icon-info" icon={faDroplet} />
                    <div className="info">
                        <div className="precent">
                            <span>{data.current.humidity}</span>
                            <sup>&#x25;</sup>
                        </div>
                        <span className="feel">Humidity</span>
                    </div>
                </div>
            </div>
        </article>
    )
})

export default OutputComponent;