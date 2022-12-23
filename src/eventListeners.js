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

  // Other
  const cover = document.getElementById('cover');
  const options = document.getElementById('options');
  const game = document.getElementById('game');
  const titleScreen = document.getElementById('titleScreen');

  // Sliders
  const sliders = document.querySelectorAll('.slider');

  function startGame() {
    // hide the title screen and start the game
    game.style.display = 'grid';
    titleScreen.style.display = 'none';
  }

  function resetGame() {
    // Reset the game
    globalConsts.GAME_OVER = true;
    resetBoard();
    fillBoards();
    playGame();
  }

  function exitGame() {
    // hide the game and go to title screen
    game.style.display = 'none';
    titleScreen.style.display = 'grid';

    resetGame();
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

  playButton.addEventListener('click', startGame);
  exitGameButton.addEventListener('click', exitGame);
  optionsButton.addEventListener('click', showOptions);
  exitOptionsButton.addEventListener('click', hideOptions);
  applyOptionsButton.addEventListener('click', () => {
    // Exit options and restart the game
    hideOptions();
    resetGame();
  });

  sliders.forEach((slider) => {
    slider.addEventListener('input', updateSliderSpan);
  });
});
