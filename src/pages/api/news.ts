import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Please provide a search query.' });
  }

  try {
    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    if (!API_KEY) throw new Error('API key is missing');
    
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`;
    console.log('Fetching URL:', apiUrl); // Debug log

    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('API Response:', data); // Debug log

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      return res.status(response.status).json({ error: data.message || 'Failed to fetch news data.' });
    }
  } catch (error: any) {
    console.error('API Error:', error.message);
    return res.status(500).json({ error: error.message || 'Internal server error.' });
  }
}
