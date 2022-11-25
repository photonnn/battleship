// eslint-disable-next-line import/prefer-default-export
export function createPlayer(id) {
  /* Factory function for the player object

    Args:
    id -> String -> 'User' or 'AI'
  */

  function makeAIMove() {
    /* Make a random move for an AI */
  }
  return {
    id,
    makeAIMove,
  };
}
