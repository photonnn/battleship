// eslint-disable-next-line import/prefer-default-export
export function createShip(length) {
  /* A factory function for the ship object */
  return {
    length,
    hitCounter: 0,
    hit() {
      this.hitCounter += 1;
    },
    isSank() {
      return this.hitCounter >= this.length;
    },
  };
}
