import * as ship from '../src/ship';
import { globalConsts } from '../src/root';

test('Ship with length and no hits is not sunk', () => {
  const shipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  expect(shipOne.isSunk()).toBeFalsy();
});

test(`Ship can only be length [${globalConsts.MINIMUM_SHIP_LENGTH}, ${globalConsts.MAXIMUM_SHIP_LENGTH}]`, () => {
  const shipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  expect(shipOne.length).toBeGreaterThanOrEqual(globalConsts.MINIMUM_SHIP_LENGTH);
  expect(shipOne.length).toBeLessThanOrEqual(globalConsts.MAXIMUM_SHIP_LENGTH);
});

test('Ship with equal length and hitCounter is sunk', () => {
  const shipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  let i = 0;
  while (i < shipOne.length) {
    shipOne.hit();
    i += 1;
  }
  expect(shipOne.isSunk()).toBeTruthy();
});
