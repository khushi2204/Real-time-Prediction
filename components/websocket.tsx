"use client";  // Required for using useEffect
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const WebSocketContext = createContext<WebSocket | null>(null);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const connectWebSocket = () => {
      const ws = new WebSocket("wss://echo-websocket.hoppscotch.io");

      ws.onopen = () => {
        console.log("✅ WebSocket Connected");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.p) {
            console.log(`💰 BTC Price Update: ${data.p}`);
            toast.success(`BTC Price Alert: $${data.p}`);
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("❌ WebSocket Error:", error);
        toast.error("WebSocket error occurred.");
      };

      ws.onclose = () => {
        console.log("⚠️ WebSocket Disconnected");
        // Optionally retry connection after a delay
        setTimeout(connectWebSocket, 5000);
      };

      setSocket(ws);

      // Cleanup WebSocket when the component unmounts
      return () => {
        console.log("Cleaning up WebSocket connection");
        ws.close();
      };
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);  // Empty dependency array ensures the WebSocket is initialized only once

  return (
    <WebSocketContext.Provider value={socket}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
