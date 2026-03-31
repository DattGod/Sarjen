import React, { useState } from 'react';

const WeatherApp = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        setLoading(true);
        setError(null);
        setWeatherData(null);

        try {
            // Step 1: Geocoding - Search city to get lat/lon
            const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
            const geoData = await geoRes.json();

            if (!geoData.results || geoData.results.length === 0) {
                throw new Error('City not found. Please try another name.');
            }

            const { latitude, longitude, name, country } = geoData.results[0];

            // Step 2: Weather - Get current weather for those coordinates
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`);
            const weather = await weatherRes.json();

            setWeatherData({
                name,
                country,
                temp: weather.current_weather.temperature,
                wind: weather.current_weather.windspeed,
                time: weather.current_weather.time,
                is_day: weather.current_weather.is_day
            });

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Weather App</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter City Name (e.g., London)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p style={{ color: '#dc3545' }}>{error}</p>}

            {weatherData && (
                <div border="1">
                    <h3>{weatherData.name}, {weatherData.country}</h3>
                    <p>Status: {weatherData.is_day ? 'Day' : 'Night'}</p>
                    <p>Temperature: {weatherData.temp}°C</p>
                    <p>Wind Speed: {weatherData.wind} km/h</p>
                    <p>Local Time: {new Date(weatherData.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
            )}
        </div>
    );
};

export default WeatherApp;
