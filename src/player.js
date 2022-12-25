import { isSuitable } from './gameboard';
import { audioExplosion, audioSplash } from './root';
import { createShip } from './ship';

// eslint-disable-next-line import/prefer-default-export
export function createPlayer(id) {
  /* Factory function for the player object

    Args:
    id -> String -> 'User' or 'AI'
  */

  function getLegalMoves(board, ship, placementDirection) {
    /* Return an array filled with coordinates of legal moves

        Args:
        board -> Array -> 2D gameboard, see gameboard.js
      */

    const legalMoves = [];
    for (let row = 0; row < board.length; row += 1) {
      for (let col = 0; col < board[row].length; col += 1) {
        if (isSuitable(board, ship, { x: col, y: row }, placementDirection)) {
          legalMoves.push({ x: col, y: row });
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
    /* Choose the placement direction based on a coin toss */
    const val = Math.floor(Math.random() * 2);
    if (val) {
      return 'x';
    }
    return 'y';
  }

  function placeAIShip(gameboard, ship) {
    /* Make AI place a ship on a random location that is legal

      Args:
      gameboard -> Object
      ship -> Object
    */
    const direction = chooseAIDirection();
    const legalMoves = getLegalMoves(gameboard.board, ship, direction);
    const moveCoordinates = chooseAIMoveCoordinates(legalMoves);
    gameboard.place(ship, moveCoordinates, direction);
  }

  function returnAvailableAttacks(gameboard) {
    /* Returns an array, that contains available attack, the ones that AI hasn't attempted
      to do, aka the ones that appear orange.

    Args:
    gameboard -> Object -> Gameboard factory fn */
    const attacks = [];
    for (let row = 0; row < gameboard.board.length; row += 1) {
      for (let col = 0; col < gameboard.board[row].length; col += 1) {
        const block = document.getElementById(`user_id_${row}_${col}`);
        if (!block.classList.contains('missedBlock') && !block.classList.contains('sunkenBlock')) {
          attacks.push([row, col]);
        }
        // if (!illegalToAttack.includes(block.style.backgroundColor)) {
        //   attacks.push([row, col]);
        // }
      }
    }
    return attacks;
  }

  function generateRandomAIAttackCoordinates(gameboard) {
    /* Generate a random attack based which is different from the ones already attempted

      Args:
      gameboard -> Object -> Gameboard factory fn
    */
    const legalAttacks = returnAvailableAttacks(gameboard);
    const index = Math.floor(Math.random() * legalAttacks.length);
    return { x: legalAttacks[index][1], y: legalAttacks[index][0] };
  }

  function makeAIPreMove(opponentGameboard, shipLength) {
    /*
    Create a ship based on parameter shipLength, and call placeAIShip function
    to place it randomly on the board.

    Args:
    gameboard -> Object representing the gameboard

    Returns:
    newShip -> Ship Object -> Used as an utility for displayShipsBelowBoard function
    */

    const newShip = createShip(shipLength);
    this.placeAIShip(opponentGameboard, newShip);
    return newShip;
  }

  function makeAIMove(opponentGameboard) {
    /* Combine functions to:
      1. Generate attack coordinates
      2. Attack the selected coordinates

      Args:
      opponentGameboard -> Object -> Gameboard factory fn
    */

    const userMoveCoordinates = this.generateRandomAIAttackCoordinates(opponentGameboard);
    if (opponentGameboard.doesAttackHitAShip(userMoveCoordinates)) {
      opponentGameboard.receiveAttack(userMoveCoordinates);
      audioExplosion();
    } else {
      audioSplash();
    }
  }

  return {
    id,
    placeAIShip,
    generateRandomAIAttackCoordinates,
    makeAIPreMove,
    makeAIMove,
  };
}
