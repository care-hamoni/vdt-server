const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5174', 'http://localhost:5173', 'https://test.carehamoni.com'], // Add your allowed origin here
    methods: ['GET', 'POST'],        // Specify which HTTP methods are allowed
    allowedHeaders: ['Content-Type'], // Specify which headers are allowed
    credentials: true                // Allow cookies to be sent with requests
  },
  pingTimeout: 60000,  // Set timeout to 60 seconds
  pingInterval: 25000,
});

// Enable CORS for HTTP requests
app.use(cors({
  origin: ['http://localhost:5174', 'http://localhost:5173', 'https://test.carehamoni.com'], // Add your allowed origin here
  methods: ['GET', 'POST'],        // Specify which HTTP methods are allowed
  allowedHeaders: ['Content-Type'], // Specify which headers are allowed
  credentials: true                // Allow cookies to be sent with requests
}));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('offer', offer => {
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', answer => {
    socket.broadcast.emit('answer', answer);
  });

  socket.on('ice-candidate', candidate => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5000, () => {
  console.log('Server listening on port 5000');
});
