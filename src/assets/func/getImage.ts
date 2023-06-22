import stormImg from "../img/storm.svg";
import cloudImg from "../img/cloud.svg";
import clearImg from "../img/clear.svg";
import rainImg from "../img/rain.svg";
import hazeImg from "../img/haze.svg";
import snowImg from "../img/snow.svg";
 
export type tWeatherType = "rain" | "snow" | "storm" | "cloud" | "haze" | "clear";
export default function getImage(type: tWeatherType): string  {
    switch(type) {
        case "storm": return stormImg;
        case "cloud": return cloudImg;
        case "clear": return clearImg;
        case "rain": return rainImg;
        case "snow": return snowImg;
        case "haze": return hazeImg;
        default: return "";
    }
    
}