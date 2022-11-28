import { globalConsts } from './root';

// eslint-disable-next-line import/prefer-default-export
export function fillBoards() {
  /* Fill the board with necessary amount of blocks */
  const width = globalConsts.BOARD_SIZE;

  const userBoard = document.querySelector('.userBoard > *');
  const botBoard = document.querySelector('.botBoard > *');

  let i = 0;
  while (i < width * width) {
    const block = document.createElement('div');
    block.classList.add('boardBlock');
    userBoard.appendChild(block);

    const newBlock = document.createElement('div');
    newBlock.classList.add('boardBlock');
    botBoard.appendChild(newBlock);

    i += 1;
  }
}
