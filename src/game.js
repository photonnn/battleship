import * as player from './player';
import * as game from './gameboard';
import { displayShips, displayWinner } from './dom';

// eslint-disable-next-line import/prefer-default-export
export function gameLoop() {
  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = 20;

  const userGameboard = game.createGameboard(boardSize, boardSize);
  const botGameboard = game.createGameboard(boardSize, boardSize);

  let keepRunning = true;
  const userShips = [];
  const botShips = [];

  // populate the board
  for (let n = 0; n < 10; n += 1) {
    userShips.push(user.makeAIPreMove(botGameboard));
    botShips.push(bot.makeAIPreMove(userGameboard));
  }

  // DISPLAY THE SHIPS HERE
  displayShips(user, userShips);
  displayShips(bot, botShips);

  let i = 0; // move counter

  while (keepRunning && i < 10000) {
    // players take turns making moves
    user.makeAIMove(botGameboard);

    if (!botGameboard.doesBoardHaveShips()) {
      displayWinner('User wins!');
      keepRunning = false;
    }

    bot.makeAIMove(userGameboard);

    if (!userGameboard.doesBoardHaveShips()) {
      displayWinner('Bot wins');
      keepRunning = false;
    }

    i += 1;
  }
  // Game end we clean up
  userGameboard.resetBoard();
  botGameboard.resetBoard();
}
