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

export function render(board, id) {
  /* Update the board based on information

    Args:
    board -> Array -> 2D array, has information about the board
  */

  const ignorable = [0, 1, 'sunk'];

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (!ignorable.includes(board[i][j])) {
        const block = document.getElementById(`${id}_id_${i}_${j}`);
        block.style.backgroundColor = 'silver';
      }
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

export function renderShips(player, playerBoard) {
  /* Render the ships, remove the sunken ones

    Args:
    player -> Object -> Player factory fn
    playerBoard -> Array -> Board where the boats from the placey were placee
  */

  for (let i = 0; i < playerBoard.length; i += 1) {
    for (let j = 0; j < playerBoard[i].length; j += 1) {
      if (playerBoard[i][j] === 'sunk') {
        // in case there is a repeat attempt at a sunk block we check if the child exists
        const ship = document.getElementById(`${player.id}_${i},${j}`);
        ship.style.backgroundColor = 'black';
        ship.style.borderColor = 'grey';
      }
    }
  }
}
