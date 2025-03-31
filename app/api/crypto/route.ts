import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const crypto = searchParams.get("crypto")

  if (!crypto) {
    return NextResponse.json({ error: "Please provide a cryptocurrency name or symbol." }, { status: 400 })
  }

  const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY || "" // Use empty string as fallback

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    const response = await fetch(url + (apiKey ? `&x-api-key=${apiKey}` : ""))
    const data = await response.json()

    if (!data[crypto]) {
      return NextResponse.json({ error: "Cryptocurrency not found." }, { status: 404 })
    }

    return NextResponse.json(data[crypto])
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch crypto data." }, { status: 500 })
  }
}

