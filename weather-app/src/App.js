
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const[weatherData, setWeatherData] = useState(null);
  const [error, serError] = useState(null); //state to hold any error messages

  const handleSearch = (newCity) => { setCity(newCity);
  //we'll add the api call logic later
  const apiKey = process.env.OPENWEATHER_API_KEY; //access the env variable (we saved api key through git bash earlier)
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=metric`;
  console.log(`Searching for weather in: ${newCity}`);
  }

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weather={weatherData} error={error} />
    </div>
  );
}

export default App; 
