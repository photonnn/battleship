/*
  This file serves as a place for global constants and functions.

  Orginally came to be, because jest wouldn't work well with import 'style.css'.
*/

// eslint-disable-next-line import/prefer-default-export
export const globalConsts = {
  MINIMUM_SHIP_LENGTH: 1,
  MAXIMUM_SHIP_LENGTH: 4,
  TEST_BOARD_SIZE: 4,
  BOARD_SIZE: 10,
  NUMBER_OF_SHIPS: 5,
  SHIP_DIRECTION: 'x',
  GAME_OVER: false,
  SOUND: 50,
  handleMove: 'listener', // we keep a reference, so we can remove it
};
