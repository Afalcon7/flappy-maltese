const maltese = document.getElementById('maltese');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');

let isJumping = false;
let score = 0;

// Movimiento del bichón maltés
function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpHeight = 0;
  const jumpInterval = setInterval(() => {
    if (jumpHeight >= 100) {
      clearInterval(jumpInterval);
      fall();
    } else {
      jumpHeight += 5;
      maltese.style.bottom = `${parseInt(maltese.style.bottom) + 5}px`;
    }
  }, 20);
}

function fall() {
  let fallInterval = setInterval(() => {
    if (parseInt(maltese.style.bottom) <= 0) {
      clearInterval(fallInterval);
      isJumping = false;
    } else {
      maltese.style.bottom = `${parseInt(maltese.style.bottom) - 5}px`;
    }
  }, 20);
}

// Crear arañas enemigas
function createSpider() {
  const spider = document.createElement('div');
  spider.classList.add('spider');
  spider.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
  gameContainer.appendChild(spider);

  const moveSpider = setInterval(() => {
    const spiderLeft = parseInt(window.getComputedStyle(spider).getPropertyValue('left'));
    if (spiderLeft <= -50) {
      clearInterval(moveSpider);
      gameContainer.removeChild(spider);
      score++;
      scoreDisplay.innerText = `Puntuación: ${score}`;
    }

    const malteseBottom = parseInt(window.getComputedStyle(maltese).getPropertyValue('bottom'));
    const malteseLeft = parseInt(window.getComputedStyle(maltese).getPropertyValue('left'));

    if (
      spiderLeft < malteseLeft + 50 &&
      spiderLeft + 50 > malteseLeft &&
      parseInt(spider.style.top) < malteseBottom + 50 &&
      parseInt(spider.style.top) + 50 > malteseBottom
    ) {
      alert('¡Has sido atrapado por una araña! Puntuación final: ' + score);
      location.reload();
    }
  }, 20);

  setTimeout(createSpider, 3000);
}

// Iniciar el juego
document.addEventListener('keydown', jump);
createSpider();
