import * as player from './player';
import * as game from './gameboard';
import {
  displayShipsBelowBoard, displayWinner, initialRender, render,
} from './dom';
import { globalConsts } from './root';

async function takeTurn(currentPlayer, Gameboard) {
  /*
    A turn function, that is part of the game loop. Returns a promise so the chaining
    results in a continous exchange between the user and the bot, until the condition
    for an end is met.

    Args:
    currentPlayer -> Object -> Player Factory fn
    Gameboard -> Object -> Gameboard Factory fn

  */
  return new Promise((resolve, reject) => {
    const botBoard = document.querySelector('.botBoard .board');
    // let timeout;

    globalConsts.handleMove = (event) => {
      const coordinates = Gameboard.getCoordinates(event.target.id);
      if (coordinates !== false) { // coordinates are legal
        const res = Gameboard.doesAttackHitAShip(coordinates);
        if (res) {
          // Attacks was successful
          Gameboard.receiveAttack(coordinates);
        }
        render(Gameboard, 'bot');

        if (!Gameboard.doesBoardHaveShips()) {
          displayWinner(); // user wins
        }

        botBoard.removeEventListener('click', globalConsts.handleMove);
        // clearTimeout(timeout);
        resolve();
      } else {
        // when attack isn't legal try again
        console.log('ILLEGAL ATTACK');
        takeTurn(currentPlayer, Gameboard);
      }
    };

    if (currentPlayer.id === 'user') {
      botBoard.addEventListener('click', globalConsts.handleMove);
      // timeout = setTimeout(() => {
      //  botBoard.removeEventListener('click', handleMove);
      //  resolve();
      // }, 100000);
    } else if (currentPlayer.id === 'bot') {
      currentPlayer.makeAIMove(Gameboard);
      render(Gameboard, 'user');

      if (!Gameboard.doesBoardHaveShips()) {
        displayWinner(); // bot wins
      }
      resolve();
    } else {
      reject(Error('Invalid player'));
    }
  });
}

async function gameLoop(user, bot, userGameboard, botGameboard) {
  if (!globalConsts.GAME_OVER) {
    await takeTurn(user, botGameboard)
      .then(() => takeTurn(bot, userGameboard))
      .then(() => gameLoop(user, bot, userGameboard, botGameboard))
      .catch((error) => console.error(error));
  }
  console.log('over');
}

// eslint-disable-next-line import/prefer-default-export
export function playGame() {
  /* Main loop function for the game between a player and a bot */
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
    botShips.push(bot.makeAIPreMove(botGameboard));
    userShips.push(user.makeAIPreMove(userGameboard));
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

/* Old game loop
export function gameLoop() {
  /* Main loop function for the game between a bot and a bot
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
  renderShips(user, botGameboard.board);
  renderShips(bot, userGameboard.board);
  // Game end we clean up
  userGameboard.resetBoard();
  botGameboard.resetBoard();
} */
