const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

const players = {};
const BLOCK_SIZE = 30;
const BOARD_SIZE = 500;

// The core validation engine
function checkCollision(newX, newY, socketId) {
    // 1. Wall collisions
    if (newX < 0 || newX > BOARD_SIZE - BLOCK_SIZE) return true;
    if (newY < 0 || newY > BOARD_SIZE - BLOCK_SIZE) return true;

    // 2. Player-to-player collisions
    for (let id in players) {
        if (id === socketId) continue; // Don't collide with yourself
        let p = players[id];

        // AABB Collision logic
        if (newX < p.x + BLOCK_SIZE &&
            newX + BLOCK_SIZE > p.x &&
            newY < p.y + BLOCK_SIZE &&
            newY + BLOCK_SIZE > p.y) {
            return true;
        }
    }
    return false;
}

io.on('connection', (socket) => {
    // Spawn player at random safe coordinates
    players[socket.id] = {
        x: Math.floor(Math.random() * (BOARD_SIZE - BLOCK_SIZE)),
        y: Math.floor(Math.random() * (BOARD_SIZE - BLOCK_SIZE)),
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
    };
    // Send the complete state to everyone whenever someone joins
    io.emit('stateUpdate', players);

    // Listen for movement INTENT, not exact coordinates
    socket.on('moveRequest', (movement) => {
        let p = players[socket.id];
        if (!p) return;

        let newX = p.x + movement.dx;
        let newY = p.y + movement.dy;

        // Only update the master state if the path is clear
        if (!checkCollision(newX, newY, socket.id)) {
            p.x = newX;
            p.y = newY;
            io.emit('stateUpdate', players);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('stateUpdate', players); // Update everyone that a block vanished
    });
});

server.listen(3000, () => {
    console.log('Authoritative server running at http://localhost:3000');
});