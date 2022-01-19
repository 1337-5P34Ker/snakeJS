// Hole Instanz des canvas
const arena = document.getElementById("arena");
// als 2D-Element
const ctx = arena.getContext("2d");

/* Settings */
const snakeColor = '#98CD8D';
const snakeBorderColor = '#990000';
const arenaColor = 'beige';
// delta horizontal pro Schritt
let dx = 10;
// delta vertikal pro Schritt
let dy = 0;

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

// Bewegung (rechts)
function moveSnake() {
    // head ist das neue erste Element des Arrays 
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y
    };
    snake.unshift(head); // head ansetzen
    snake.pop(); // letztes Element aus Array löschen
}

function resetArena() {
    ctx.fillStyle = arenaColor;
    ctx.fillRect(0, 0, arena.width, arena.height);
}

function main() {
    window.setTimeout(() => {
        resetArena();
        moveSnake();
        drawSnake();
        main();
    }, 500);

}
main();