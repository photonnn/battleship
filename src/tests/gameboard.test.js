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
    testBoard.resetBoard();
  });

  test("doesn't place a ship to unsuitable coordinates", () => {
    testBoard.place(testShip, [3, 0], 'y');
    expect(testBoard.board).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });

  test('An attack on blank block changes the value of the block to 1', () => {
    testBoard.receiveAttack([0, 0]);
    expect(testBoard.board).toEqual([
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
  });
});
