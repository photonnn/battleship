import * as player from './player';
import * as game from './gameboard';

// eslint-disable-next-line import/prefer-default-export
export function gameLoop() {
  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = 20;

  const userBoard = game.createGameboard(boardSize, boardSize);
  const botBoard = game.createGameboard(boardSize, boardSize);

  let keepRunning = true;
  // populate the board, for now statically
  for (let n = 0; n < 10; n += 1) {
    user.makeAIPreMove(botBoard);
    bot.makeAIPreMove(userBoard);
  }

  let i = 0;

  while (keepRunning && i < 1000) {
    // players take turns making moves
    user.makeAIMove(botBoard);

    if (!botBoard.doesBoardHaveShips()) {
      console.log('User wins!');
      keepRunning = false;
    }

    bot.makeAIMove(userBoard);

    if (!userBoard.doesBoardHaveShips()) {
      console.log('Bot wins');
      keepRunning = false;
    }

    i += 1;
  }
  // Game end we clean up
  userBoard.resetBoard();
  botBoard.resetBoard();
  console.log(i);
}
