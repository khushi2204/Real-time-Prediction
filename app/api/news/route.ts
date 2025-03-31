import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return NextResponse.json({ error: "Please provide a search query." }, { status: 400 })
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY || "demo_key" // Use a fallback for demo
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`

    const response = await fetch(apiUrl)
    const data = await response.json()

    if (response.ok) {
      return NextResponse.json(data)
    } else {
      return NextResponse.json({ error: data.message || "Failed to fetch news data." }, { status: response.status })
    }
  } catch (error: any) {
    console.error("API Error:", error.message)
    return NextResponse.json({ error: error.message || "Internal server error." }, { status: 500 })
  }
}

