import * as player from './player';
import * as game from './gameboard';
import { displayShips, displayWinner, render } from './dom';
import { globalConsts } from './root';

/*
async function takeTurn(currentPlayer, Gameboard) {
  /*
    Args:
    currentPlayer -> Object -> Player factory fn, either user or bot
    Gameboard -> Object -> Gameboard factory fn, either botGameboard or userGameboard

  return new Promise((resolve, reject) => {
    let timeout;
    if (currentPlayer.id === 'user') {
      // get user move
      const botBoard = document.querySelector('.botBoard .board');
      botBoard.addEventListener('click', (event) => {
        const move = event.target.id;
        const numbers = move.split('_').slice(-2);
        const coordinates = {
          y: numbers[0],
          x: numbers[1],
        };
        currentPlayer.makeMove(Gameboard, coordinates);
        render(Gameboard, 'user');
        if (!Gameboard.doesBoardHaveShips()) {
          displayWinner('User wins');
        }

        // clear timeout
        clearTimeout(timeout);

        // update game state
        resolve(move);
      });

      // set timeout to resolve the Promise after 10 seconds
      timeout = setTimeout(() => {
        resolve();
      }, 1000000);
    } else if (currentPlayer.id === 'bot') {
      // get the bot's move
      currentPlayer.makeAIMove(Gameboard);
      render(Gameboard, 'bot');
      if (!Gameboard.doesBoardHaveShips()) {
        displayWinner('Bot wins');
      }
      // update te game state
      resolve();
    } else {
      reject(Error('Invalid player'));
    }
  });
} */

async function takeTurn(currentPlayer, Gameboard) {
  /*
    A turn function, that is part of the game loop. Returns a promise so the chaining
    results in a continous exchange between the user and the bot, until the condition
    for an end are met.

    Args:
    currentPlayer -> Object -> Player Factory fn
    Gameboard -> Object -> Gameboard Factory fn

  */
  return new Promise((resolve, reject) => {
    const botBoard = document.querySelector('.botBoard .board');
    let timeout;

    const handleMove = (event) => {
      const move = event.target.id;
      console.log('You clicked on', move); // Check here if move is legal!!!! instead of below!!!
      const numbers = move.split('_').slice(-2); // Extract numbers from ex: bot_id_5_5
      const coordinates = {
        y: numbers[0],
        x: numbers[1],
      };
      const valid = currentPlayer.makeMove(Gameboard, coordinates);
      if (valid) { // when attack is legal
        render(Gameboard, 'user');
        if (!Gameboard.doesBoardHaveShips()) {
          displayWinner('User wins');
        }
        botBoard.removeEventListener('click', handleMove);
        clearTimeout(timeout);
        resolve(move);
      } else { // when attack isn't legal
        takeTurn(currentPlayer, Gameboard);
      }
    };

    if (currentPlayer.id === 'user') {
      botBoard.addEventListener('click', handleMove);
      timeout = setTimeout(() => {
        botBoard.removeEventListener('click', handleMove);
        resolve();
      }, 10000);
    } else if (currentPlayer.id === 'bot') {
      currentPlayer.makeAIMove(Gameboard);
      render(Gameboard, 'bot');
      if (!Gameboard.doesBoardHaveShips()) {
        displayWinner('Bot wins');
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
}

// eslint-disable-next-line import/prefer-default-export
export function playGame() {
  /* Main loop function for the game between a player and a bot */
  globalConsts.GAME_OVER = false;

  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = globalConsts.BOARD_SIZE;
  const numberOfShips = globalConsts.NUMBER_OF_SHIPS;

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
  displayShips(user, userShips);
  displayShips(bot, botShips);

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
