
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
    
    const nominatimURL = `https://nominatim.openstreetmap.org/search?q=${newCity}&format=json&limit=1`;

    try{
      const geoResponse = await fetch(nominatimURL);
      if (!geoResponse.ok) {
        const message = `Nominatim API error! status: ${geoResponse.status}`;
        throw new error (message);
      }
      const geoData = await geoResponse.json();

      if (geoData && geoData.length > 0) {
        const {lat, lon } = geoData[0];
        console.log('Coordinates found for', newCity, ':', lat, lon);
        await fetchWeather(lat, lon);
        //pass the display_name to WeatherDispay
        setCity(geoData[0].display_name);
        //update the city state with the full location name
      } else {
        setError('City not found. Please try again.');
        setWeatherData(null);
        setCity(''); //Clear the city state
      }
    } catch (error) {
        console.error('Fetching geocoding data failed:', error);
        setError('Failed to fetch location.data. Please try again.');
        setWeatherData(null);
      }
  };

  const fetchWeather = async (latitude, longitude) => {
    setWeatherData(null);
    setError(null);

  const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&units=metric`;
  try {
    const weatherResponse = await fetch(weatherApiUrl);
    if (!weatherResponse.ok) {
      const message = `Open-Meteo API error! status: ${weatherResponse.status}`;
      throw new Error(message);
    }
    const openMeteoData = await weatherResponse.json();
    if (openMeteoData && openMeteoData.current) {
      setWeatherData({
        temperature: openMeteoData.current.temperature_2m,
        weathercode: openMeteoData.current.weathercode,
        windspeed: openMeteoData.current.windspeed_10m,
      //add logic to inspect the weather code
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
