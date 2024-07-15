const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game objects
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;
let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

// AI difficulty
const aiSpeed = 3;

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw paddles
    ctx.fillStyle = 'white';
    ctx.fillRect(0, player1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth, player2Y, paddleWidth, paddleHeight);
    
    // Draw ball
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function move() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    
    // Ball collision with top and bottom
    if (ballY <= 0 || ballY >= canvas.height - ballSize) {
        ballSpeedY = -ballSpeedY;
    }
    
    // Ball collision with paddles
    if (ballX <= paddleWidth) {
        if (ballY >= player1Y && ballY <= player1Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }
    
    if (ballX >= canvas.width - paddleWidth - ballSize) {
        if (ballY >= player2Y && ballY <= player2Y + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            resetBall();
        }
    }
    
    // AI movement
    if (player1Y + paddleHeight / 2 < ballY) {
        player1Y += aiSpeed;
    } else {
        player1Y -= aiSpeed;
    }
    
    if (player2Y + paddleHeight / 2 < ballY) {
        player2Y += aiSpeed;
    } else {
        player2Y -= aiSpeed;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function gameLoop() {
    move();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
