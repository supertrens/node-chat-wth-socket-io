const expect = require('expect');

const { Users } = require('./../utils/users');

describe('Users', () => {
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
    const newUser = users.addUser(
      currentUser.id,
      currentUser.name,
      currentUser.room
    );

    expect(newUser).toEqual(currentUser);
  });

  it('should return userName in "Love" chatroom', () => {
    const userList = users.getUserList('Love');

    expect(userList.length).toBe(2);
    expect(userList).toEqual(['Muneco', 'Muneca']);
  });

  it('should return userName in "Test" chatroom', () => {
    const userList = users.getUserList('Test');

    expect(userList.length).toBe(1);
    expect(userList).toEqual(['Admin']);
  });

  it('should find user', ()=> {
    const userID = 1;
    const user = users.getUser(userID);

    expect(user.id).toBe(userID);
  });

  it('should not find user', () => {
    const userID = 'invalidID';
    const user = users.getUser(userID);

    expect(user).toBeUndefined();
  });

  it('should remove userID 2 ', () => {
    const userID = 2;
    const user = users.removeUser(userID);

    expect(user.id).toBe(userID);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    const userID = 'invalidID';
    const user = users.removeUser(userID);

    expect(users.users.length).toBe(3);
    expect(user).toBeUndefined();
  });
});
