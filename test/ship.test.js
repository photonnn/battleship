import * as ship from '../src/ship';
import { globalConsts } from '../src/root';

test('Ship with length and no hits is not sank', () => {
  const shipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  expect(shipOne.isSunk()).toBeFalsy();
});

test(`Ship can only be length [${globalConsts.MINIMUM_SHIP_LENGTH}, ${globalConsts.MAXIMUM_SHIP_LENGTH}]`, () => {
  const shipOne = ship.createShip(Math.floor(Math.random() * globalConsts.MAXIMUM_SHIP_LENGTH) + 1);
  expect(shipOne.length).toBeGreaterThanOrEqual(globalConsts.MINIMUM_SHIP_LENGTH);
  expect(shipOne.length).toBeLessThanOrEqual(globalConsts.MAXIMUM_SHIP_LENGTH);
});
