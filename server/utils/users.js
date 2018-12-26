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
}

module.exports = {
  Users
}

