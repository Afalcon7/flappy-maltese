const maltese = document.getElementById('maltese');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let isJumping = false;
let score = 0;
let gameStarted = false;
let gravity = 3;

// Función para iniciar el juego
function startGame() {
  gameStarted = true;
  startBtn.style.display = 'none';
  scoreDisplay.style.display = 'block';
  maltese.style.bottom = '100px';
  document.addEventListener('keydown', jump);
  createSpider();
}

// Movimiento del bichón maltés
function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpCount = 0;
  const jumpInterval = setInterval(() => {
    if (jumpCount > 15) {
      clearInterval(jumpInterval);
      isJumping = false;
      fall();
    } else {
      jumpCount++;
      let currentBottom = parseInt(window.getComputedStyle(maltese).getPropertyValue('bottom'));
      maltese.style.bottom = `${currentBottom + 5}px`;
    }
  }, 20);
}

function fall() {
  let fallInterval = setInterval(() => {
    let currentBottom = parseInt(window.getComputedStyle(maltese).getPropertyValue('bottom'));
    if (currentBottom <= 0) {
      clearInterval(fallInterval);
      isJumping = false;
    } else {
      maltese.style.bottom = `${currentBottom - gravity}px`;
    }
  }, 20);
}

// Crear arañas enemigas
function createSpider() {
  if (!gameStarted) return;

  const spider = document.createElement('div');
  spider.classList.add('spider');
  spider.style.top = `${Math.random() * (gameContainer.clientHeight - 50)}px`;
  spider.style.left = '100vw';
  gameContainer.appendChild(spider);

  const moveSpider = setInterval(() => {
    let spiderLeft = parseInt(window.getComputedStyle(spider).getPropertyValue('left'));
    if (spiderLeft <= -50) {
      clearInterval(moveSpider);
      gameContainer.removeChild(spider);
      score++;
      scoreDisplay.innerText = `Puntuación: ${score}`;
    } else {
      spider.style.left = `${spiderLeft - 5}px`;
    }

    let spiderTop = parseInt(spider.style.top);
    let malteseBottom = parseInt(window.getComputedStyle(maltese).getPropertyValue('bottom'));
    let malteseLeft = parseInt(window.getComputedStyle(maltese).getPropertyValue('left'));

    if (
      spiderLeft < malteseLeft + 50 &&
      spiderLeft + 50 > malteseLeft &&
      spiderTop < malteseBottom + 50 &&
      spiderTop + 50 > malteseBottom
    ) {
      alert(`¡Has sido atrapado! Puntuación final: ${score}`);
      location.reload();
    }
  }, 20);

  setTimeout(createSpider, 2000);
}

// Evento de inicio del juego
startBtn.addEventListener('click', startGame);
