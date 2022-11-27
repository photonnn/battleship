import * as player from './player';
import * as game from './gameboard';
import * as ship from './ship';
import { globalConsts } from './root';

// eslint-disable-next-line import/prefer-default-export
export function gameLoop() {
  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = 40;

  const userBoard = game.createGameboard(boardSize, boardSize);
  const botBoard = game.createGameboard(boardSize, boardSize);

  let keepRunning = true;
  // populate the board, for now statically
  const playerShipOne = ship.createShip(3);
  userBoard.place(playerShipOne, { x: 25, y: 35 }, globalConsts.SHIP_DIRECTION);
  user.placeAIShip(botBoard, playerShipOne);

  const botShipOne = ship.createShip(3);
  botBoard.place(botShipOne, { x: 0, y: 0 }, 'x');
  bot.placeAIShip(userBoard, botShipOne);

  while (keepRunning) {
    // players take turns making moves
    if (!userBoard.doesBoardHaveShips) {
      console.log('Bot wins');
      keepRunning = false;
    } else if (!botBoard.doesBoardHaveShips) {
      console.log('User wins!');
      keepRunning = false;
    }
  }
}
