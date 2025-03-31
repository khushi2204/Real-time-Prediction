import { useState } from 'react';

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
}

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    if (!city) return alert('Please enter a city name');

    try {
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
        setError(null);
      } else {
        setError(data.error || 'Error fetching data');
        setWeather(null);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Weather Checker</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border border-gray-300 p-2 rounded-md"
        />
        <button
          onClick={fetchWeather}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Check Weather
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {weather && (
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-xl font-semibold">{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}
