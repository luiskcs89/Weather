import { APP_ID } from "../config";

export interface WeatherResponse {
  coord: { lon: number,lat: number},
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ],
  base: string,
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number
  },
  wind: {
    speed: number,
    deg: number
  },
  clouds: {
    all: number
  },
  dt: number,
  sys: {
    type: number,
    id: number,
    message: number,
    country: string,
    sunrise: number,
    sunset: number
  },
  timezone: number,
  id: number,
  name: string,
  cod: number
}

export interface City {
  city: string,
  country: string
  id: number
}

const cities: City[] = [];

export const getCities = () => cities;

export const getWeatherById = (id: number): Promise<WeatherResponse> => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&appid=${APP_ID}`)
      .then(res => res.json());
}

export const getWeatherByCity = (city: string, country: string): Promise<WeatherResponse> => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${APP_ID}`)
      .then(res => res.json());
}

export const getWeatherByLocation = (lat: number, lon: number): Promise<WeatherResponse> => {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${APP_ID}`)
      .then(res => res.json());
}

export const addCity = (city: City) => {
  cities.push(city);
}