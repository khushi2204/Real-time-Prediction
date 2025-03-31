"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner"; // Toast notifications

export function useWebSocket() {
  const [messages, setMessages] = useState<string[]>([]);
  let lastPrice: number | null = null; // Store last BTC price

  useEffect(() => {
    const cryptoSocket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@trade");

    cryptoSocket.onopen = () => console.log("✅ Connected to Binance WebSocket");

    cryptoSocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.p) {
          const price = parseFloat(data.p);
          
          // Only update if price difference is at least $1
          if (lastPrice === null || Math.abs(price - lastPrice) >= 1000) {
            toast.success(`💰 BTC Price: $${price.toFixed(2)}`);
            setMessages((prev) => [...prev, `BTC Price: $${price.toFixed(2)}`]);
            lastPrice = price; // Update last price
          }
        }
      } catch (error) {
        console.error("❌ Error parsing Binance message:", error);
      }
    };

    cryptoSocket.onerror = (error) => console.error("❌ Crypto WebSocket Error:", error);
    cryptoSocket.onclose = () => console.log("⚠️ Binance WebSocket Disconnected");

    return () => {
      cryptoSocket.close();
    };
  }, []);

  return messages;
}
