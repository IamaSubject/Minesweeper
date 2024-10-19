document.addEventListener('DOMContentLoaded', () => {
  let bombCount, bombLocations = [];
  const bombInputGrid = document.getElementById('bomb-input-grid');
  const grid = document.getElementById('grid');
  const bombCountInput = document.getElementById('bomb-count');
  const confirmBombCountBtn = document.getElementById('confirm-bomb-count');
  const readyBtn = document.getElementById('ready');
  const resetBtn = document.getElementById('reset');
  const gameSetup = document.getElementById('game-setup');
  const gameContainer = document.getElementById('game-container');

  const createGrid = (container, isBombPlacement = false) => {
    container.innerHTML = '';
    for (let i = 1; i <= 46; i++) {
      const box = document.createElement('div');
      box.classList.add('grid-box');
      box.textContent = i;
      if (isBombPlacement) {
        box.addEventListener('click', () => {
          toggleBomb(i, box);
        });
      } else {
        box.addEventListener('click', () => revealBox(i, box));
      }
      container.appendChild(box);
    }
  };

  const toggleBomb = (number, box) => {
    if (bombLocations.includes(number)) {
      bombLocations = bombLocations.filter(loc => loc !== number);
      box.classList.remove('bomb');
    } else if (bombLocations.length < bombCount) {
      bombLocations.push(number);
      box.classList.add('bomb');
    }
  };

  const revealBox = (number, box) => {
    if (bombLocations.includes(number)) {
      // If it's a bomb, make it red and show the bomb icon
      box.classList.add('bomb');
      box.textContent = '💣';
    } else {
      // If it's safe (not a bomb), make it green
      box.classList.add('safe');
      box.style.backgroundColor = 'green';  // Turn the box green
      box.textContent = number;  // Optionally, show the number
    }
  };

  confirmBombCountBtn.addEventListener('click', () => {
    bombCount = parseInt(bombCountInput.value);
    if (bombCount > 0 && bombCount <= 46) {
      document.getElementById('bomb-placement').style.display = 'block';
      createGrid(bombInputGrid, true);
    }
  });

  readyBtn.addEventListener('click', () => {
    if (bombLocations.length === bombCount) {
      gameSetup.style.display = 'none';
      gameContainer.style.display = 'block';
      createGrid(grid);
    } else {
      alert('Please select the correct number of bombs!');
    }
  });

  resetBtn.addEventListener('click', () => {
    gameSetup.style.display = 'block';
    gameContainer.style.display = 'none';
    bombLocations = [];
    bombCountInput.value = '';
    bombInputGrid.innerHTML = '';
    grid.innerHTML = '';
  });
});
