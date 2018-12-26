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
    const userToBeRemoved = this.getUser(id)

    if(userToBeRemoved){
      this.users = this.users.filter(user => {
        return user !== userToBeRemoved;
      });
    }

    return userToBeRemoved;
  }

  getUser(id) {
    // find the user with the given Id and return it
    return this.users.filter(user => {
      return user.id === id;
    })[0];
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
