import * as ship from '../src/ship';

test('Ship with length and no hits is not sank', () => {
  // A ship may have a size of [1, 5]
  const shipOne = ship.createShip(Math.floor(Math.random() * 4) + 1);
  expect(shipOne.isSank()).toBeFalsy();
});
