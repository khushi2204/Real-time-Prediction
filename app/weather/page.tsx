"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Cloud, LayoutDashboard, LifeBuoy, Newspaper, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface WeatherData {
  name: string
  main: {
    temp: number
    humidity: number
    feels_like: number
    pressure: number
  }
  weather: { description: string; icon: string }[]
  wind: {
    speed: number
  }
}

export default function WeatherPage() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchWeather = async () => {
    if (!city) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const data = await response.json()

      if (response.ok) {
        setWeather(data)
      } else {
        setError(data.error || "Error fetching weather data")
        setWeather(null)
      }
    } catch (err) {
      setError("Network error. Please try again later.")
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-[280px_1fr]">
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
              <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10">
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
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between ">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Weather Information</h1>
              <div className="text-sm text-muted-foreground">Check current weather conditions for any city</div>
            </div>
          </div>

          <Card className="p-6 bg-black">
            <div className="flex flex-col md:flex-row gap-4 mb-6 text-white">
              <Input
                placeholder="Enter city name..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-black text-white"
                onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
              />
              <Button onClick={fetchWeather} disabled={loading} className="bg-primary">
                {loading ? "Searching..." : "Check Weather"}
              </Button>
            </div>

            {error && (
              <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">{error}</div>
            )}

            {weather && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-4 text-white">
                  <div className="text-3xl font-bold">{weather.name}</div>
                  <div className="flex items-center">
                    <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
                    <div className="ml-4 text-white">
                      <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt={weather.weather[0].description}
                        width={80}
                        height={80}
                      />
                      <div className="text-lg capitalize">{weather.weather[0].description}</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 bg-black text-white">
                    <div className="text-sm text-muted-foreground">Feels Like</div>
                    <div className="text-xl font-semibold">{Math.round(weather.main.feels_like)}°C</div>
                  </Card>
                  <Card className="p-4 bg-black text-white">
                    <div className="text-sm text-muted-foreground">Humidity</div>
                    <div className="text-xl font-semibold">{weather.main.humidity}%</div>
                  </Card>
                  <Card className="p-4 bg-black text-white">
                    <div className="text-sm text-muted-foreground">Wind Speed</div>
                    <div className="text-xl font-semibold">{weather.wind.speed} m/s</div>
                  </Card>
                  <Card className="p-4 bg-black text-white">
                    <div className="text-sm text-muted-foreground">Pressure</div>
                    <div className="text-xl font-semibold">{weather.main.pressure} hPa</div>
                  </Card>
                </div>
              </div>
            )}

            {!weather && !error && !loading && (
              <div className="text-center p-10 text-muted-foreground">
                <Cloud className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Enter a city name to check the current weather conditions</p>
              </div>
            )}

            {loading && (
              <div className="text-center p-10">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading weather data...</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  )
}

