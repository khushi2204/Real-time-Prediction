"use client";
import { Cloud, LayoutDashboard, LifeBuoy, Newspaper, Settings, Wallet } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "sonner"; // Toast notifications
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useWebSocket } from "../hooks/useWebSocket"; // Import WebSocket Hook

export default function Page() {
  const messages = useWebSocket(); // Use WebSocket Hook

  const [weatherData, setWeatherData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [newsData, setNewsData] = useState([]);

  // Fetch Weather Data
  useEffect(() => {
    async function fetchWeather() {
      try {
        const cities = ["New York", "London", "Tokyo"];
        const apiKey = "14e0b3e08ab2580832c9fa092b974e57"; // Replace with your API key
        const responses = await Promise.all(
          cities.map(async (city) => {
            const res = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
            );
            return res.ok ? await res.json() : null;
          })
        );
        setWeatherData(responses.filter((data) => data !== null));
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
    fetchWeather();
  }, []);

  // Fetch Crypto Data
  useEffect(() => {
    async function fetchCrypto() {
      try {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,solana");
        const data = await res.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    }
    fetchCrypto();
  }, []);

  // Fetch Crypto News
  useEffect(() => {
    async function fetchNews() {
      try {
        const apiKey = "f98e415481e74d5dbdd60ae2ba1d5d50"; // Replace with your News API key
        const res = await fetch(`https://newsapi.org/v2/everything?q=cryptocurrency&sortBy=publishedAt&apiKey=${apiKey}`);
        const data = await res.json();
        setNewsData(data.articles.slice(0, 5)); // Get top 5 headlines
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" richColors />
      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="border-r bg-black">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Wallet className="h-6 w-6" />
            <span className="font-bold">CryptoWeather Nexus</span>
          </div>
          <div className="px-4 py-4">
            <Input placeholder="Search" className="bg-black" />
          </div>
          <nav className="space-y-2 px-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/weather">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Cloud className="h-4 w-4" />
                Weather
              </Button>
            </Link>
            <Link href="/crypto">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wallet className="h-4 w-4" />
                Crypto
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Newspaper className="h-4 w-4" />
                News
              </Button>
            </Link>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <LifeBuoy className="h-4 w-4" />
              Support
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="p-6">
          {/* Weather Data */}
          <Card className="p-6 bg-gray-900 text-white">
            <h2 className="text-lg font-semibold mb-4">🌦️ Weather Data</h2>
            <div className="grid grid-cols-3 gap-4">
              {weatherData.length > 0 ? (
                weatherData.map((city, index) => (
                  <div key={index} className="border p-4 rounded-lg bg-gray-800">
                    <h3 className="text-lg">{city.name || "Unknown City"}</h3>
                    <p>🌡 Temp: {city.main?.temp ?? "N/A"}°C</p>
                    <p>💧 Humidity: {city.main?.humidity ?? "N/A"}%</p>
                    <p>🌤 Condition: {city.weather?.[0]?.description ?? "N/A"}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Loading weather data...</p>
              )}
            </div>
          </Card>

          {/* Cryptocurrency Data */}
          <Card className="p-6 mt-6 bg-gray-900 text-white">
            <h2 className="text-lg font-semibold mb-4">💰 Cryptocurrency Data</h2>
            <div className="grid grid-cols-3 gap-4">
              {cryptoData.length > 0 ? (
                cryptoData.map((crypto) => (
                  <div key={crypto.id} className="border p-4 rounded-lg bg-gray-800">
                    <h3 className="text-lg">{crypto.name}</h3>
                    <p>💵 Price: ${crypto.current_price.toFixed(2)}</p>
                    <p>📈 24h Change: {crypto.price_change_percentage_24h.toFixed(2)}%</p>
                    <p>🏦 Market Cap: ${crypto.market_cap.toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">Loading crypto data...</p>
              )}
            </div>
          </Card>

          {/* News Data */}
          <Card className="p-6 mt-6 bg-gray-900 text-white">
            <h2 className="text-lg font-semibold mb-4">📰 Crypto News</h2>
            <ul className="list-disc pl-4">
              {newsData.length > 0 ? (
                newsData.map((news, index) => (
                  <li key={index}>
                    <a href={news.url} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                      {news.title}
                    </a>
                  </li>
                ))
              ) : (
                <p className="text-gray-400">Loading news...</p>
              )}
            </ul>
          </Card>

          {/* WebSocket Messages */}
          <Card className="mt-6 p-4 bg-gray-900 text-white">
            <h3 className="text-lg font-semibold">📡 Live Bitcoin Prices</h3>
            <div className="h-32 overflow-auto border border-gray-600 p-2">
              {messages.length > 0 ? messages.map((msg, index) => <p key={index}>{msg}</p>) : <p className="text-gray-400">Waiting for updates...</p>}
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
