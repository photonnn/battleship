import { playGame } from './game';
import { fillBoards, resetBoard } from './dom';
import { globalConsts } from './root';

function removeEventListeners() {
  const botBoard = document.querySelector('.botBoard .board');

  botBoard.removeEventListener('click', globalConsts.handleUserMove);

  if (globalConsts.SHIP_PLACEMENT === 'manual') {
    const dropZone = document.querySelector('.userBoard .board');

    dropZone.removeEventListener('drop', globalConsts.drop);
    dropZone.removeEventListener('dragover', globalConsts.preventDefault);
    dropZone.removeEventListener('dragenter', globalConsts.highlightBlocks);
    window.removeEventListener('dragenter', globalConsts.removeHighlights);
  }
}

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

  function restartGame() {
    // Reset the game
    globalConsts.GAME_OVER = true;
    removeEventListeners();
    resetBoard();

    fillBoards();
    playGame();
  }

  function exitGame() {
    // hide the game and go to title screen
    game.style.display = 'none';
    titleScreen.style.display = 'grid';

    // Reset game but don't start new one
    globalConsts.GAME_OVER = true;
    removeEventListeners();
    resetBoard();
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
      globalConsts.SOUND = value / 100;
    }
  }

  function applyOptions() {
    // Exit options and restart the game
    hideOptions();
    restartGame();
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
