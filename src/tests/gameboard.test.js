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
    testBoard.place(testShip, [0, 0], globalConsts.SHIP_DIRECTION);
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
    testBoard.resetBoard();
  });

  test('A ship of length 1 is sunk and block changes value to "sunk"', () => {
    const smallShip = ship.createShip(1);
    testBoard.place(smallShip, [0, 0], globalConsts.SHIP_DIRECTION);
    testBoard.receiveAttack([0, 0]);
    expect(smallShip.isSunk).toBeTruthy();
    expect(testBoard.board).toEqual([
      ['sunk', 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    testBoard.resetBoard();
  });

  test('An empty board has no ships', () => {
    expect(testBoard.doesBoardHaveShips()).toBeFalsy();
  });
});
