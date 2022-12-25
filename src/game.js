import * as player from './player';
import * as game from './gameboard';
import {
  displayShipsBelowBoard, displayWinner, initialRender, render,
} from './dom';
import { globalConsts } from './root';

async function takeTurn(currentPlayer, Gameboard) {
  /*
  A turn function that is part of the game loop, in an alternating turn-based system.

  Args:
  currentPlayer -> Object representing the current player (user/bot)
  Gameboard -> Object representing the currentPlayer gameboard
  */
  return new Promise((resolve, reject) => {
    const botBoard = document.querySelector('.botBoard .board');

    globalConsts.handleMove = (event) => {
      const coordinates = Gameboard.getCoordinates(event.target.id);

      if (coordinates !== false) { // coordinates are legal
        const res = Gameboard.doesAttackHitAShip(coordinates);

        if (res) { // Attack hits a ship
          Gameboard.receiveAttack(coordinates);
        }
        render(Gameboard, 'bot');

        if (!Gameboard.doesBoardHaveShips()) {
          displayWinner(); // user wins
        }

        botBoard.removeEventListener('click', globalConsts.handleMove);
        resolve(true);
      } else {
        // Attack fails to go through, user didn't click on a block
        botBoard.removeEventListener('click', globalConsts.handleMove);
        resolve(false);
      }
    };

    if (currentPlayer.id === 'user') {
      botBoard.addEventListener('click', globalConsts.handleMove);
    } else if (currentPlayer.id === 'bot') {
      currentPlayer.makeAIMove(Gameboard);
      render(Gameboard, 'user');

      if (!Gameboard.doesBoardHaveShips()) {
        displayWinner(); // bot wins
      }
      resolve(true);
    } else {
      reject(Error('Invalid player'));
    }
  });
}

async function gameLoop(user, bot, userGameboard, botGameboard) {
  /*
  Is the main game loop for a turn-based game between a player and a bot.
  As an async function, it awaits a promise that is resolved/rejected based
  upon the outcome of the takeTurn function.

  Args:
  user -> Object representing a player
  bot -> Object representing a bot
  userGameboard -> Object representing the player gameboard
  botGameboard -> Object representing the bot gameboard
  */

  let currentPlayer = user;
  let userMoveSucceeded = true; // We utilise a flag instead of continue statement
  while (!globalConsts.GAME_OVER) {
    if (userMoveSucceeded) {
      // eslint-disable-next-line no-await-in-loop
      const moveResult = await takeTurn(currentPlayer, currentPlayer === user
        ? botGameboard : userGameboard);
      userMoveSucceeded = moveResult;

      if (currentPlayer === user) {
        currentPlayer = bot;
      } else {
        currentPlayer = user;
      }
    } else {
      userMoveSucceeded = true;
    }
  }
}

// eslint-disable-next-line import/prefer-default-export
export function playGame() {
  /*
  Main entry point, it sets up the game, populates the board and
  renders the ships on the page. At the end it calls a gameLoop
  function that starts the game.
  */

  globalConsts.GAME_OVER = false;

  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = globalConsts.BOARD_SIZE;
  const numberOfShips = globalConsts.NUMBER_OF_SHIPS;

  const root = document.querySelector(':root');
  root.style.setProperty('--boardSize', `${globalConsts.BOARD_SIZE}`);

  const userGameboard = game.createGameboard(boardSize, boardSize);
  const botGameboard = game.createGameboard(boardSize, boardSize);

  const userShips = [];
  const botShips = [];

  // populate the board, for now do it randomly
  for (let n = 0; n < numberOfShips; n += 1) {
    const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
      + globalConsts.MINIMUM_SHIP_LENGTH;
    botShips.push(bot.makeAIPreMove(botGameboard, shipLength));
    userShips.push(user.makeAIPreMove(userGameboard, shipLength));
  }

  // Display the ships
  displayShipsBelowBoard(user, userShips);
  displayShipsBelowBoard(bot, botShips);

  // Initial Render
  initialRender(userGameboard, 'user');
  initialRender(botGameboard, 'bot');

  // Start the game loop
  gameLoop(user, bot, userGameboard, botGameboard);
}
