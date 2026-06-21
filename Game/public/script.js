const socket = io();
const board = document.getElementById('game-board');
const moveAmount = 10;

// Helper to draw blocks
function createBlock(id, player) {
    const block = document.createElement('div');
    block.id = id;
    block.className = 'player-block';
    block.style.backgroundColor = player.color;
    block.style.left = player.x + 'px';
    block.style.top = player.y + 'px';
    board.appendChild(block);
}

// The server dictates the board state. When it updates, we wipe and redraw.
socket.on('stateUpdate', (players) => {
    board.innerHTML = '';
    Object.keys(players).forEach(id => createBlock(id, players[id]));
});

// Send movement vectors instead of absolute positions
document.addEventListener('keydown', (e) => {
    let dx = 0;
    let dy = 0;

    if (e.key === 'ArrowUp') dy = -moveAmount;
    if (e.key === 'ArrowDown') dy = moveAmount;
    if (e.key === 'ArrowLeft') dx = -moveAmount;
    if (e.key === 'ArrowRight') dx = moveAmount;

    if (dx !== 0 || dy !== 0) {
        socket.emit('moveRequest', { dx, dy });
    }
});