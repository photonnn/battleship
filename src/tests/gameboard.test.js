import * as gameboard from '../gameboard';

describe('Gameboard factory function', () => {
  let testBoard;

  beforeAll(() => {
    testBoard = gameboard.createGameboard(4, 4);
  });

  test('gameboard factory fn creates an a x b board filled with 0s', () => {
    expect(testBoard.board).toEqual([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
  });
});
