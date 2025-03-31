"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Cloud, LayoutDashboard, LifeBuoy, Newspaper, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface CryptoData {
  usd: number
  usd_market_cap: number
  usd_24h_change: number
}

export default function CryptoPage() {
  const [crypto, setCrypto] = useState("")
  const [cryptoData, setCryptoData] = useState<CryptoData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchCryptoData = async () => {
    if (!crypto) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/crypto?crypto=${crypto.toLowerCase()}`)
      const data = await response.json()

      if (response.ok) {
        setCryptoData(data)
      } else {
        setError(data.error || "Error fetching crypto data")
        setCryptoData(null)
      }
    } catch (err) {
      setError("Network error. Please try again later.")
      setCryptoData(null)
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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Cloud className="h-4 w-4" />
                Weather
              </Button>
            </Link>
            <Link href="/crypto">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10">
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
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Cryptocurrency Information</h1>
              <div className="text-sm text-muted-foreground">Check current prices and market data</div>
            </div>
          </div>

          <Card className="p-6 bg-black">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <Input
                placeholder="Enter cryptocurrency name (e.g., bitcoin, ethereum)"
                value={crypto}
                onChange={(e) => setCrypto(e.target.value)}
                className="bg-black"
                onKeyDown={(e) => e.key === "Enter" && fetchCryptoData()}
              />
              <Button onClick={fetchCryptoData} disabled={loading} className="bg-primary">
                {loading ? "Searching..." : "Check Price"}
              </Button>
            </div>

            {error && (
              <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">{error}</div>
            )}

            {cryptoData && (
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 bg-background/30">
                  <div className="text-sm text-muted-foreground">Current Price</div>
                  <div className="text-3xl font-bold">${cryptoData.usd.toLocaleString()}</div>
                </Card>
                <Card className="p-6 bg-background/30">
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                  <div className="text-3xl font-bold">${cryptoData.usd_market_cap.toLocaleString()}</div>
                </Card>
                <Card className="p-6 bg-background/30">
                  <div className="text-sm text-muted-foreground">24h Change</div>
                  <div
                    className={`text-3xl font-bold ${
                      cryptoData.usd_24h_change >= 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {cryptoData.usd_24h_change >= 0 ? "+" : ""}
                    {cryptoData.usd_24h_change.toFixed(2)}%
                  </div>
                </Card>
              </div>
            )}

            {!cryptoData && !error && !loading && (
              <div className="text-center p-10 text-muted-foreground">
                <Wallet className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Enter a cryptocurrency name to check the current price and market data</p>
              </div>
            )}

            {loading && (
              <div className="text-center p-10">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading cryptocurrency data...</p>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  )
}

