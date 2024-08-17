// src/server.js
import { createServer } from 'vite';
import app from './app'; // Your SvelteKit application
import server from './socket/socket.js'; // Your Socket.IO server

console.log("smtg please")

async function startServer() {
  const vite = await createServer({
    server: { middlewareMode: true }
  });

  app.use(vite.middlewares);

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}

startServer();

