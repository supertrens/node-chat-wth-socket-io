const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object for new message', () => {
    const from = 'Me';
    const text = 'This is a test';
    const resp = generateMessage(from, text);

    expect(resp.from).toBe(from);
    expect(resp.text).toBe(text);
    expect(typeof resp.createdAt).toBe('number');
  });
});

describe('generateLocationMessage', () =>{
  it('should generate correct message object for location', ()=> {
    const from = 'Admin';
    const url ='https://www.google.com/maps?q=123,456';

    const resp = generateLocationMessage(from, 123, 456);
    expect(resp.from).toBe(from);
    expect(resp.url).toBe(url);
    expect(typeof resp.createdAt).toBe('number');
  });
});
