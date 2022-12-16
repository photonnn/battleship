import * as player from './player';
import * as game from './gameboard';
import { displayShips, displayWinner, renderShips } from './dom';

function postClick(user, botGameboard, coordinates) {
  user.makeMove(botGameboard, coordinates);

  if (!botGameboard.doesBoardHaveShips()) {
    displayWinner('User wins!');
  }

  renderShips(user, botGameboard.board);
}

function addListenersToBlocks(user, botGameboard) {
  /* Adds the event listeners so the user can proceed to interact

    Args:
    botBoard -> 2D Array
    player -> Object -> Player factory fn
  */
  for (let i = 0; i < botGameboard.board.length; i += 1) {
    for (let j = 0; j < botGameboard.board[i].length; j += 1) {
      const block = document.getElementById(`bot_id_${i}_${j}`);
      block.addEventListener('click', () => postClick({ x: j, y: i }, user, bot, userGameboard, botGameboard));
    }
  }
}

async function takeTurn(currentPlayer, Gameboard) {
  /* 
    Args:
    currentPlayer -> Object -> Player factory fn, either user or bot
    Gameboard -> Object -> Gameboard factory fn, either botGameboard or userGameboard
  */
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

        // clear timeout
        clearTimeout(timeout);

        // update game state
        resolve(move);
      });

      // set timeout to resolve the Promise after 10 seconds
      timeout = setTimeout(() => {
        resolve();
      }, 10000);
    } else if (currentPlayer.id === 'bot') {
      // get the bot's move
      currentPlayer.makeAIMove(Gameboard);
      console.log('AI MADE A MOVE');
      // update te game state
      resolve();
    } else {
      reject(Error('Invalid player'));
    }
  });
}

async function playGame(user, bot, userGameboard, botGameboard) {
  await takeTurn(user, botGameboard)
    .then(() => takeTurn(bot, userGameboard))
    .then(() => playGame(user, bot, userGameboard, botGameboard))
    .catch((error) => console.error(error));
}

export function realGameLoop() {
  /* Main loop function for the game between a player and a bot */
  const user = player.createPlayer('user');
  const bot = player.createPlayer('bot');

  const boardSize = 20;
  const numberOfShips = 10;

  const userGameboard = game.createGameboard(boardSize, boardSize);
  const botGameboard = game.createGameboard(boardSize, boardSize);

  const userShips = [];
  const botShips = [];

  // let keepRunning = true;

  // populate the board, for now use random
  for (let n = 0; n < numberOfShips; n += 1) {
    botShips.push(bot.makeAIPreMove(botGameboard));
    userShips.push(user.makeAIPreMove(userGameboard));
  }

  // Display the ships
  displayShips(user, userShips);
  displayShips(bot, botShips);

  playGame(user, bot, userGameboard, botGameboard);

  /* while (keepRunning) {
    playGame();
    bot.makeAIMove(userGameboard);

    if (!userGameboard.doesBoardHaveShips()) {
      displayWinner('Bot wins');
    }
  } */
}

export function gameLoop() {
  /* Main loop function for the game between a bot and a bot */
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
}
