import * as gameboard from '../gameboard';
import * as ship from '../ship';
import { globalConsts } from '../root';

describe('Gameboard factory function', () => {
  let testBoard;
  let testShip;

  beforeAll(() => {
    testBoard = gameboard.createGameboard(
      globalConsts.TEST_BOARD_SIZE,
      globalConsts.TEST_BOARD_SIZE,
    );

    testShip = ship.createShip(3);
  });

  test(`creates an ${globalConsts.TEST_BOARD_SIZE} x ${globalConsts.TEST_BOARD_SIZE} board filled with 0s`, () => {
    expect(testBoard.board).toEqual([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
  });

  test('places a ship to suitable coordinates', () => {
    testBoard.place(testShip, [0, 0], 'x');
    expect(testBoard.board).toEqual([
      [testShip, testShip, testShip, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  test("doesn't place a ship to unsuitable coordinates", () => {
    testBoard.place(testShip, [3, 0], 'y');
    expect(testBoard.board).toEqual([
      [testShip, testShip, testShip, 0], // IMPORTANT: this is left from previous test, clean it up!
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
