// weatherIconMapping.js

const weatherIconMapping = {
    0: {day: 'clear-day.svg', night: 'clear-night.svg' },// Clear Sky
    1: { day: 'cloudy-3-day.svg', night: 'cloudy-3-night.svg' },// Mainly cloudy
    2: { day: 'cloudy-1-day.svg', night: 'cloudy-1-night.svg' },// Partly cloudy
    2: { day: 'cloudy-1-day.svg', night: 'cloudy-1-night.svg' },// Partly cloudy
    3: { day: 'cloudy.svg', night: 'cloudy.svg' },// Overcast
    45: { day: 'fog-day.svg', night: 'fog-night.svg' },// Fog
    48: { day: 'fog.svg', night: 'fog.svg' },// Depositing rime fog
    51: { day: 'rainy-1-day.svg', night: 'rainy-1-night.svg' },// Drizzle: Light intensity
    53: { day: 'rainy-2-day.svg', night: 'rainy-2-night.svg' },// Drizzle: Moderate intensity
    55: { day: 'rainy-3-day.svg', night: 'rainy-3-night.svg' },// Drizzle: Dense intensity
    56: { day: 'rain-and-sleet-mix.svg', night: 'rain-and-sleet-mix.svg' },// Freezing Drizzle: Light intensity
    57: { day: 'rain-and-sleet-mix.svg', night: 'rain-and-sleet-mix.svg' },// Freezing Drizzle: Dense intensity
    61: { day: 'rainy-1.svg', night: 'rainy-1.svg' },// Rain: Slight intensity
    63: { day: 'rainy-2.svg', night: 'rainy-2.svg' },// Rain: Moderate intensity
    65: { day: 'rainy-3.svg', night: 'rainy-3.svg' },// Rain: Heavy intensity
    66: { day: 'rain-and-sleet-mix.svg', night: 'rain-and-sleet-mix.svg' },// Freezing Rain: Light intensity
    67: { day: 'snow-and-sleet-mix.svg', night: 'snow-and-sleet-mix.svg' },// Freezing Rain: Heavy intensity
    71: { day: 'snowy-1-day.svg', night: 'snowy-1-night.svg' },// Snow fall: Slight intensity
    73: { day: 'snowy-2-day.svg', night: 'snowy-2-night.svg' },// Snow fall: Moderate intensity
    75: { day: 'snowy-3-day.svg', night: 'snowy-3-night.svg' },// Snow fall: Heavy intensity
    77: { day: 'snowy-3.svg', night: 'snowy-3.svg' },// Snow grains
    80: { day: 'rainy-1.svg', night: 'rainy-1.svg' },// Rain showers: Slight intensity
    81: { day: 'rainy-2.svg', night: 'rainy-2.svg' },// Rain showers: Moderate intensity
    82: { day: 'rainy-3.svg', night: 'rainy-3.svg' },// Rain showers: Violent intensity
    85: { day: 'snowy-1-day.svg', night: 'snowy-1-night.svg' },// Snow showers slight
    86: { day: 'snowy-3-day.svg', night: 'snowy-3-night.svg' },// Snow showers heavy
    95: { day: 'scattered-thunderstorms-day.svg', night: 'scattered-thunderstorms-night.svg' },// Thunderstorm: Slight or moderate
    96: { day: 'scattered-thunderstorms.svg', night: 'scattered-thunderstorms.svg' },// Thunderstorm with slight hail
    99: { day: 'thunderstorms.svg', night: 'thunderstorms.svg' },// Thunderstorm with heavy hail

};

export default weatherIconMapping;