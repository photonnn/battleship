document.addEventListener('DOMContentLoaded', () => {
  const playButton = document.getElementById('playButton');
  const game = document.getElementById('game');
  const titleScreen = document.getElementById('titleScreen');

  playButton.addEventListener('click', () => {
    // hide the title screen and start the game
    game.style.display = 'grid';
    titleScreen.style.display = 'none';
  });
});
