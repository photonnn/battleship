import { globalConsts } from './root';

export function fillBoards() {
  /* Fill the board with necessary amount of blocks */

  const userBoard = document.querySelector('.userBoard > *');
  const botBoard = document.querySelector('.botBoard > *');

  for (let row = 0; row < globalConsts.BOARD_SIZE; row += 1) {
    for (let col = 0; col < globalConsts.BOARD_SIZE; col += 1) {
      const block = document.createElement('div');
      block.setAttribute('id', `user_id_${row}_${col}`);
      block.classList.add('boardBlock');
      userBoard.appendChild(block);

      const newBlock = document.createElement('div');
      newBlock.setAttribute('id', `bot_id_${row}_${col}`);
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

export function displayShipsBelowBoard(player, playerShips) {
  /* Display the ships below the game board

    Args:
    player -> Object -> Player factory fn
    playerShips -> Array -> Array of all ships from player arg[0]
  */
  const htmlClass = determineHtmlClass(player);

  const shipsDiv = document.querySelector(`.${htmlClass}`);
  for (let row = 0; row < playerShips.length; row += 1) {
    const shipDiv = document.createElement('div');
    for (let col = 0; col < playerShips[row].body.length; col += 1) { // assigning id to ship parts
      // create a ship node and add it to ships div
      const shipPartDiv = document.createElement('div');
      shipPartDiv.style.height = `${25}px`;
      shipPartDiv.style.width = `${25}px`;
      shipPartDiv.style.backgroundColor = 'silver';
      shipPartDiv.style.textAlign = 'center';
      shipPartDiv.style.margin = '0 5px';
      shipPartDiv.style.border = 'black solid 1px';

      shipPartDiv.setAttribute('id', `${player.id}_${playerShips[row].body[col]}`);
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

  for (let row = 0; row < playerBoard.length; row += 1) {
    for (let col = 0; col < playerBoard[row].length; col += 1) {
      if (!ignorable.includes(playerBoard[row][col])) {
        const block = document.getElementById(`${userID}_id_${row}_${col}`);
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

  for (let row = 0; row < playerBoard.length; row += 1) {
    for (let col = 0; col < playerBoard[row].length; col += 1) {
      if (playerBoard[row][col] === 'sunk') { // Render the sunken ships and section below the board
        const ship = document.getElementById(`${opponentID}_${row},${col}`);
        ship.style.backgroundColor = 'black';
        ship.style.borderColor = 'grey';
        const block = document.getElementById(`${opponentID}_id_${row}_${col}`);
        block.style.backgroundColor = 'black';
        block.style.border = 'solid grey 1px';
      }
      if (playerBoard[row][col] === 1) { // Render the missed attacks
        const block = document.getElementById(`${opponentID}_id_${row}_${col}`);
        block.style.backgroundColor = 'orange';
        block.style.border = 'solid black 1px';
      }
    }
  }
}
