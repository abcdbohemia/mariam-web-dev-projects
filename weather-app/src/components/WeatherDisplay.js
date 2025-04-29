import React from "react";

function WeatherDisplay({ weather, error, city }) {
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (weather) {
        return (
            <div className="weather-info">
                <h2>{city}</h2> {/* placeholder for city/locatin*/}
                <p className="temperature">Temperature: {Math.round(weather.temperature)}°C</p>
                {weather.weather_code && (
                    <p className="description">Weather Code: {weather.weather_code} </p>
                )}
                <p className="wind">Wind Speed: {weather.windspeed} m/s</p>
            </div>
        );
    }
//What to display id neither weather nor error is present (initial state)
    return <div className="placeholder">Enter a city to see the weather.</div>;
}

export default WeatherDisplay;