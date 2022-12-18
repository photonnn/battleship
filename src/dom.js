import { globalConsts } from './root';

export function fillBoards() {
  /* Fill the board with necessary amount of blocks */

  const userBoard = document.querySelector('.userBoard > *');
  const botBoard = document.querySelector('.botBoard > *');

  for (let i = 0; i < globalConsts.BOARD_SIZE; i += 1) {
    for (let j = 0; j < globalConsts.BOARD_SIZE; j += 1) {
      const block = document.createElement('div');
      block.setAttribute('id', `user_id_${i}_${j}`);
      block.classList.add('boardBlock');
      userBoard.appendChild(block);

      const newBlock = document.createElement('div');
      newBlock.setAttribute('id', `bot_id_${i}_${j}`);
      newBlock.classList.add('boardBlock');
      botBoard.appendChild(newBlock);
    }
  }
}

export function displayWinner(msg) {
  /* Renders the name of the winner at the top of the web page

    Args:
    msg -> String -> A messega to display
  */

  const winnerDivParagraph = document.querySelector('.winner p');
  winnerDivParagraph.textContent = msg;

  globalConsts.GAME_OVER = true;
}

function determineHtmlClass(player) {
  /* Given the player object determine which html class to use
    Utility function for displayShips function

    Args:
    player -> Object -> Player factory fn

    Returns:
    htmlClass -> Str -> see above
    */
  let htmlClass;
  if (player.id === 'bot') {
    htmlClass = 'botShips';
  } else {
    htmlClass = 'userShips';
  }
  return htmlClass;
}

export function displayShips(player, playerShips) {
  /* Display the ships below the game board

    Args:
    player -> Object -> Player factory fn
    playerShips -> Array -> Array of all ships from player arg[0]
  */
  const htmlClass = determineHtmlClass(player);

  const shipsDiv = document.querySelector(`.${htmlClass}`);
  for (let i = 0; i < playerShips.length; i += 1) {
    const shipDiv = document.createElement('div');
    for (let j = 0; j < playerShips[i].body.length; j += 1) { // assigning id to each ship part
      // create a ship node and add it to ships div
      const shipPartDiv = document.createElement('div');
      shipPartDiv.style.height = `${25}px`;
      shipPartDiv.style.width = `${25}px`;
      shipPartDiv.style.backgroundColor = 'silver';
      shipPartDiv.style.textAlign = 'center';
      shipPartDiv.style.margin = '0 5px';
      shipPartDiv.style.border = 'black solid 1px';

      shipPartDiv.setAttribute('id', `${player.id}_${playerShips[i].body[j]}`);
      shipDiv.appendChild(shipPartDiv);
    }
    shipsDiv.appendChild(shipDiv);
  }
}

export function initialRender(Gameboard, userID) {
  /* Renders the ships on the board, is ran only once

  Args:
  Gameboard -> Object -> Gameboard factory fn
  userID -> String -> Id of the player, same prefix as gameboard */
  const playerBoard = Gameboard.board;
  const ignorable = [0, 1, 'sunk']; // only alternatives are the ships

  for (let i = 0; i < playerBoard.length; i += 1) {
    for (let j = 0; j < playerBoard[i].length; j += 1) {
      if (!ignorable.includes(playerBoard[i][j])) {
        const block = document.getElementById(`${userID}_id_${i}_${j}`);
        block.style.backgroundColor = 'silver';
      }
    }
  }
}

export function render(Gameboard, opponentID) {
  /* Update the game state

    Args;
    Gameboard -> Object -> Gameboard factory fn
    opponentID -> String -> Id of the player, not the same prefix as gameboard
  */
  const playerBoard = Gameboard.board;

  for (let i = 0; i < playerBoard.length; i += 1) {
    for (let j = 0; j < playerBoard[i].length; j += 1) {
      if (playerBoard[i][j] === 'sunk') { // Render the sunken ships and section below the board
        const ship = document.getElementById(`${opponentID}_${i},${j}`);
        ship.style.backgroundColor = 'black';
        ship.style.borderColor = 'grey';
        const block = document.getElementById(`${opponentID}_id_${i}_${j}`);
        block.style.backgroundColor = 'black';
        block.style.border = 'solid grey 1px';
      }
      if (playerBoard[i][j] === 1) { // Render the missed attacks
        const block = document.getElementById(`${opponentID}_id_${i}_${j}`);
        block.style.backgroundColor = 'orange';
        block.style.border = 'solid black 1px';
      }
    }
  }
}
