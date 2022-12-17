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

  function returnAvailableAttacks(gameboard) {
    /* Returns an array, that contains available attack, the ones that AI hasn't attempted
      to do, aka the ones that appear orange.

    Args:
    gameboard -> Object -> Gameboard factory fn */
    const attacks = [];
    const illegalToAttack = [globalConsts.MISSED_ATTACK_COLOR, 'black'];
    for (let i = 0; i < gameboard.board.length; i += 1) {
      for (let j = 0; j < gameboard.board[i].length; j += 1) {
        const block = document.getElementById(`user_id_${i}_${j}`);
        if (!illegalToAttack.includes(block.style.backgroundColor)) {
          attacks.push([i, j]);
        }
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

  function makeAIPreMove(opponentGameboard) {
    /* Combine functions to:
      1. Create a random ship
      2. Place the ship randomly
      3. Render the board

      Args:
      gameboard -> Object -> Gameboard factory function object

      Returns:
      newShip -> Object -> Used as an utility for displayShips function
    */

    const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
      + globalConsts.MINIMUM_SHIP_LENGTH;
    const newShip = createShip(shipLength);
    this.placeAIShip(opponentGameboard, newShip);
    render(opponentGameboard.board, this.id);
    return newShip;
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

    const userMoveCoordinates = this.generateRandomAIAttackCoordinates(opponentGameboard);
    const { x } = userMoveCoordinates;
    const { y } = userMoveCoordinates;
    if (opponentGameboard.doesAttackHitAShip(userMoveCoordinates)) {
      opponentGameboard.receiveAttack(userMoveCoordinates);
      // Attack was successful, now update the DOM

      // const block = document.getElementById(`${this.id}_id_${y}_${x}`);
      const block = document.getElementById(`user_id_${y}_${x}`);
      block.style.backgroundColor = 'black';
      block.style.border = 'solid grey 1px';
    } else {
      // show where the attack missed
      const block = document.getElementById(`user_id_${y}_${x}`);
      block.style.backgroundColor = 'orange';
      block.style.border = 'solid black 1px';
    }

    render(opponentGameboard, this.id);
  }

  function makeMove(opponentGameboard, coordinates) {
    /* Combine function to make a move:
      1. Attack the given coordinates
      1.5 Change the DOM
      2. Save the attack, to prevent repetition
      3. render
    */
    const { x } = coordinates;
    const { y } = coordinates;
    if (opponentGameboard.doesAttackHitAShip(coordinates)) {
      opponentGameboard.receiveAttack(coordinates);

      // Attack was successful
      const block = document.getElementById(`bot_id_${y}_${x}`);
      block.style.backgroundColor = 'black';
      block.style.border = 'solid grey 1px';
    } else {
      // Attack missed
      const block = document.getElementById(`bot_id_${y}_${x}`);
      if (block.style.backgroundColor === 'black' || block.style.backgroundColor === 'orange') { // if repeated
        return false;
      }
      block.style.backgroundColor = 'orange';
      block.style.border = 'solid black 1px';
    }

    render(opponentGameboard, 'bot');
    return true;
  }

  return {
    id,
    placeAIShip,
    generateRandomAIAttackCoordinates,
    makeAIPreMove,
    makeAIMove,
    makeMove,
  };
}
