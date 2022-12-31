/*
  This file serves as a place for global constants and functions.

  Orginally came to be, because jest wouldn't work well with import 'style.css'.
*/
export const globalConsts = {
  MINIMUM_SHIP_LENGTH: 1,
  MAXIMUM_SHIP_LENGTH: 4,
  TEST_BOARD_SIZE: 4,
  BOARD_SIZE: 10,
  NUMBER_OF_SHIPS: 5,
  SHIP_DIRECTION: 'x',
  GAME_OVER: false,
  SOUND: 0.5,
  SHIP_PLACEMENT: 'manual', // manual / random
  // keeping a reference for removing event listners
  handleUserMove: 'listener',
  drop: 'listener',
  preventDefault: 'listener',
  removeHighlights: 'listener',
  highlightBlocks: 'listener',
  startGame: 'listener',
};

export const audioExplosion = () => {
  const audio = new Audio();
  audio.src = '../Assets/0epd6-wfoka.wav';
  audio.volume = globalConsts.SOUND;
  audio.play();
};

export const audioSplash = () => {
  const audio = new Audio();
  audio.src = '../Assets/Splash.mp3';
  audio.volume = globalConsts.SOUND;
  audio.play();
};
