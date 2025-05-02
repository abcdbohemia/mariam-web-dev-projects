import React from 'react';
import weatherDescriptions from './weatherCodes';
import weatherIconMapping from  './weatherIconMapping';
import './DailyForecast.css'; 

function DailyForecast({ daily }) {
    if(!daily || !daily.time || !daily.temperature_2m_max || !daily.temperature_2m_min || !daily.weather_code) 
    {
        return <div>No daily forecast data available.</div>
    }

    return (
        <div className="daily-forecast-container">
            <h3>Daily Forecast</h3>
            <ul className="daily-forecast-list">
                {daily.time.map((date, index) => (
                    <li key={date} className="daily-forecast-item">
                        <p className="date">{new Date(date).toLocaleDateString(undefined, {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        {daily.weather_code && daily.weather_code[index] !==undefined && (
                            <img src={`/assets/animated/${weatherIconMapping[daily.weather_code[index]] || 
                                'default.svg'}`} alt={weatherDescriptions[daily.weather_code[index]] || 'Weathericon'}
                                className="daily-weather-icon" 
                            />
                        )}
                        <p className="temp-max">Max: {Math.round(daily.temperature_2m_max[index])}°C</p>
                        <p className="temp-min">Min: {Math.round(daily.temperature_2m_min[index])}°C</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DailyForecast;