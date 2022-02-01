// Hole Instanz des canvas
const arena = document.getElementById("arena");
// als 2D-Element
const ctx = arena.getContext("2d");

const scoreElement = document.getElementById("score");

/* Settings */
const snakeColor = 'rgba(255,100,100,0.1)'; // '#FFCC33';
const snakeBorderColor = "rgba(255,0,0,0.5)";
const arenaColor = 'beige';
const fruitColor = '#990000';
const snakeHeadColor1 = 'green';
const snakeHeadColor2 = 'blue';
const Up = Symbol("up");
const Down = Symbol("down");
const Left = Symbol("left");
const Right = Symbol("right");

let foodX;
let foodY;
let dx = 10;
let dy = 0;
let score = 0;
let directionChanged = false;
let isGameOver = false;
let interval;

const start = [{
    x: 100,
    y: 200
}, {
    x: 90,
    y: 200
}, {
    x: 80,
    y: 200
}, {
    x: 70,
    y: 200
}, {
    x: 60,
    y: 200
}, ];

let snake = [...start];

function drawSnakePart(snakePart, index) {

    ctx.strokestyle = snakeBorderColor;
    if (index == 0) {

        let direction = dy === -10 ? Up : dy === 10 ? Down : dx === 10 ? Right : Left;

        console.log(direction);

        switch (direction) {
            case Up:
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 0.5 * Math.PI, 1.3 * Math.PI)
                ctx.fillStyle = snakeHeadColor1;
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 1.7 * Math.PI, 0.5 * Math.PI)
                ctx.fillStyle = snakeHeadColor2;
                ctx.fill();
                ctx.closePath();
                break;    
            
        

            case Down:

                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 1.5 * Math.PI, 0.3 * Math.PI)
                ctx.fillStyle = snakeHeadColor1;
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, .7 * Math.PI, 1.5 * Math.PI)
                ctx.fillStyle = snakeHeadColor2;
                ctx.fill();
                ctx.closePath();

                break;
            case Right:
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 0.2 * Math.PI, 1 * Math.PI)
                ctx.fillStyle = snakeHeadColor1;
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 1 * Math.PI, 1.8 * Math.PI)
                ctx.fillStyle = snakeHeadColor2;
                ctx.fill();
                ctx.closePath();
                break;
            case Left:
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 0 * Math.PI, 0.8 * Math.PI)
                ctx.fillStyle = snakeHeadColor1;
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(snakePart.x + 5, snakePart.y + 5, 8, 1.2 * Math.PI, 2 * Math.PI)
                ctx.fillStyle = snakeHeadColor2;
                ctx.fill();
                ctx.closePath();
                break;
        }



    } else {
        ctx.beginPath();
        ctx.fillStyle = snakeColor;
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
        ctx.closePath();
    }
}

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach((p, i) => drawSnakePart(p, i));
}

function renderScore() {
    scoreElement.innerText = `score: ${score}`;
}

// Bewegung (rechts)
function moveSnake() {
    // head ist das neue erste Element des Arrays 
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };
    snake.unshift(head); // head ansetzen 
    if (snake[0].x === foodX && snake[0].y === foodY) {
        score += 10; // gefressen
        // Generate new food location
        createFood();
    } else {
        snake.pop(); // letztes Element aus Array löschen
        if (hasCollided()) isGameOver = true;
    }
}

function resetArena() {
    ctx.fillStyle = arenaColor;
    ctx.fillRect(0, 0, arena.width, arena.height);
}

function gameOver() {
    /* 
    Mach irgendwas
    */

    resetGame();
}

function resetGame() {
    score = 0;
    snake = [...start];
    isGameOver = false;
    console.log('Game over');
    dx = 10;
    dy = 0;
    clearInterval(interval);
    main();
}

function main() {
    interval = window.setInterval(() => {
        if (isGameOver) resetGame();
        directionChanged = false;
        resetArena();
        drawFood();
        moveSnake();
        drawSnake();
        renderScore();
    }, 150);
}

function handleKeydownEvent(event) {

    if (directionChanged) return;
    directionChanged = true;
    // aktuelle Richtung ermitteln

    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    switch (event.key) {
        case 'ArrowLeft':
            if (!goingRight) {
                dx = -10;
                dy = 0;
            }
            break;

        case 'ArrowUp':
            if (!goingDown) {
                dx = 0;
                dy = -10;
            }
            break;

        case 'ArrowRight':
            if (!goingLeft) {
                dx = 10;
                dy = 0;
            }
            break;

        case 'ArrowDown':
            if (!goingUp) {
                dx = 0;
                dy = 10;
            }
            break;
    }
}

function hasCollided() {

    let collideWithBody = false;
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) collideWithBody = true;
    }
    const collideLeftBorder = snake[0].x < 0;
    const collideRightBorder = snake[0].x > arena.width - 10;
    const collideTopBorder = snake[0].y < 0;
    const collideBottomBorder = snake[0].y > arena.height - 10;
    return collideLeftBorder || collideRightBorder || collideTopBorder || collideBottomBorder || collideWithBody
}

function getRandomPosition(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function createFood() {
    foodX = getRandomPosition(0, arena.width - 10);
    foodY = getRandomPosition(0, arena.height - 10);
    snake.forEach((part) => {
        if (part.x == foodX && part.y == foodY)
            createFood();
    });
}

function drawFood() {

    ctx.fillStyle = fruitColor;
    ctx.beginPath();
    ctx.moveTo(0 + foodX, 5 + foodY);
    ctx.lineTo(5 + foodX, 0 + foodY);
    ctx.lineTo(10 + foodX, 5 + foodY);
    ctx.lineTo(5 + foodX, 10 + foodY);
    ctx.lineTo(0 + foodX, 5 + foodY);
    ctx.closePath();
    ctx.fill();
}

main();
createFood();

document.addEventListener("keydown", handleKeydownEvent); // Richtung ändern