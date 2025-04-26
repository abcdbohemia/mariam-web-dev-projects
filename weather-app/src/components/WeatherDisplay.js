import React from "react";

function WeatherDisplay({weather, error}) {
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (weather) {
        return (
            <div className="weather-info">
                <h2>{weather.name}, {weather.sys.country}</h2>
                <p className="temperature">Temperature: {Math.round(weather.main.temp)}°C</p>
                <p className="description">{weather.weather[0].description}</p>
                <p className="humidity">Humidity: {weather.main.humidity}%</p>
                <p className="wind">Wind Speed: {weather.wind.speed} m/s</p>
            </div>
        );
    }
//What to display id neither weather nor error is present (initial state)
    return <div className="placeholder">Enter a city to see the weather.</div>;
}

export default WeatherDisplay;