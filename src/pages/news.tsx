import { useState } from 'react';

interface NewsData {
  title: string;
  url: string;
  source: { name: string };
}

export default function News() {
  const [query, setQuery] = useState('');
  const [news, setNews] = useState<NewsData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchNews = async () => {
    if (!query) return alert('Please enter a search query.');

    setLoading(true);
    setError(null);
    setNews([]);

    try {
      const response = await fetch(`/api/news?query=${query}`);
      const data = await response.json();

      if (response.ok) {
        setNews(data.articles || []);
      } else {
        setError(data.error || 'Error fetching data');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Crypto News</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter keyword (e.g., Bitcoin)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-1"
        />
        <button
          onClick={fetchNews}
          className="ml-2 bg-purple-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search News'}
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {news.length > 0 && (
        <div>
          {news.map((item, index) => (
            <div key={index} className="bg-white shadow-md p-4 mb-4 rounded-md">
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-500">Source: {item.source?.name || 'Unknown'}</p>
              <a href={item.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </div>
          ))}
        </div>
      )}

      {loading && <p className="text-gray-500">Loading news...</p>}
    </div>
  );
}