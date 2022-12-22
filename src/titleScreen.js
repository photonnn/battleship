import { playGame } from './game';
import { fillBoards, resetBoard } from './dom';
import { globalConsts } from './root';

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playBtn');
  const exitGameButton = document.getElementById('exitGameBtn');
  const exitOptionsButton = document.getElementById('exitOptionsBtn');
  const optionsButton = document.getElementById('optionsBtn');

  const cover = document.getElementById('cover');
  const options = document.getElementById('options');
  const game = document.getElementById('game');
  const titleScreen = document.getElementById('titleScreen');

  playButton.addEventListener('click', () => {
    // hide the title screen and start the game
    game.style.display = 'grid';
    titleScreen.style.display = 'none';
  });

  exitGameButton.addEventListener('click', () => {
    // hide the game and go to title screen
    game.style.display = 'none';
    titleScreen.style.display = 'grid';

    // Reset the game
    globalConsts.GAME_OVER = true;
    resetBoard();
    fillBoards();
    playGame();
  });

  optionsButton.addEventListener('click', () => {
    // Show the cover and the options div
    cover.style.display = 'block';
    options.style.display = 'flex';
  });

  exitOptionsButton.addEventListener('click', () => {
    // Hide the cover and the options div
    cover.style.display = 'none';
    options.style.display = 'none';
  });
});
