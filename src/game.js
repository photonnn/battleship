import * as player from './player';
import * as game from './gameboard';
import {
  displayShipsBelowBoard, displayWinner, initialRender, render,
} from './dom';
import { audioExplosion, audioSplash, globalConsts } from './root';
import { createShip } from './ship';

function handleMove(event, Gameboard) {
  const coordinates = Gameboard.getCoordinates(event.target.id);
  const botBoard = document.querySelector('.botBoard .board');

  if (coordinates === false) {
    // Attack fails to go through, user didn't click on a block
    botBoard.removeEventListener('click', globalConsts.handleMove);
    botBoard.style.border = '';
    return false;
  }

  if (Gameboard.doesAttackHitAShip(coordinates)) {
    // Attack hits a ship
    Gameboard.receiveAttack(coordinates);
    audioExplosion();
  } else {
    // Attack misses a ship
    audioSplash();
  }
  render(Gameboard, 'bot');

  if (!Gameboard.doesBoardHaveShips()) {
    displayWinner(); // user wins
  }

  botBoard.style.border = '';
  botBoard.removeEventListener('click', globalConsts.handleMove);
  return true;
}

function botMove(currentPlayer, Gameboard) {
  const userBoard = document.querySelector('.userBoard .board');

  currentPlayer.makeAIMove(Gameboard);
  render(Gameboard, 'user');

  if (!Gameboard.doesBoardHaveShips()) {
    displayWinner(); // bot wins
  }
  userBoard.style.border = '';
  return true;
}

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
      resolve(handleMove(event, Gameboard));
    };

    if (currentPlayer.id === 'user') {
      botBoard.style.border = 'black solid 3px';
      botBoard.addEventListener('click', globalConsts.handleMove);
    } else if (currentPlayer.id === 'bot') {
      const userBoard = document.querySelector('.userBoard .board');
      userBoard.style.border = 'solid black 3px';
      setTimeout(() => {
        resolve(botMove(currentPlayer, Gameboard));
      }, 2000);
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

export function drop(event, userGameboard) {
  event.preventDefault(); // Prevent default behavior (e.g. open file in new tab)
  const shipLength = event.dataTransfer.getData('text/plain');

  const coordinates = userGameboard.getCoordinates(event.target.id);
  console.log(coordinates);
  if (coordinates !== false) {
    const direction = globalConsts.SHIP_DIRECTION;
    const newShip = createShip(shipLength);

    userGameboard.place(newShip, coordinates, direction);
    initialRender(userGameboard, 'user');
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function playGame() {
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

  /*
  RANDOM PLACEMENT
  const botShips = [];
  const userShips = [];

  // populate the board, for now do it randomly
  for (let n = 0; n < numberOfShips; n += 1) {
    const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
      + globalConsts.MINIMUM_SHIP_LENGTH;
    botShips.push(bot.makeAIPreMove(botGameboard, shipLength));
    userShips.push(user.makeAIPreMove(userGameboard, shipLength));
  }
  */

  // STATIC PLACEMENT
  const botShips = [];
  if (globalConsts.SHIP_PLACEMENT === 'manual') {
    for (let n = 0; n < numberOfShips; n += 1) {
      const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
        + globalConsts.MINIMUM_SHIP_LENGTH;
      botShips.push(bot.makeAIPreMove(botGameboard, shipLength));
    }
    const userShips = botShips; // We still want the user have the same ships as AI

    // Create and Display the ships
    displayShipsBelowBoard(user, userShips);
    displayShipsBelowBoard(bot, botShips);

    const userShipsElements = document.querySelectorAll('.userShips > *');

    const dropZone = document.querySelector('.userBoard .board');

    globalConsts.drop = (event) => drop(event, userGameboard);
    globalConsts.preventDefault = (event) => event.preventDefault();

    dropZone.addEventListener('drop', globalConsts.drop);

    dropZone.addEventListener('dragover', globalConsts.preventDefault);

    userShipsElements.forEach((ship) => {
      ship.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', `${ship.children.length}`);
      });
    });
  }
  globalConsts.userGameboard = userGameboard;

  // Initial Render
  initialRender(userGameboard, 'user');
  // initialRender(botGameboard, 'bot');

  // Start the game loop
  gameLoop(user, bot, userGameboard, botGameboard);
}
