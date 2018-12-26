[
  {
    id: 'fs',
    name: 'Peter',
    room: 'The office Fans'
  }
];

class Users {
  constructor() {
    this.users = [];
  }

  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);

    return user;
  }

  removeUser(id) {
  }

  getUser(id) {
    // find the user with the given Id and return it
    return this.users.filter(user => {
      return user.id === id;
    });
  }

  getUserList(room) {
    const users = this.users.filter(user => {
      return user.room === room;
    });

    const namesArray = users.map(user => {
      return user.name;
    });

    return namesArray;
  }
}

module.exports = {
  Users
};
