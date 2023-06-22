/// <reference types="vite/client" />

interface IWeatherResponse {
    location: {
        name: string;
        country: string;
    };

    current: {
        temp_c: number,
        humidity: number;
        feelslike_c: number;
        condition: {
            text: string;
            icon: string;
        }
    }

    error?: {
        code: number;
        message: string;
    }
}

interface ICoordsResponse { 
    longitude: number; 
    latitude: number;
}
interface IInputRef { 
    getTownName: () => string | null;
    getParentElement: () => HTMLElement | null;
    resetTownName: () => void;
}