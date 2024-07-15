// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Constants
const FIELD_WIDTH = 800;
const FIELD_HEIGHT = 600;
const PLAYER_SIZE = 20;
const GOALIE_SIZE = 30;
const BALL_RADIUS = 10;
const PLAYER_SPEED = 2;
const BALL_SPEED = 3;
const GOAL_WIDTH = 100;
const GOAL_HEIGHT = 300;
const SCORE_LIMIT = 3;

// Players and ball
let playersTeamA = [];
let playersTeamB = [];
let goalieTeamA, goalieTeamB;
let ball = {
    x: FIELD_WIDTH / 2,
    y: FIELD_HEIGHT / 2,
    dx: 0,
    dy: 0,
    radius: BALL_RADIUS
};

// Scores
let teamAScore = 0;
let teamBScore = 0;

// Reward and punishment system
const REWARD_POINTS = 1;
const PUNISHMENT_POINTS = -1;

// Initialize players
initializePlayers();

// Key state (for player control)
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

// Initialize players for both teams
function initializePlayers() {
    // Team A
    for (let i = 0; i < 5; i++) {
        playersTeamA.push({
            x: 50,
            y: (i + 1) * (FIELD_HEIGHT / 6),
            width: PLAYER_SIZE,
            height: PLAYER_SIZE
        });
    }
    goalieTeamA = {
        x: 20,
        y: FIELD_HEIGHT / 2 - GOALIE_SIZE / 2,
        width: GOALIE_SIZE,
        height: GOALIE_SIZE
    };

    // Team B
    for (let i = 0; i < 5; i++) {
        playersTeamB.push({
            x: FIELD_WIDTH - 70,
            y: (i + 1) * (FIELD_HEIGHT / 6),
            width: PLAYER_SIZE,
            height: PLAYER_SIZE
        });
    }
    goalieTeamB = {
        x: FIELD_WIDTH - 50,
        y: FIELD_HEIGHT / 2 - GOALIE_SIZE / 2,
        width: GOALIE_SIZE,
        height: GOALIE_SIZE
    };

    // Reset ball position
    resetBall();
}

// Update game objects
function update() {
    movePlayers();
    moveGoalies();
    moveBall();
    checkCollisions();
    checkGoals();
}

// Move players based on AI logic and key presses
function movePlayers() {
    // Team A AI logic (simple movement towards the ball)
    playersTeamA.forEach(player => {
        if (ball.x > player.x) {
            player.x += PLAYER_SPEED;
        } else {
            player.x -= PLAYER_SPEED;
        }
    });

    // Team B AI logic (simple movement towards the ball)
    playersTeamB.forEach(player => {
        if (ball.x < player.x) {
            player.x -= PLAYER_SPEED;
        } else {
            player.x += PLAYER_SPEED;
        }
    });

    // Player control for team A (for testing)
    if (keys[38] && playersTeamA[0].y > 0) { // Up arrow
        playersTeamA[0].y -= PLAYER_SPEED;
    }
    if (keys[40] && playersTeamA[0].y < FIELD_HEIGHT - PLAYER_SIZE) { // Down arrow
        playersTeamA[0].y += PLAYER_SPEED;
    }
}

// Move goalies based on ball position
function moveGoalies() {
    // Team A goalie AI logic (follows the ball vertically)
    if (ball.y < goalieTeamA.y + goalieTeamA.height / 2) {
        goalieTeamA.y -= PLAYER_SPEED;
    } else if (ball.y > goalieTeamA.y + goalieTeamA.height / 2) {
        goalieTeamA.y += PLAYER_SPEED;
    }

    // Team B goalie AI logic (follows the ball vertically)
    if (ball.y < goalieTeamB.y + goalieTeamB.height / 2) {
        goalieTeamB.y -= PLAYER_SPEED;
    } else if (ball.y > goalieTeamB.y + goalieTeamB.height / 2) {
        goalieTeamB.y += PLAYER_SPEED;
    }
}

// Move ball and handle collisions with walls and players
function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Collision with top and bottom walls
    if (ball.y + ball.radius > FIELD_HEIGHT || ball.y - ball.radius < 0) {
        ball.dy = -ball.dy;
    }

    // Collision with players
    playersTeamA.forEach(player => {
        if (collisionDetection(ball, player)) {
            ball.dx = -ball.dx;
            applyPunishment(player);
        }
    });

    playersTeamB.forEach(player => {
        if (collisionDetection(ball, player)) {
            ball.dx = -ball.dx;
            applyPunishment(player);
        }
    });

    // Collision with goalies
    if (collisionDetection(ball, goalieTeamA) || collisionDetection(ball, goalieTeamB)) {
        ball.dx = -ball.dx;
    }

    // Scoring
    if (ball.x - ball.radius < 0) {
        teamBScore++;
        applyReward(playersTeamB);
        resetBall();
    } else if (ball.x + ball.radius > FIELD_WIDTH) {
        teamAScore++;
        applyReward(playersTeamA);
        resetBall();
    }
}

// Reset ball position to center
function resetBall() {
    ball.x = FIELD_WIDTH / 2;
    ball.y = FIELD_HEIGHT / 2;
    ball.dx = Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED;
    ball.dy = Math.random() < 0.5 ? -BALL_SPEED : BALL_SPEED;
}

// Check if a player collides with the ball
function collisionDetection(ball, player) {
    let distX = Math.abs(ball.x - player.x - player.width / 2);
    let distY = Math.abs(ball.y - player.y - player.height / 2);

    if (distX > (player.width / 2 + ball.radius)) { return false; }
    if (distY > (player.height / 2 + ball.radius)) { return false; }

    if (distX <= (player.width / 2)) { return true; }
    if (distY <= (player.height / 2)) { return true; }

    let dx = distX - player.width / 2;
    let dy = distY - player.height / 2;
    return (dx * dx + dy * dy <= (ball.radius * ball.radius));
}

// Apply reward points to players
function applyReward(players) {
    players.forEach(player => {
        player.rewardPoints = REWARD_POINTS;
    });
}

// Apply punishment points to player
function applyPunishment(player) {
    player.rewardPoints = PUNISHMENT_POINTS;
}

// Check for goals and update scoreboard
function checkGoals() {
    if (teamAScore >= SCORE_LIMIT) {
        alert(`Game Over! Team A wins!`);
        resetGame();
    } else if (teamBScore >= SCORE_LIMIT) {
        alert(`Game Over! Team B wins!`);
        resetGame();
    }
}

// Reset game state
function resetGame() {
    teamAScore = 0;
    teamBScore = 0;
    initializePlayers();
}

// Draw game objects
function draw() {
    ctx.clearRect(0, 0, FIELD_WIDTH, FIELD_HEIGHT);

    // Draw players
    ctx.fillStyle = 'blue';
    playersTeamA.forEach(player => {
        ctx.fillRect(player.x, player.y, player.width, player.height);
    });

    ctx.fillStyle = 'red';
    playersTeamB.forEach(player => {
        ctx.fillRect(player.x, player.y, player



