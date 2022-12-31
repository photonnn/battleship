import * as player from './player';
import * as game from './gameboard';
import {
  displayWinner, initialRender, render,
} from './dom';
import { audioExplosion, audioSplash, globalConsts } from './root';
import { randomPlacement, manualPlacement } from './placement';

function handleUserMove(event, Gameboard) {
  /*

  */
  const coordinates = Gameboard.getCoordinates(event.target.id);
  const botBoard = document.querySelector('.botBoard .board');

  if (coordinates === false) {
    // Attack fails to go through, user didn't click on a block
    botBoard.removeEventListener('click', globalConsts.handleUserMove);
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
  botBoard.removeEventListener('click', globalConsts.handleUserMove);
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

    globalConsts.handleUserMove = (event) => {
      resolve(handleUserMove(event, Gameboard));
    };

    if (currentPlayer.id === 'user') {
      botBoard.style.border = 'black solid 3px';
      botBoard.addEventListener('click', globalConsts.handleUserMove);
    } else if (currentPlayer.id === 'bot') {
      const userBoard = document.querySelector('.userBoard .board');
      userBoard.style.border = 'solid black 3px';
      setTimeout(() => {
        resolve(currentPlayer.botMove(Gameboard));
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

  const root = document.querySelector(':root');
  root.style.setProperty('--boardSize', `${globalConsts.BOARD_SIZE}`);

  const userGameboard = game.createGameboard(boardSize, boardSize);
  const botGameboard = game.createGameboard(boardSize, boardSize);

  const botShips = [];
  const userShips = [];
  if (globalConsts.SHIP_PLACEMENT === 'manual') {
    manualPlacement(user, bot, botShips, userGameboard, botGameboard);
  } else {
    randomPlacement(user, bot, userShips, botShips, userGameboard, botGameboard);
  }
  globalConsts.userGameboard = userGameboard;

  // Initial Render
  initialRender(userGameboard, 'user');
  // initialRender(botGameboard, 'bot');

  // Start the game loop
  gameLoop(user, bot, userGameboard, botGameboard);
}
