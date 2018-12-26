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

  removeUser(id){

  }

  getUser(id){

  }

  getUserList(room) {
    const users = this.users.filter(user => {
      return user.room === room;
    });

    return users;
  }
}

module.exports = {
  Users
}

