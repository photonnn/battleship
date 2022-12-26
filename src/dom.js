import { globalConsts } from './root';

export function fillBoards() {
  /*
  Fills the gameboard with the necessary number of blocks.
  This function is called once at the start of every game.
  */

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

export function resetBoard() {
  /*
  Resets the gameboards and the ship displays on the page.
  It's called at the end of the game to reset the game to state and prepare a
  new game.
  */
  const elements = ['.botBoard > *', '.userBoard > *', '.botShips', '.userShips'];
  elements.forEach((selector) => {
    const element = document.querySelector(selector);
    while (element.firstChild) {
      element.firstChild.remove();
    }
  });
}

// The following is only a temporary function. Ideally once
// the game ends, a box display with more information rather
// than just triggering the exit button and returning to the menu
export function displayWinner() {
  /*
  Dispatches a click on the exitBtn effectively ending the game.
  It's called at the end of the game, when either the user or bot
  have no ships remaining.

  Args:
  msg -> String -> A messega to display
  */

  // const winnerDivParagraph = document.querySelector('.winner p');
  // winnerDivParagraph.textContent = msg;

  const exitBtn = document.getElementById('exitGameBtn');
  exitBtn.dispatchEvent(new Event('click'));
}

function determineHtmlClass(player) {
  /*
  Determines which HTML class to use based on the provided player object.
  Used in the displayShips function.

  Args:
  player -> Object representing the player

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
  /*
  Displays the ships of a given player below the game board.
  This means that it creates new divs and assigns id's. It is
  only called at the beginning of the game, later render
  function does the rest.

  Args:
  player -> Object representing the player
  playerShips -> Array -> Array of all ships belonging to the player
  */
  const htmlClass = determineHtmlClass(player);

  const shipsDiv = document.querySelector(`.${htmlClass}`);
  for (let row = 0; row < playerShips.length; row += 1) {
    const shipDiv = document.createElement('div');
    for (let col = 0; col < playerShips[row].body.length; col += 1) { // assigning id to ship parts
      // create a ship node and add it to ships div
      const shipPartDiv = document.createElement('div');
      shipPartDiv.classList.add('shipPartDiv');

      shipPartDiv.setAttribute('id', `${player.id}_${playerShips[row].body[col]}`);
      shipDiv.appendChild(shipPartDiv);
    }
    if (player.id === 'user') {
      shipDiv.setAttribute('draggable', true);
    }
    shipsDiv.appendChild(shipDiv);
  }
}

export function initialRender(Gameboard, player) {
  /*
  Responsible for rendering the initial state of the gamboard,
  essentially changing the background color of all the blocks
  that are ships.

  Args:
  Gameboard -> Object representing the gameboard of the respective player below
  player -> String representing ID of the playe
  */

  const playerBoard = Gameboard.board;
  const ignorable = [0, 1, 'sunk']; // only alternatives are the ships

  for (let row = 0; row < playerBoard.length; row += 1) {
    for (let col = 0; col < playerBoard[row].length; col += 1) {
      if (!ignorable.includes(playerBoard[row][col])) {
        const block = document.getElementById(`${player}_id_${row}_${col}`);
        block.style.backgroundColor = '#a8a29e';
      }
    }
  }
}

export function render(Gameboard, opponentID) {
  /*
  Updates the game state in the UI by adding CSS classes to the HTML
  elements corresponding to the gameboard blocks.
  Because the user plays on the bot's gameboard, the ID that is used
  is then bot.

  Args;
  Gameboard -> Object representing the gameboard
  opponentID -> String representing ID of the opponent player,
    not the same prefix as gameboard
  */
  const playerBoard = Gameboard.board;

  for (let row = 0; row < playerBoard.length; row += 1) {
    for (let col = 0; col < playerBoard[row].length; col += 1) {
      if (playerBoard[row][col] === 'sunk') { // Render the sunken ships and section below the board
        console.log(`${opponentID}_${row},${col}`);
        const ship = document.getElementById(`${opponentID}_${row},${col}`);
        ship.classList.add('shipBlock');

        const block = document.getElementById(`${opponentID}_id_${row}_${col}`);
        block.classList.add('sunkenBlock');
      }
      if (playerBoard[row][col] === 1) { // Render the missed attacks
        const block = document.getElementById(`${opponentID}_id_${row}_${col}`);
        block.classList.add('missedBlock');
      }
    }
  }
}
