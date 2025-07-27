import express from "express";
import connectToDatabase from "./db/db.js";
import dotenv from "dotenv";
import { WebSocketServer } from "ws";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
// Initialize database connection
connectToDatabase();
const app = express();
const server=http.createServer(app);

const wss = new WebSocketServer({ server});
wss.on("connection", (ws) => {
  console.log("New client connected");
  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
  });
  wss.clients.forEach((client) => {
    if (client !== ws && client.readyState === client.OPEN) {
      client.send(`New message from a client: ${message}`);
    }
  });
  ws.on("close", () => {
    console.log("Client disconnected");
  });
  ws.send("Welcome to the WebSocket server!");
});

app.use(express.json());
const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || 5001;

server.listen(SERVER_URL, () => {
  console.log(`WebSocket server is running on port ${SERVER_URL}`);
});
app.get("/", (req, res) => {
  res.send("WebSocket with MongoDB server is running");
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
