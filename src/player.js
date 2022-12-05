import { render } from './dom';
import { isSuitable } from './gameboard';
import { globalConsts } from './root';
import { createShip } from './ship';

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

  function makeRandomAIAttack(gameboard) {
    /* Generate a random attack based which is different from the ones already attempted

      Args:
      gameboard -> Object -> Gameboard factory fn
    */
    let keepRunning = true;
    let randomCoordinates;
    while (keepRunning) {
      randomCoordinates = {
        x: Math.floor(Math.random() * gameboard.width),
        y: Math.floor(Math.random() * gameboard.width),
      };
      if (!this.attemptedAttacks.includes(randomCoordinates)) {
        keepRunning = false;
      }
    }
    return randomCoordinates;
  }

  function makeAIPreMove(opponentGameboard) {
    /* Combine functions to:
      1. Create a random ship
      2. Place the ship randomly
      3. Render the board

      Args:
      gameboard -> Object -> Gameboard factory function object
    */

    const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
      + globalConsts.MINIMUM_SHIP_LENGTH;
    const newShip = createShip(shipLength);
    this.placeAIShip(opponentGameboard, newShip);
    render(opponentGameboard.board, this.id);
  }

  function makeAIMove(opponentGameboard) {
    /* Combine functions to:
      1. Generate attack coordinates
      2. Attack the selected coordinates
      2.5 Change the dom of the block
      3. Save the attack, to prevent repetition
      4. Render

      Args:
      opponentGameboard -> Object -> Gameboard factory fn
    */

    const userMoveCoordinates = this.makeRandomAIAttack(opponentGameboard);
    if (opponentGameboard.doesAttackHitAShip(userMoveCoordinates)) {
      opponentGameboard.receiveAttack(userMoveCoordinates);

      // Attack was successful, now update the DOM
      const { x } = userMoveCoordinates;
      const { y } = userMoveCoordinates;

      const block = document.querySelector(`.${this.id}_id_${y}_${x}`);
      block.style.backgroundColor = 'black';
    }

    this.attemptedAttacks.push(userMoveCoordinates);
    render(opponentGameboard, this.id);
  }

  return {
    id,
    placeAIShip,
    attemptedAttacks: [],
    makeRandomAIAttack,
    makeAIPreMove,
    makeAIMove,
  };
}
