const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3001 });

wss.on("connection", (ws) => {
  console.log("Client connected");

  setInterval(() => {
    const weatherAlert = JSON.stringify({
      type: "weather_alert",
      message: "Storm Warning!",
    });
    ws.send(weatherAlert);
  }, 10000); // Send every 10 sec

  ws.on("message", (message) => console.log("Received:", message));

  ws.on("close", () => console.log("Client disconnected"));
});

console.log("WebSocket Server running on ws://localhost:3001");
