export function isSuitable(board, ship, coordinates, direction) {
  /*  Checks if a ship can be placed on the specified coordinates
      and in the specified direction. Used for AI only because it
      has is guaranteed that the specified coordinates are legal.

    Args:
    board -> Array_-> 2D
    ship -> Object
    coordinates -> Object -> x and y property
    direction -> String -> 'x' or 'y'
  */
  let i = 0;
  let j = 0;
  let shipLength = ship.length;

  const { x } = coordinates;
  const { y } = coordinates;

  while (shipLength > 0) {
    // The first two conditions are to allow the 3rd to not throw an error!
    if ((board.length - 1) < (y + i) || (board[y].length - 1) < (x + j) // RETHINK THIS
    || board[y + i][x + j] !== 0) {
      return false;
    }

    if (direction === 'x') {
      j += 1;
    } else {
      i += 1;
    }

    shipLength -= 1;
  }
  return true;
}

export function createGameboard(width, height) {
  /*  Factory function for the gameboard object

      Args:
      width -> board width
      height -> board height
  */
  const missedAttacks = 0;

  function resetBoard() {
    this.board = Array(width).fill(0).map(() => Array(height).fill(0));
  }

  function place(ship, coordinates, direction) {
    /* Places a ship on given coordinates in given direction if it is suitable

      Args:
      ship -> Object
      coordinates -> Object -> x and y property
      direction -> String -> 'X' or 'Y'
    */
    if (isSuitable(this.board, ship, coordinates, direction)) {
      let shipLength = ship.length;
      let i = 0;
      let j = 0;

      const { x } = coordinates;
      const { y } = coordinates;

      while (shipLength > 0) {
        this.board[y + i][x + j] = ship;
        ship.body.push([y + i, x + j]);

        if (direction === 'x') {
          j += 1;
        } else {
          i += 1;
        }

        shipLength -= 1;
      }
    } else {
      return 'illegal'; // the spot is unsuitable
    }
    return 'legal'; // the spot was suitable
  }

  function doesAttackHitAShip(coordinates) {
    /* Determine if an attack hit a ship and if so, then send hit to correct ship

      Args:
      coordinates -> Object -> x and y property
    */

    const { x } = coordinates;
    const { y } = coordinates;

    // Attack misses
    if (this.board[y][x] === 0) {
      this.board[y][x] = 1;
      this.missedAttacks += 1;
      return false;
    }
    // Attack is repeated, relevant to user only
    if (this.board[y][x] === 1 || this.board[y][x] === 'sunk') {
      return false;
    }
    return true;
  }

  function receiveAttack(coordinates) {
    /* An attack was successful, now the ship is going to sink

      Args:
      coordinates -> Object -> x and y property
    */
    const { x } = coordinates;
    const { y } = coordinates;

    const ship = this.board[y][x];
    ship.body.pop([y, x]);
    ship.hit();
    this.board[y][x] = 'sunk';
  }

  function doesBoardHaveShips() {
    /* Checks if there are ships remaining and returns true if there are */
    const arr = this.board;
    const legalOutcomes = [0, 1, 'sunk'];

    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        if (!legalOutcomes.includes(arr[i][j])) {
          return true;
        }
      }
    }

    return false;
  }

  function getCoordinates(move) {
    /* Parses the event target id information to obtain coordinates for an attack.
    If it occurs that the user did not click properly on the block, return false
    and take turn again.

    Args:
    coordinates -> Object -> Has x and y property
    */
    const numbers = move.split('_').slice(-2); // Extract numbers from ex: bot_id_5_5
    const coordinates = {
      y: numbers[0],
      x: numbers[1],
    };
    if (Number.isInteger(+coordinates.x) && Number.isInteger(+coordinates.y)) {
      return coordinates;
    }
    return false; // in this case user likely clicked on a border or somehow glitched the game
  }

  return {
    width,
    height,
    board: Array(width).fill(0).map(() => Array(height).fill(0)),
    missedAttacks,
    doesBoardHaveShips,
    resetBoard,
    place,
    receiveAttack,
    doesAttackHitAShip,
    getCoordinates,
  };
}
