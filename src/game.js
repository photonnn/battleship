import * as player from './player';
import * as game from './gameboard';

// eslint-disable-next-line import/prefer-default-export
export function gameLoop() {
  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = 20;

  const userGameboard = game.createGameboard(boardSize, boardSize);
  const botGameboard = game.createGameboard(boardSize, boardSize);

  let keepRunning = true;
  // populate the board, for now statically
  for (let n = 0; n < 10; n += 1) {
    user.makeAIPreMove(botGameboard);
    bot.makeAIPreMove(userGameboard);
  }

  let i = 0;

  while (keepRunning && i < 10000) {
    // players take turns making moves
    user.makeAIMove(botGameboard);

    if (!botGameboard.doesBoardHaveShips()) {
      console.log('User wins!');
      keepRunning = false;
    }

    bot.makeAIMove(userGameboard);

    if (!userGameboard.doesBoardHaveShips()) {
      console.log('Bot wins');
      keepRunning = false;
    }

    i += 1;
  }
  // Game end we clean up
  userGameboard.resetBoard();
  botGameboard.resetBoard();
  console.log(i);
}
