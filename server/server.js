const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const mongoose = require('mongoose');
const socketHandler = require('./websocket/socketHandler');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

require('./config/db')(); // Connect to MongoDB

wss.on('connection', (ws) => {
  socketHandler(ws, wss);
});

app.use(express.json());
app.use('/api/document', require('./routes/document'));

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
