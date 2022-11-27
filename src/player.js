import { isSuitable } from './gameboard';

// eslint-disable-next-line import/prefer-default-export
export function createPlayer(id) {
  /* Factory function for the player object

    Args:
    id -> String -> 'User' or 'AI'
  */

  function getLegalMoves(board, ship, direction) {
    /* Return an array filled with coordinates of legal moves

      Args:
      board -> Array -> 2D gameboard, see gameboard.js
    */

    const legalMoves = [];
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < board[y].length; x += 1) {
        if (isSuitable(board, ship, { x, y }, direction)) {
          legalMoves.push({ x, y });
        }
      }
    }
    return legalMoves;
  }

  function chooseAIMoveCoordinates(legalMoves) {
    /* Choose a random coordinats for an AI based on length of array of legal moves */
    const maxValue = legalMoves.length - 1;
    return legalMoves[Math.floor(Math.random() * (maxValue + 1))];
  }

  function chooseAIDirection() {
    /* Choose the direction based on a coin toss */
    const val = Math.floor(Math.random() * 2);
    if (val) {
      return 'x';
    }
    return 'y';
  }

  function makeAIMove(gameboard, ship) {
    /* Make a random move for an AI

      Args:
      board -> Object
      ship -> Object
    */
    const direction = chooseAIDirection();
    const legalMoves = getLegalMoves(gameboard.board, ship, direction);
    const moveCoordinates = chooseAIMoveCoordinates(legalMoves);
    gameboard.place(ship, moveCoordinates, direction);
  }

  return {
    id,
    makeAIMove,
  };
}
