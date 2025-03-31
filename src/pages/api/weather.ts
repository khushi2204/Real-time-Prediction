import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData.message });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
