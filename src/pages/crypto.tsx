import { useState } from 'react';

export default function Crypto() {
  const [crypto, setCrypto] = useState('');
  const [cryptoData, setCryptoData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCryptoData = async () => {
    if (!crypto) return alert('Please enter a cryptocurrency name or symbol.');

    try {
      const response = await fetch(`/api/crypto?crypto=${crypto.toLowerCase()}`);
      const data = await response.json();

      if (response.ok) {
        setCryptoData(data);
        setError(null);
      } else {
        setError(data.error || 'Error fetching data');
        setCryptoData(null);
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Crypto Price Checker</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter crypto name (e.g., bitcoin)"
          value={crypto}
          onChange={(e) => setCrypto(e.target.value)}
          className="border border-gray-300 p-2 rounded-md flex-grow"
        />
        <button
          onClick={fetchCryptoData}
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Check Price
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {cryptoData && (
        <div className="bg-white shadow-md p-4 rounded-md">
          <h2 className="text-xl font-semibold">{crypto.toUpperCase()}</h2>
          <p>Price: ${cryptoData.usd}</p>
          <p>Market Cap: ${cryptoData.usd_market_cap}</p>
          <p>24h Change: {cryptoData.usd_24h_change.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
}
