import * as player from './player';
import * as game from './gameboard';
import * as ship from './ship';

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
  user.placeAIShip(botBoard, playerShipOne);

  const botShipOne = ship.createShip(3);
  bot.placeAIShip(userBoard, botShipOne);

  let i = 0;
  while (keepRunning && i < 1000) {
    // players take turns making moves
    const userMoveCoordinates = user.makeRandomAIAttack(botBoard);
    botBoard.receiveAttack(userMoveCoordinates);
    user.attemptedAttacks.push(userMoveCoordinates);

    if (!botBoard.doesBoardHaveShips()) {
      console.log('User wins!');
      keepRunning = false;
    }

    const botMoveCoordinates = bot.makeRandomAIAttack(userBoard);
    userBoard.receiveAttack(botMoveCoordinates);
    bot.attemptedAttacks.push(botMoveCoordinates);

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
