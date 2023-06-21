/// <reference types="vite/client" />

interface IWeatherResponse {}
interface ICoordsResponse { longitude: number; latitude: number }
interface IInputRef { getTownName: () => string | null, getParentElement: () => HTMLElement | null }