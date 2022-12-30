import { createShip } from './ship';
import { globalConsts } from './root';
import { initialRender, displayShipsBelowBoard } from './dom';
import { isSuitable } from './gameboard';
import { highlightBlocks, removeHighlight } from './highlight';

function drop(event, userGameboard) {
  event.preventDefault(); // Prevent default behavior (e.g. open file in new tab)

  const data = event.dataTransfer.getData('text/plain');
  const object = JSON.parse(data);
  const shipLength = object.length;
  const shipFiguresIDs = object.IDs;

  const coordinates = userGameboard.getCoordinates(event.target.id);

  if (coordinates !== false) {
    const direction = globalConsts.SHIP_DIRECTION;
    const newShip = createShip(shipLength);

    const res = userGameboard.place(newShip, coordinates, direction, shipFiguresIDs);
    if (res === 'legal') {
      const elt = document.getElementById(`${shipFiguresIDs[0]}`).parentElement;
      const children = [...elt.children];
      children.forEach((child) => {
        // simpler than creating new class
        // eslint-disable-next-line no-param-reassign
        child.style.opacity = 0.3;
      });
    }
    initialRender(userGameboard, 'user');
  }
}

export function randomPlacement(user, bot, userShips, botShips, userGameboard, botGameboard) {
  /*
  Place the ships randomly on the board
  */
  for (let n = 0; n < globalConsts.NUMBER_OF_SHIPS; n += 1) {
    const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
      + globalConsts.MINIMUM_SHIP_LENGTH;
    botShips.push(bot.makeAIPreMove(botGameboard, shipLength));
    userShips.push(user.makeAIPreMove(userGameboard, shipLength));
  }

  displayShipsBelowBoard(user, userShips);
  displayShipsBelowBoard(bot, botShips);
}

function addListenersForDragAndDrop(userGameboard) {
  /*
  Event listeners for the process of manually placing the ships on the
  board.

  Args:
  userGameboard ->
  */
  const userShipsElements = document.querySelectorAll('.userShips > *');
  const dropZone = document.querySelector('.userBoard .board');

  let shipLength = 0;

  globalConsts.drop = (event) => drop(event, userGameboard);
  globalConsts.preventDefault = (event) => event.preventDefault();

  dropZone.addEventListener('drop', globalConsts.drop);

  dropZone.addEventListener('dragover', globalConsts.preventDefault);

  dropZone.addEventListener('dragenter', (event) => {
    // event.preventDefault(); // Prevent default behavior (e.g. open file in new tab)
    const fakeShip = {
      length: shipLength, // closure :D
    };
    const coordinates = userGameboard.getCoordinates(event.target.id);
    removeHighlight(userGameboard.board);
    if (isSuitable(userGameboard.board, fakeShip, coordinates, globalConsts.SHIP_DIRECTION)) {
      highlightBlocks(shipLength, coordinates, globalConsts.SHIP_DIRECTION);
    }
  });

  userShipsElements.forEach((ship) => {
    ship.addEventListener('dragstart', (event) => {
      let stopListening = false;

      const checkIfValid = (ID) => {
        for (let row = 0; row < globalConsts.BOARD_SIZE; row += 1) {
          for (let col = 0; col < globalConsts.BOARD_SIZE; col += 1) {
            const block = document.getElementById(`user_id_${row}_${col}`);
            if (block.getAttribute('shipfigureid') === ID) {
              return false;
            }
          }
        }
        return true;
      };

      const childNodeIDs = [];
      // If stopListening is true no reason to keep going, so instead of forEach
      // we use normal loop so we can break
      // eslint-disable-next-line no-restricted-syntax
      for (const child of event.target.childNodes) {
        const { id } = child;
        if (checkIfValid(id)) {
          childNodeIDs.push(id);
        } else {
          stopListening = true;
          event.preventDefault();
          break;
        }
      }

      if (!stopListening) {
        // event.dataTransfer.setData('test/plain', `${event.target.childNodes}`);
        // WE transfer the ID so the ship on the board and the respective ship figure
        // can be connected
        shipLength = ship.children.length;
        event.dataTransfer.setData('text/plain', JSON.stringify({ length: ship.children.length, IDs: childNodeIDs }));
      }
    });
  });
}

export function manualPlacement(user, bot, botShips, userGameboard, botGameboard) {
  /*
  Place the ships manually.
  */
  for (let n = 0; n < globalConsts.NUMBER_OF_SHIPS; n += 1) {
    const shipLength = Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH)
      + globalConsts.MINIMUM_SHIP_LENGTH;
    botShips.push(bot.makeAIPreMove(botGameboard, shipLength));
  }
  const userShips = botShips; // We still want the user have the same ships as AI

  // Create and Display the ships
  displayShipsBelowBoard(user, userShips);
  displayShipsBelowBoard(bot, botShips);

  // Add event listeners for the process of dragging and dropping
  addListenersForDragAndDrop(userGameboard, drop);
}
