import * as player from '../player';

describe('Player factory function', () => {
  let botOne;

  beforeAll(() => {
    botOne = player.createPlayer('AI');
  });

  test("Bot doesn't do anything", () => {
    expect(botOne);
  });
});
