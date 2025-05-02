import React from "react";
import weatherDescriptions from './weatherCodes';
import weatherIconMapping from './weatherIconMapping';

function WeatherDisplay({ weather, error, city }) {
  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  if (weather) {
    const description = weatherDescriptions[weather.weather_code] // Using the value of weather.weather_code as a key to look up a corresponding value within the weatherDescription object.
    || "Description not available";
    return (
      <div className="weather-info">
        <h2>{city}</h2> {/* Placeholder for city/location */}
        <p className="temperature">Temperature: {Math.round(weather.temperature)}°C</p>
        {weather.weather_code && (
          <p className="description">Weather: {description} (Code: {weather.weather_code})</p>
        )}
        <p className="wind">Wind Speed: {weather.windspeed} m/s</p>
      </div>
    );
  }

  // What to display if neither weather nor error is present (initial state)
  // If the code reaches the final return statement, its guaranteed that none of the preceeding
  //if conditions were met, because if they were, the function would have already exited with a return.
  return <div className="placeholder">Enter a city to see the weather.</div>;
}

export default WeatherDisplay;