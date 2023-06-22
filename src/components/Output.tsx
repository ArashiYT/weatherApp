import { faLocationDot, faDroplet, faThermometerHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getImage from "../assets/func/getImage";
import "../assets/css/Output.css"
import React from 'react';

export type TOutputProps = {}
export default function OutputComponent({}): React.ReactElement<TOutputProps> {
    const img = getImage("cloud");

    return (
        <article className="output">
            <div className="title"> Weather App </div>
            <div className="img">
                <img src={img} alt="weather" />
                <div className="info">
                    <div className="temp">
                        <span>7</span>
                        <sup>&deg;</sup>
                        <span>C</span>
                    </div>
                    <div className="weatherInfo">Broken Clouds</div>
                    <div className="location">
                        <FontAwesomeIcon className="icon-weather" icon={faLocationDot} />
                        <span className="name">Warsaw, Poland</span>
                    </div>
                </div>
            </div>
            <div className="otherInfo">
                <div className="temp-feel">
                    <FontAwesomeIcon icon={faThermometerHalf} />
                    <div className="temp-info">
                        <div className="">
                            <span>7</span>
                            <sup>&deg;</sup>
                            <span>C</span>
                        </div>
                        <div className="feel">Feels Like</div>
                    </div>
                </div>
                <div className="damp">
                    <FontAwesomeIcon icon={faDroplet} />
                    <div className="damp-info">
                        <div className="">
                            <span>86</span>
                            <sup>&#x25;</sup>
                        </div>
                        <span className="feel">Humidity</span>
                    </div>
                </div>
            </div>
        </article>
    )
}