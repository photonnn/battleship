import * as player from '../player';

describe('Player factory function', () => {
  let botOne;

  beforeAll(() => {
    botOne = player.createPlayer('AI');
  });

  test('Bot makes a legal random move', () => {
    expect(botOne);
  });
});
