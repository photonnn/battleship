import * as gameboard from '../gameboard';
import { createShip } from '../ship';
import { globalConsts } from '../root';

describe('Gameboard ', () => {
  let testGameboard;
  let testShip;

  beforeAll(() => {
    testGameboard = gameboard.createGameboard(
      globalConsts.TEST_BOARD_SIZE,
      globalConsts.TEST_BOARD_SIZE,
    );

    testShip = createShip(3);
  });

  test(`creates an ${globalConsts.TEST_BOARD_SIZE} x ${globalConsts.TEST_BOARD_SIZE} board filled with 0s`, () => {
    expect(testGameboard.board).toEqual([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
  });

  test('places a ship to suitable coordinates and return legal', () => {
    const output = testGameboard.place(testShip, { x: 0, y: 0 }, globalConsts.SHIP_DIRECTION);

    expect(testGameboard.board).toEqual([
      [testShip, testShip, testShip, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(output).toBe('legal');
    testGameboard.resetBoard();
  });

  test("return string:illegal if ship can't be placed", () => {
    const output = testGameboard.place(testShip, { x: 0, y: 3 }, 'y');
    expect(testGameboard.board).toEqual([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(output).toBe('illegal');
  });

  test('An attack on blank block changes the value of the block to 1', () => {
    if (testGameboard.doesAttackHitAShip({ x: 0, y: 0 })) {
      testGameboard.receiveAttack({ x: 0, y: 0 });
    }
    expect(testGameboard.board).toEqual([
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    testGameboard.resetBoard();
  });

  test('A ship of length 1 is sunk and block changes value to "sunk"', () => {
    const smallShip = createShip(1);
    testGameboard.place(smallShip, { x: 0, y: 0 }, globalConsts.SHIP_DIRECTION);
    if (testGameboard.doesAttackHitAShip({ x: 0, y: 0 })) {
      testGameboard.receiveAttack({ x: 0, y: 0 });
    }
    expect(smallShip.isSunk).toBeTruthy();
    expect(testGameboard.board).toEqual([
      ['sunk', 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    testGameboard.resetBoard();
  });

  test('An empty board has no ships', () => {
    expect(testGameboard.doesBoardHaveShips()).toBeFalsy();
  });
});
