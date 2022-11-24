function isSuitable(board, ship, coordinates, direction) {
  /*  Checks if it is legal for a user to place a ship on
      specified coordinates and in a specified direction

    Args:
    board -> Array_-> 2D
    ship -> Object
    coordinates -> Array -> [x, y]
    direction -> String -> 'x' or 'y'
  */
  let i = 0;
  let j = 0;
  let shipLength = ship.length;

  const x = coordinates[0];
  const y = coordinates[1];

  while (shipLength > 0) {
    if ((board[x].length - 1) <= (x + i) || (board[x][y].length - 1) <= (y + j)
    || board[x + j][y + i] !== 0) {
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

// eslint-disable-next-line import/prefer-default-export
export function createGameboard(width, height) {
  /*  Factory function for the gameboard object

      Args:
      width -> board width
      height -> board height
  */

  return {
    board: Array(width).fill(0).map(() => Array(height).fill(0)),
    place(ship, coordinates, direction) {
      /* Places a ship on given coordinates in given direction if it is suitable

        Args:
        ship -> Object
        coordinates -> Array -> [x, y]
        direction -> String -> 'X' or 'Y'
      */
      if (isSuitable(this.board, ship, coordinates, direction)) {
        let shipLength = ship.length;
        let i = 0;
        let j = 0;
        while (shipLength > 0) {
          this.board[coordinates[0] + i][coordinates[1] + j] = ship;

          if (direction === 'x') {
            j += 1;
          } else {
            i += 1;
          }

          shipLength -= 1;
        }
      }
    },
  };
}
