import * as ship from '../ship';
import { globalConsts } from '../root';

describe('Ship factory function', () => {
  let shipOne;

  beforeAll(() => {
    shipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  });

  test('Ship with length and no hits is not sunk', () => {
    expect(shipOne.isSunk()).toBeFalsy();
  });

  test(`Ship length can only be in interval [${globalConsts.MINIMUM_SHIP_LENGTH}, ${globalConsts.MAXIMUM_SHIP_LENGTH}]`, () => {
    expect(shipOne.length).toBeGreaterThanOrEqual(globalConsts.MINIMUM_SHIP_LENGTH);
    expect(shipOne.length).toBeLessThanOrEqual(globalConsts.MAXIMUM_SHIP_LENGTH);
  });

  test('Ship with equal length and hitCounter is sunk', () => {
    let i = 0;
    while (i < shipOne.length) {
      shipOne.hit();
      i += 1;
    }
    expect(shipOne.isSunk()).toBeTruthy();
  });
});
