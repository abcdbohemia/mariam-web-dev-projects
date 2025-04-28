
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
  const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${newCity}&limit=1&appid=${apiKey}`;

  try {
  const geoResponse = await fetch(geocodingApiUrl);
  if (!geoResponse.ok) {
    const message = `Geocoding API error! status: ${geoResponse.status}`;
    throw new Error(message);
  }
  const geoData = await geoResponse.json();

  if (geoData & geoData.length > 0) {
    const { lat, lon } = geoData[0];
    console.log('Coordinates found:', lat, lon);
  
  const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}&units=metric';
  const weatherResponse = await fetch(weatherApiUrl);
  if (!weatherResponse.ok) {
    const message = `Weather API error! status: ${weatherResponse.status}`;
    throw new Error(message);
  }
  const weatherData = await weatherResponse.json();
  setWeatherData(weatherData);
} else {
  setError('City not found. Please try again.');
  setWeatherData(null);
}
  } catch (error) { 
    console.error( `Fetching data failed:`, error);
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
