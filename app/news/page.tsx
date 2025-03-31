"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Cloud, LayoutDashboard, LifeBuoy, Newspaper, Settings, Wallet } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface NewsArticle {
  title: string
  url: string
  urlToImage?: string
  publishedAt: string
  source: { name: string }
  description: string
}

export default function NewsPage() {
  const [query, setQuery] = useState("")
  const [news, setNews] = useState<NewsArticle[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    if (!query) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/news?query=${encodeURIComponent(query)}`)
      const data = await response.json()

      if (response.ok) {
        setNews(data.articles || [])
      } else {
        setError(data.error || "Error fetching news data")
        setNews([])
      }
    } catch (err) {
      setError("Network error. Please try again later.")
      setNews([])
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
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Wallet className="h-4 w-4" />
                Crypto
              </Button>
            </Link>
            <Link href="/news">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-primary/10">
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
          <div className="mb-6 flex items-center justify-between text-white">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">News Articles</h1>
              <div className="text-sm text-muted-foreground">Search for the latest news on any topic</div>
            </div>
          </div>

          <Card className="p-6 bg-black mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Enter keyword (e.g., Bitcoin, Technology)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="bg-black text-white"
                onKeyDown={(e) => e.key === "Enter" && fetchNews()}
              />
              <Button onClick={fetchNews} disabled={loading} className="bg-primary">
                {loading ? "Searching..." : "Search News"}
              </Button>
            </div>
          </Card>

          {error && (
            <div className="p-4 mb-4 bg-red-500/10 border border-red-500/20 rounded-md text-red-500">{error}</div>
          )}

          {news.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((article, index) => (
                <Card key={index} className="overflow-hidden bg-black text-white flex flex-col">
                  {article.urlToImage && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={article.urlToImage || "/placeholder.svg"}
                        alt={article.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg?height=192&width=384"
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{article.description}</p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">{article.source?.name || "Unknown Source"}</span>
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary text-sm hover:underline"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {!news.length && !error && !loading && (
            <div className="text-center p-10 text-muted-foreground">
              <Newspaper className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Enter a keyword to search for news articles</p>
            </div>
          )}

          {loading && (
            <div className="text-center p-10">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading news articles...</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

