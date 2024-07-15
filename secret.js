// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const TABLE_WIDTH = 800;
const TABLE_HEIGHT = 600;
const PLAYER_WIDTH = 20;
const PLAYER_HEIGHT = 100;
const BALL_RADIUS = 10;
const PLAYER_SPEED = 8;
const BALL_SPEED = 5;
const SCORE_LIMIT = 5;
const ROUND_LIMIT = 25;

// Players
let player = {
    x: 50,
    y: TABLE_HEIGHT / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    score: 0
};

let opponent = {
    x: TABLE_WIDTH - 50 - PLAYER_WIDTH,
    y: TABLE_HEIGHT / 2 - PLAYER_HEIGHT / 2,
    width: PLAYER_WIDTH,
    height: PLAYER_HEIGHT,
    score: 0
};

// Ball
let ball = {
    x: TABLE_WIDTH / 2,
    y: TABLE_HEIGHT / 2,
    dx: Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED,
    dy: Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED,
    radius: BALL_RADIUS
};

// Round management
let roundCount = 0;
let roundWinner = '';

// Key state
let keys = {};

// Event listeners
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(event) {
    keys[event.keyCode] = true;
}

function keyUpHandler(event) {
    keys[event.keyCode] = false;
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Update game objects
function update() {
    movePlayer();
    moveOpponent();
    moveBall();
    checkCollision();
    checkScore();
}

// Move player based on key presses
function movePlayer() {
    if (keys[38] && player.y > 0) { // Up arrow
        player.y -= PLAYER_SPEED;
    }
    if (keys[40] && player.y < TABLE_HEIGHT - player.height) { // Down arrow
        player.y += PLAYER_SPEED;
    }
}

// Basic AI movement for opponent
function moveOpponent() {
    // AI logic to follow the ball
    if (ball.y < opponent.y + opponent.height / 2) {
        opponent.y -= PLAYER_SPEED;
    } else if (ball.y > opponent.y + opponent.height / 2) {
        opponent.y += PLAYER_SPEED;
    }
}

// Move ball and handle collisions with walls and players
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Collision with top and bottom walls
    if (ball.y + ball.radius > TABLE_HEIGHT || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Collision with player and opponent paddles
    if (ball.x - ball.radius < player.x + player.width &&
        ball.y > player.y &&
        ball.y < player.y + player.height) {
        ball.dx = -ball.dx;
    }

    if (ball.x + ball.radius > opponent.x &&
        ball.y > opponent.y &&
        ball.y < opponent.y + opponent.height) {
        ball.dx = -ball.dx;
    }

    // Scoring
    if (ball.x - ball.radius < 0) {
        opponent.score++;
        resetBall();
    } else if (ball.x + ball.radius > TABLE_WIDTH) {
        player.score++;
        resetBall();
    }
}

// Reset ball position to center
function resetBall() {
    ball.x = TABLE_WIDTH / 2;
    ball.y = TABLE_HEIGHT / 2;
    ball.dx = Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED;
    ball.dy = Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED;

    roundCount++;
    updateScoreboard();

    if (roundCount >= ROUND_LIMIT) {
        declareRoundWinner();
        resetGame();
    }
}

// Check if score limit is reached
function checkScore() {
    if (player.score >= SCORE_LIMIT || opponent.score >= SCORE_LIMIT) {
        declareGameWinner();
        resetGame();
    }
}

// Update scoreboard
function updateScoreboard() {
    document.getElementById('playerScore').textContent = player.score;
    document.getElementById('opponentScore').textContent = opponent.score;
    document.getElementById('roundCount').textContent = roundCount;
}

// Declare winner of the round
function declareRoundWinner() {
    roundWinner = player.score > opponent.score ? 'Player' : 'Opponent';
    document.getElementById('roundWinner').textContent = roundWinner;
}

// Declare winner of the game
function declareGameWinner() {
    let winner = player.score > opponent.score ? 'Player' : 'Opponent';
    alert(`Game Over!\n${winner} wins the game!`);
}

// Reset game state
function resetGame() {
    player.score = 0;
    opponent.score = 0;
    roundCount = 0;
    roundWinner = '';
    updateScoreboard();
}

// Check collision and update ball direction
function checkCollision() {
    // Ball collision logic
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    // Draw players
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.fillRect(opponent.x, opponent.y, opponent.width, opponent.height);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();

    // Draw scoreboard
    updateScoreboard();
}

// Start the game loop
gameLoop();


