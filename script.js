const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const loadingScreen = document.getElementById('loading-screen');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const restartButton = document.getElementById('restart-button');

const tileSize = 25;
let map = [];
let level = 1;
const levels = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
];

let pacman = {
    x: tileSize + tileSize / 2,
    y: tileSize + tileSize / 2,
    size: tileSize / 2,
    dx: tileSize,
    dy: 0
};

let ghost = {
    x: 18 * tileSize + tileSize / 2,
    y: 8 * tileSize + tileSize / 2,
    size: tileSize / 2,
    speed: 2
};

let questions = [
    { question: "¿Cuánto es 7 + 5?", answer: "12" },
    { question: "¿Cuánto es 9 x 3?", answer: "27" },
    { question: "¿Cuánto es 15 / 3?", answer: "5" },
    { question: "¿Cuánto es 8 - 2?", answer: "6" },
];

let currentQuestion = 0;

function drawMap() {
    for (let row = 0; row < map.length; row++) {
        for (let col = 0; col < map[row].length; col++) {
            if (map[row][col] === 1) {
                ctx.fillStyle = 'blue';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawPacman() {
    ctx.beginPath();
    ctx.arc(pacman.x, pacman.y, pacman.size, 0.2 * Math.PI, 1.8 * Math.PI);
    ctx.lineTo(pacman.x, pacman.y);
    ctx.fillStyle = 'yellow';
    ctx.fill();
    ctx.closePath();
}

function drawGhost() {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghost.size, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}

function movePacman() {
    let newX = pacman.x + pacman.dx;
    let newY = pacman.y + pacman.dy;

    if (!checkCollision(newX, newY)) {
        pacman.x = newX;
        pacman.y = newY;
    }
}

function checkCollision(x, y) {
    let col = Math.floor(x / tileSize);
    let row = Math.floor(y / tileSize);

    return map[row][col] === 1;
}

function moveGhost() {
    let dx = pacman.x - ghost.x;
    let dy = pacman.y - ghost.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    ghost.x += (dx / distance) * ghost.speed;
    ghost.y += (dy / distance) * ghost.speed;
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPacman();
    drawGhost();
    movePacman();
    moveGhost();

    requestAnimationFrame(update);
}

function askQuestion() {
    questionElement.textContent = questions[currentQuestion].question;
}

function startGame() {
    loadingScreen.classList.add('hidden');
    startScreen.classList.add('hidden');
    gameContainer.classList.remove('hidden');
    restartButton.classList.add('hidden');
    currentQuestion = 0;
    map = levels[level - 1];
    askQuestion();
    update();
}

function restartGame() {
    pacman.x = tileSize + tileSize / 2;
    pacman.y = tileSize + tileSize / 2;
    pacman.dx = tileSize;
    pacman.dy = 0;
    ghost.x = 18 * tileSize + tileSize / 2;
    ghost.y = 8 * tileSize + tileSize / 2;
    ghost.speed = 2;
    startGame();
}

submitButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim();
    if (userAnswer === questions[currentQuestion].answer) {
        alert('¡Correcto!');
        currentQuestion++;
        if (currentQuestion < questions.length) {
            askQuestion();
        } else {
            alert('¡Has respondido todas las preguntas correctamente!');
            level++;
            if (level <= levels.length) {
                startGame();
            } else {
                alert('¡Has completado todos los niveles!');
                restartButton.classList.remove('hidden');
            }
        }
    } else {
        alert('Incorrecto, intenta de nuevo.');
    }
    answerInput.value = '';
});

startButton.addEventListener('click', () => {
    setTimeout(startGame, 2000);
    loadingScreen.classList.remove('hidden');
    startScreen.classList.add('hidden');
});

restartButton.addEventListener('click', restartGame);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            pacman.dx = 0;
            pacman.dy = -tileSize;
            break;
        case 'ArrowDown':
            pacman.dx = 0;
            pacman.dy = tileSize;
            break;
        case 'ArrowLeft':
            pacman.dx = -tileSize;
            pacman.dy = 0;
            break;
        case 'ArrowRight':
            pacman.dx = tileSize;
            pacman.dy = 0;
            break;
    }
});

loadingScreen.classList.remove('hidden');
startScreen.classList.add('hidden');
gameContainer.classList.add('hidden');
restartButton.classList.add('hidden');

window.onload = () => {
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }, 3000);
};
