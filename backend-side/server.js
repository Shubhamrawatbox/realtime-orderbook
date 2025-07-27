// // const express = require('express');
// // const http = require('http');
// // const { Server } = require('socket.io');
// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// const app = express();
// const server = http.createServer(app);  
// const io = new Server(server);

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html"); // Serve a simple HTML client
// });

// io.on("connection", (socket) => {
//   console.log("New user connected");

//   socket.emit("welcome", "Welcome to the Socket.IO server");

//   socket.on("message", (msg) => {
//     console.log("Message received:", msg);

//     // Broadcast to all clients except sender
//     socket.broadcast.emit("message", msg);
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// console.log("Socket.IO server is running on port 3000",process.env.SERVER_URL || 3000);
// const SERVER_URL = process.env.SERVER_URL || 3000;
// server.listen(SERVER_URL, () =>
//   console.log(`Server running on http://localhost:${SERVER_URL}`)
// );
