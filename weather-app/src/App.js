import React, { useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null); // State to hold any error messages

  const handleSearch = async (newCity) => {
    setWeatherData(null);
    setError(null);

    const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${newCity}&format=json&limit=1`;

    try {
      const geoResponse = await fetch(nominatimUrl);
      if (!geoResponse.ok) {
        const message = `Nominatim API error! Status: ${geoResponse.status}`;
        throw new Error(message);
      }
      const geoData = await geoResponse.json();

      if (geoData && geoData.length > 0) {
        const { lat, lon, display_name } = geoData[0]; //destructuring
        console.log('Coordinates found for', display_name, ':', lat, lon);
        await fetchWeather(lat, lon);
        setCity(display_name); // Set the city state only once with API's name
        // Update the city state with the full location name
      } else {
        setError('City not found. Please try again.');
        setWeatherData(null);
        setCity(''); // Clear the city state
      }
    } catch (error) {
      console.error('Fetching geocoding data failed:', error);
      setError('Failed to retrieve location information. Please try again.');
      setWeatherData(null);
    }
  };

  const fetchWeather = async (latitude, longitude) => {
    setWeatherData(null);
    setError(null);

    const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=wind_speed_10m,temperature_2m,weather_code&units=metric&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`;
    console.log(weatherApiUrl);
    try {
      const weatherResponse = await fetch(weatherApiUrl);
      if (!weatherResponse.ok) {
        const message = `Open-Meteo API error! Status: ${weatherResponse.status}`;
        throw new Error(message);
      }
      const openMeteoData = await weatherResponse.json();
      console.log('Open-Meteo Data:', openMeteoData);

      if (openMeteoData && openMeteoData.current && openMeteoData.daily) {
        setWeatherData({
          temperature_2m: openMeteoData.current.temperature_2m,
          weather_code: openMeteoData.current.weather_code,
          wind_speed_10m: openMeteoData.current.wind_speed_10m, 
          daily: openMeteoData.daily,
        });
      } else {
        setError('Could not retrieve current weather data.');
        setWeatherData(null);
      }
    } catch (error) {
      console.error('Fetching weather data failed:', error);
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData(null);
    }
  };

  return (
    <div className="app-container">
      <h1>Weather App</h1>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay weather={weatherData} error={error} city={city} />
    </div>
  );
}

export default App;