const expect = require('expect');

const { isRealString } = require('./../utils/validation');

describe('isRealString', () => {
  it('should reject non-string value', () => {
    const name = 1223;
    const resp = isRealString(name);

    expect(resp).toBeFalsy();
  });

  it('should reject string with only spaces ', () => {
    const name = '   ';
    const resp = isRealString(name);

    expect(resp).toBeFalsy();
  });

  it('should allow string with non-space characters ', () => {
    const name = 'Admin';
    const resp = isRealString(name);

    expect(resp).toBeTruthy();
  });

});
