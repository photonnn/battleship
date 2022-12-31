export function removeHighlight(userBoard) {
  /*
  Remove all highlighted blocks, function is called in the manual placement

  Args:
  userBoard -> 2D array of the user gameboard
  */
  for (let row = 0; row < userBoard.length; row += 1) {
    for (let col = 0; col < userBoard[row].length; col += 1) {
      const block = document.getElementById(`user_id_${row}_${col}`);
      if (block.classList.contains('highlightedBlock')) {
        block.classList.remove('highlightedBlock');
      }
    }
  }
}

export function highlightBlocks(shipLength, coordinates, placementDirection) {
  /*
  Highlights the spot on which the ship is to be placed

  Args:
  shipLength -> length of the ship being placed
  coordinates -> location of the first part of the ship
  placementDirection -> the direction of the follow up parts of the ship
  */
  let col = 0;
  let row = 0;

  const { x } = coordinates;
  const { y } = coordinates;

  // First remove the previously highlighted blocks

  // Then go through
  for (let i = shipLength; i > 0; i -= 1) {
    const block = document.getElementById(`user_id_${y + row}_${x + col}`);
    block.classList.add('highlightedBlock');

    if (placementDirection === 'x') {
      col += 1;
    } else { // placementDirection == 'y'
      row += 1;
    }
  }
}
