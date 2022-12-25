import { playGame } from './game';
import { fillBoards, resetBoard } from './dom';
import { globalConsts } from './root';

document.addEventListener('DOMContentLoaded', () => {
  // Buttons
  const playButton = document.getElementById('playBtn');
  const exitGameButton = document.getElementById('exitGameBtn');
  const exitOptionsButton = document.getElementById('exitOptionsBtn');
  const optionsButton = document.getElementById('optionsBtn');
  const applyOptionsButton = document.getElementById('applyOptionsBtn');

  // Sliders
  const sliders = document.querySelectorAll('.slider');

  // Other
  const cover = document.getElementById('cover');
  const options = document.getElementById('options');
  const game = document.getElementById('game');
  const titleScreen = document.getElementById('titleScreen');

  function startGame() {
    // hide the title screen and start the game
    game.style.display = 'grid';
    titleScreen.style.display = 'none';

    // start the game
    fillBoards();
    playGame();
  }

  function resetGame() {
    // Reset the game
    globalConsts.GAME_OVER = true;
    resetBoard();

    // Remove any event listeners that were added during the game
    const botBoard = document.querySelector('.botBoard .board');
    botBoard.removeEventListener('click', globalConsts.handleMove);

    fillBoards();
    playGame();
  }

  function exitGame() {
    // hide the game and go to title screen
    game.style.display = 'none';
    titleScreen.style.display = 'grid';

    // Reset game but don't start new one
    globalConsts.GAME_OVER = true;
    resetBoard();

    // Remove any event listeners that were added during the game
    const botBoard = document.querySelector('.botBoard .board');
    botBoard.removeEventListener('click', globalConsts.handleMove);
  }

  function showOptions() {
    // Show the cover and the options div
    cover.style.display = 'block';
    options.style.display = 'flex';
  }

  function hideOptions() {
    // Hide the cover and the options div
    cover.style.display = 'none';
    options.style.display = 'none';
  }

  function updateSliderSpan(event) {
    // Update the span to match the value of the slider
    const value = Number(event.target.value);
    const { id } = event.target;

    const sliderSpan = document.querySelector(`.${id}`);
    // Respective slider spans have the same class name as the id
    // of the slider
    sliderSpan.innerHTML = value;

    if (id === 'boardSlider') {
      globalConsts.BOARD_SIZE = value;
    } else if (id === 'shipSlider') {
      globalConsts.NUMBER_OF_SHIPS = value;
    } else if (id === 'soundSlider') {
      globalConsts.SOUND = value;
    }
  }

  function applyOptions() {
    // Exit options and restart the game
    hideOptions();
    resetGame();
  }

  playButton.addEventListener('click', startGame);
  exitGameButton.addEventListener('click', exitGame);
  optionsButton.addEventListener('click', showOptions);
  exitOptionsButton.addEventListener('click', hideOptions);
  applyOptionsButton.addEventListener('click', applyOptions);

  sliders.forEach((slider) => {
    slider.addEventListener('input', updateSliderSpan);
  });
});
