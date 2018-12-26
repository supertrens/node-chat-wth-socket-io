const expect = require('expect');

const { Users } = require('./../utils/users');

describe('addUser', () => {
  it('should add new user', () => {
    const users = new Users();
    const user = {
      id: 1,
      name: 'Admin',
      room: 'Test'
    };
    const newUser = users.addUser(user.id, user.name, user.room);

    expect(newUser).toEqual(user);
  });
});
