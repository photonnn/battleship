import { globalConsts } from './root';

// eslint-disable-next-line import/prefer-default-export
export function fillBoards() {
  /* Fill the board with necessary amount of blocks */

  const userBoard = document.querySelector('.userBoard > *');
  const botBoard = document.querySelector('.botBoard > *');

  for (let i = 0; i < globalConsts.BOARD_SIZE; i += 1) {
    for (let j = 0; j < globalConsts.BOARD_SIZE; j += 1) {
      const block = document.createElement('div');
      block.classList.add('boardBlock', `user_id_${i}_${j}`);
      userBoard.appendChild(block);

      const newBlock = document.createElement('div');
      newBlock.classList.add('boardBlock', `bot_id_${i}_${j}`);
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
        const block = document.querySelector(`.${id}_id_${i}_${j}`);
        block.style.backgroundColor = 'red';
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
}
