class User {
  constructor(user) {
    this.id = user.id;
    this.name = user.name
  }

  sayHello() {
    return `Hello, ${this.name}!`
  }
}

export default User;
