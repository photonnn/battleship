import './style.css';
import { playGame } from './game';
import { fillBoards } from './dom';

fillBoards();
playGame();

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

  Done: Change color of the block when an attack misses. Additionally, work on the turn system.

  Done: Make it easier to control boardSize, shipSize and etc.

  Partially Done:
        Done: Fix a bug where AI makes a random move on the wrong board.
        In general fix a problem with mix-up between the bot board and the user board.
        Done: There's also a problem with the ships below the board not displaying the
                correct ones,
        More, the two board have different ships, they should be the same!
        Maybe Done: More, looks like the AI is repeating moves, that shouldn't happeened, at all.
                Most of these worked on/fixed. More updates very soon.

  Check for legality of the attack in the takeTurn function at the very top, whence you get event
  target id. This is because sometimes if you click on the very edge of the block, on the border,
  the attack doesn't go through, because then x and y are undefined or empty string. Also put
  a function to check if the attack is legal there. No need to then check if the makeMove function.

  Done: Brilliant idea, instead of y and x use row and col. :OOOO

  Add a border/shadow/outline outside the board in order to show the user that it is in fact their
  turn. Add a bit of delay before the AI makes an attack to make it more intense, as well as think
  about potential sound effects.

  Change the winner display, do some disagn changes on the website.
  Add the Play again button, maybe even the title screen.
  Add a local storage, a high score, or in general a high score system.

  Harder to implement changes:
  1. Add the ability to place your own ships. Just place the ones below the board to the board.
  2. Make the AI smarter, gulp
  3. Once the ship is fully found, destroy the surroinding blocks. As a consequence ships can't
     be placed in the direct vicinity with each other.
  4, Add the ability to choose difficulty on the title screen.
  5. Add the ability to play in the sandbox mode, aka. user vs user
  6. Add online play, for beginning just a simple pvp 1v1 invite link thingy

*/
