import { globalConsts } from './root';

// eslint-disable-next-line import/prefer-default-export
export function createPlayer(id) {
  /* Factory function for the player object

    Args:
    id -> String -> 'User' or 'AI'
  */

  function getLegalMoves(board) {
    /* Return an array filled with coordinates of legal moves

      Args:
      board -> Object -> A gameboard, see gameboard.js
    */
    const legalMoves = [];
    for (let y = 0; y < board.length; y += 1) {
      for (let x = 0; x < board[x].length; x += 1) {
        if (board[y][x] === 0) {
          legalMoves.push([y, x]);
        }
      }
    }
    return legalMoves;
  }

  function chooseAIMoveCoordinates() {
    /* Choose a random coordinats for an AI based on length of array of legal moves */
    const legalMoves = getLegalMoves();
    const maxValue = legalMoves.length - 1;
    return legalMoves[Math.floor(Math.random() * (maxValue + 1))];
  }

  function makeAIMove(board, ship) {
    /* Make a random move for an AI */
    const moveCoordinates = chooseAIMoveCoordinates();
    board.place(ship, moveCoordinates, globalConsts.SHIP_DIRECTION);
  }

  return {
    id,
    makeAIMove,
  };
}
