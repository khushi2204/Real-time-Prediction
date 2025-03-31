# Crypto WebSocket Project

## 📌 Project Overview
This project is a real-time WebSocket-based application that connects to a cryptocurrency WebSocket server to receive live updates on price changes and alerts.

---

## 🏗️ Tech Stack
- **Frontend:** React, TypeScript
- **WebSocket:** Stream Binance WebSocket Server
- **Notifications:** Sonner (Toast notifications)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/crypto-websocket.git
cd crypto-websocket
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```
The application should now be running on `http://localhost:3000`.

---

## 🏗️ Build Instructions

To create a production build, run:
```sh
npm run build
```
This will generate an optimized build in the `dist` folder.

To preview the production build:
```sh
npm run preview
```

---

## 🌍 WebSocket Implementation

The application establishes a WebSocket connection to receive real-time messages. The WebSocket implementation is handled inside the `useWebSocket` hook.

### Key Features:
- Connects to `wss://stream.binance.com:9443/ws/btcusdt@trade`
- Handles JSON and non-JSON messages gracefully
- Displays alerts via toast notifications
- Manages connection state and reconnection attempts

---

## 🎨 Design Decisions

### ✅ WebSocket Hook (`useWebSocket`)
- Encapsulated WebSocket logic inside a reusable custom hook.
- Handles automatic reconnection in case of connection loss.
- Differentiates between JSON and non-JSON messages for better handling.

### ✅ Notification System
- Uses `sonner` for toast notifications to alert the user of price updates or errors.

### ✅ Error Handling
- Implements robust error handling for WebSocket messages.
- Parses messages safely to prevent crashes from non-JSON data.

---

## 🛠️ Troubleshooting

### ❌ WebSocket Not Connecting?
- Ensure you are connected to the internet.
- Check the WebSocket URL for correctness.
- Try restarting the development server with `npm run dev`.

### 🛠 JSON Parsing Errors?
- The WebSocket server may send non-JSON data. Logs are included to debug these cases.

---

## 🤝 Contributing
Feel free to fork the repository and submit pull requests for improvements!

---

## 📜 License
This project is licensed under the MIT License.

---

### 🔗 Contact
For any questions or feedback, reach out via [your email or GitHub profile link].

