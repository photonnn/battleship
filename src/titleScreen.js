import { playGame } from './game';
import { fillBoards, resetBoard } from './dom';
import { globalConsts } from './root';

document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playBtn');
  const exitButton = document.getElementById('exitBtn');
  const game = document.getElementById('game');
  const titleScreen = document.getElementById('titleScreen');

  playButton.addEventListener('click', () => {
    // hide the title screen and start the game
    game.style.display = 'grid';
    titleScreen.style.display = 'none';
  });

  exitButton.addEventListener('click', () => {
    // hide the game and go to title screen
    game.style.display = 'none';
    titleScreen.style.display = 'grid';

    // Reset the game
    globalConsts.GAME_OVER = true;
    resetBoard();
    fillBoards();
    playGame();
  });
});
