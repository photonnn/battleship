// eslint-disable-next-line import/prefer-default-export
export function createGameboard(width, height) {
  /*  Factory function for the gameboard object

      Args:
      width -> board width
      height -> board height
  */

  return {
    board: Array(width).fill(0).map(() => Array(height).fill(0)),
  };
}
