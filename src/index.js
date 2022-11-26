import './style.css';

/*
  TO DO LIST:

  Change the way coordinates work from an array [x, y] to something more readable.
    # Maybe an object with x and y property
    # Critical: Bug due to confusing the coordinates. Due to the nature of arrays
      y will be present before x (arr[y][x]). This including the general confusing nature
      of coordinates results in a need to prioritise this issue.

  Add the notification that calls out that the ship was or was nor succesfully placed.
    # We have tests for that. Might add an object to log things though.

  Done: Fix legalMoves functions to make a legalMoves based on the ship length
          and the state of the board.
          # Next on the menu.

*/
