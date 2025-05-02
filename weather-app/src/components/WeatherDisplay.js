import React from "react";
import weatherDescriptions from './weatherCodes';
import weatherIconMapping from './weatherIconMapping';
import './WeatherDisplay.css'

function WeatherDisplay({ weather, error, city }) {
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (weather) {
    const description = weatherDescriptions[weather.weather_code] // Using the value of weather.weather_code as a key to look up a corresponding value within the weatherDescription object.
    || "Description not available";
    const iconFile = weatherIconMapping[weather.weather_code] || 'default.svg'; // Get the icon file name, with a default fallback 
    const iconPath = `/assets/animated/${iconFile}`; //construct the path to the icon 
    
    return (
      <div className="weather-info">
        <h2>{city}</h2> {/* Placeholder for city/location */}
        <div className="weather-details">
          {iconPath && <img src={iconPath} alt={description} className="weather-icon" />} {/*Display the icon*/}
          <p className="temperature">Temperature: {Math.round(weather.temperature_2m)}°C</p>
        </div>
        {weather.weather_code && (
          <p className="description">Weather: {description} (Code: {weather.weather_code})</p>
        )}
        <p className="wind">Wind Speed: {weather.wind_speed_10m} m/s</p>
      </div>
    );
  }

  // What to display if neither weather nor error is present (initial state)
  // If the code reaches the final return statement, its guaranteed that none of the preceeding
  //if conditions were met, because if they were, the function would have already exited with a return.
  return <div className="placeholder">Enter a city to see the weather.</div>;
}

export default WeatherDisplay;