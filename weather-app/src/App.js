
import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const[weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); //state to hold any error messages

  const handleSearch = async (newCity) => { 
    setCity(newCity);
    setWeatherData(null);
    setError(null);

  const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY; //access the env variable (we saved api key through git bash earlier)
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;
  console.log(`Searching for weather in: ${newCity}`);

  try {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    const message = `HTTP error! status: ${response.status}`;
    throw new Error(message);
  }
  const data = await response.json();
  setWeatherData(data);
  } catch (error) { console.error( `Fetching weather data failed:`, error);
  setError('Failed to fetch weather data. Please try again.');
  setWeatherData(null); //ensure weatherData is null on error
  }
  };
  
  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weather={weatherData} error={error} />
    </div>
  );
}

export default App; 
