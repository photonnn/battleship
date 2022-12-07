import './style.css';
import { gameLoop, realGameLoop } from './game';
import { fillBoards } from './dom';

fillBoards();
// gameLoop();
realGameLoop();

/*
  TO DO LIST:

  Done: Change the way coordinates work from an array [x, y] to something more readable.
          # Maybe an object with x and y property
          # Critical: Bug due to confusing the coordinates. Due to the nature of arrays
            y will be present before x (arr[y][x]). This including the general confusing nature
            of coordinates results in a need to prioritise this issue.
          # Changed coordinates to an object with x and y properties

  Add the notification that calls out that the ship was or was nor succesfully placed.
    # We have tests for that. Might add an object to log things though.

  Done: Fix legalMoves functions to make a legalMoves based on the ship length
          and the state of the board.
          # Next on the menu.

  No longer necessary: Figure out a way to make jest print the board better.

  Improve the random AI attack function to generate random numbers only from a pool. This way
  there is no longer a need for the loop and code repetition.

  Deal with the if statement dealing with attack repetition in the receiveAttack function. AI
  should not be able to make a repetition, so maybe add a test for that though it shouldn't happen
  because legalMoves is tested.

  Done: Change named of import for ships. It is often currently the case that the name of the
          objects is ship as well as name of the macro.
  Done: Change name of all gameboard factory function object to gameboard and the array to just
          board.
  Also use opponentGameboard and selfGameboard to denote who it belongs to.

  Change color of the block when an attack misses. Additionally, work on the turn system.

  Make it easier to control boardSize, shipSize and etc.

*/
