// eslint-disable-next-line import/prefer-default-export
export function createShip(length) {
  /* A factory function for the ship object */
  return {
    length,
    hitCounter: 0,
    hit() {
      this.hitCounter += 1;
    },
    isSunk() {
      // although >= works better more time, if === doesn't work that
      // must mean, there is a logic problem, which jest tests for
      return this.hitCounter === this.length;
    },
  };
}
