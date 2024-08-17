// src/server/socketServer.js
import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer((req, res) => {
  // You can add your SvelteKit application handler here
  res.end('SvelteKit server');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (msg) => {
    console.log('message received:', msg);
    io.emit('message', msg); // Broadcast the message to all clients
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

export default server;

