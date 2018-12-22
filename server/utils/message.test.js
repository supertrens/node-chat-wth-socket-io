const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'Me';
    const text = 'This is a test';
    const resp = generateMessage(from, text);

    expect(resp.from).toBe(from);
    expect(resp.text).toBe(text);
    expect(typeof resp.createdAt).toBe('number');
  });
});
