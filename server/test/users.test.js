const expect = require('expect');

const { Users } = require('./../utils/users');

describe('User', () => {
  let users;
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: 'Admin',
        room: 'Test'
      },
      {
        id: 2,
        name: 'Muneco',
        room: 'Love'
      },
      {
        id: 3,
        name: 'Muneca',
        room: 'Love'
      }
    ];
  });

  it('should add new user', () => {
    const currentUser = {
      id: 123,
      name: 'Peter',
      room: 'TestMe'
    };
    const newUser = users.addUser(currentUser.id, currentUser.name, currentUser.room);

    expect(newUser).toEqual(currentUser);
  });

  it('should return a list of user' , () => {
    const userList = users.getUserList('Love');

    expect(userList.length).toBe(2);
  });
});
