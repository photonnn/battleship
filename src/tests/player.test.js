import * as player from '../player';
import * as gameboard from '../gameboard';
import * as ship from '../ship';
import { globalConsts } from '../root';

describe('Player factory function', () => {
  let botOne;
  let testBoard;
  let testShipOne;

  beforeAll(() => {
    botOne = player.createPlayer('AI');
    testBoard = gameboard.createGameboard(
      globalConsts.TEST_BOARD_SIZE,
      globalConsts.TEST_BOARD_SIZE,
    );
    testShipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  });

  test.only('Bot makes a legal random move', () => {
    expect(botOne.placeAIShip(testBoard, testShipOne)).not.toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
