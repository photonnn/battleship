import * as player from '../player';
import * as gameboard from '../gameboard';
import { createShip } from '../ship';
import { globalConsts } from '../root';

describe('Player factory function', () => {
  let botOne;
  let testGameboard;
  let testShipOne;

  beforeAll(() => {
    botOne = player.createPlayer('AI');
    testGameboard = gameboard.createGameboard(
      globalConsts.TEST_BOARD_SIZE,
      globalConsts.TEST_BOARD_SIZE,
    );
    testShipOne = createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  });

  test.only('Bot makes a legal random move', () => {
    expect(botOne.placeAIShip(testGameboard, testShipOne)).not.toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
