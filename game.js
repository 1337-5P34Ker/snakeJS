// Hole Instanz des canvas
const arena = document.getElementById("arena");
// als 2D-Element
const ctx = arena.getContext("2d");

const scoreElement = document.getElementById("score");

/* Settings */
const snakeColor = '#98CD8D';
const snakeBorderColor = '#990000';
const arenaColor = 'beige';
const fruitColor = '#56F299';
const fruitBorderColor = '#009900';

let foodX;
let foodY;
let dx = 10;
let dy = 0;
let score = 0;

let snake = [{
    x: 200,
    y: 200
}, {
    x: 190,
    y: 200
}, {
    x: 180,
    y: 200
}, {
    x: 170,
    y: 200
}, {
    x: 160,
    y: 200
}, ];



function drawSnakePart(snakePart) {
    ctx.fillStyle = snakeColor;
    ctx.strokestyle = snakeBorderColor;
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

/*Function that prints the parts*/
function drawSnake() {
    snake.forEach(drawSnakePart);
}

function renderScore(){
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
    if (hasCollided()) console.log('game over');
}
}

function resetArena() {
    ctx.fillStyle = arenaColor;
    ctx.fillRect(0, 0, arena.width, arena.height);
}

function main() {
    window.setTimeout(() => {
        resetArena();
        drawFood();
        moveSnake();
        drawSnake();
        renderScore();
        main();
    }, 200);
}

function handleKeydownEvent(event) {

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

function getRandomPosition(min, max)
{  
   return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}
 
function createFood() 
{  
   foodX = getRandomPosition(0, arena.width - 10);
   foodY = getRandomPosition(0, arena.height - 10);
   snake.forEach((part) => {
       if(part.x == foodX && part.y == foodY)
         createFood();
      });
}

function drawFood()
{
      ctx.fillStyle = fruitColor;
      ctx.strokestyle = fruitBorderColor;
      ctx.fillRect(foodX, foodY, 10, 10);
      ctx.strokeRect(foodX, foodY, 10, 10);
}

main();
createFood();

document.addEventListener("keydown", handleKeydownEvent); // Richtung ändern