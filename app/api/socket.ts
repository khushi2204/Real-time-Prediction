"use client";
import { useEffect, useState } from "react";

export default function WebSocketComponent() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:4000");

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // Ensure correct JSON parsing
            console.log("Received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        socket.onerror = (error) => console.error("WebSocket Error:", error);
        socket.onclose = () => console.log("WebSocket disconnected");

        return () => socket.close(); // Cleanup on unmount
    }, []);

    return (
        <div>
            <h1>WebSocket Messages</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{JSON.stringify(msg)}</li>
                ))}
            </ul>
        </div>
    );
}
