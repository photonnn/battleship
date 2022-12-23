import { playGame } from './game';
import { fillBoards, resetBoard } from './dom';
import { globalConsts } from './root';

document.addEventListener('DOMContentLoaded', () => {
  // Buttons
  const playButton = document.getElementById('playBtn');
  const exitGameButton = document.getElementById('exitGameBtn');
  const exitOptionsButton = document.getElementById('exitOptionsBtn');
  const optionsButton = document.getElementById('optionsBtn');

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

  function exitGame() {
    // hide the game and go to title screen
    game.style.display = 'none';
    titleScreen.style.display = 'grid';

    // Reset the game
    globalConsts.GAME_OVER = true;
    resetBoard();
    fillBoards();
    playGame();
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
    const { value } = event.target;

    const sliderSpan = document.querySelector(`.${event.target.id}`);
    // Respective slider spans have the same class name as the id
    // of the slider
    sliderSpan.innerHTML = value;
  }

  playButton.addEventListener('click', startGame);
  exitGameButton.addEventListener('click', exitGame);
  optionsButton.addEventListener('click', showOptions);
  exitOptionsButton.addEventListener('click', hideOptions);

  sliders.forEach((slider) => {
    slider.addEventListener('input', updateSliderSpan);
  });
});
