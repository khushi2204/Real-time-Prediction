import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { crypto } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_CRYPTO_API_KEY;

  if (!crypto) {
    return res.status(400).json({ error: 'Please provide a cryptocurrency name or symbol.' });
  }

  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true&x-api-key=${apiKey}`);
    const data = await response.json();

    if (!data[crypto]) {
      return res.status(404).json({ error: 'Cryptocurrency not found.' });
    }

    res.status(200).json(data[crypto]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crypto data.' });
  }
}
