import React, { useState } from 'react';
import {
  IonItem,
  IonLabel,
  IonContent,
  IonList,
  IonInput,
  IonButton,
  IonAlert,
  IonLoading,
  } from '@ionic/react';
import './WeatherDisplay.css';
import { getWeatherByCity, addCity, WeatherResponse } from '../data/weather';

interface WeatherDisplayProps {
  weatherResponse: WeatherResponse
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weatherResponse }) => {


  return (
    <div className="weather-display">
      <img src={require(`../assets/${weatherResponse.weather[0].icon}.png`)} alt={weatherResponse.weather[0].description}/>
      <h1>{weatherResponse.main.temp}°</h1>
      <h2>{weatherResponse.main.temp_min}°/{weatherResponse.main.temp_max}° Feels like {weatherResponse.main.feels_like}°</h2>
    </div>
  );
};

export default WeatherDisplay;
