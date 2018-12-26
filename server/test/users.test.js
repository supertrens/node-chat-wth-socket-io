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
    const user = users.getUser(1);

    expect(user.length).toBe(1);
    expect(user[0].name).toBe('Admin');
  });

  it('should not find user', () => {
    const user = users.getUser('invalidID');
    
    expect(user.length).toBe(0);
  })
});
