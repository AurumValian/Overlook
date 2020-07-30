import chai from 'chai';
import User from '../src/User.js';
const expect = chai.expect;

describe('User', () => {
  let user;
  let users;
  before(() => {
    users = {"users":
    [{"id": 1, "name": "Leatha Ullrich"},
    {"id": 2, "name": "Rocio Schuster"},
    {"id": 3, "name": "Kelvin Schiller"}]
  };
    user = new User(users.users[1]);
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  })

  it('should instantiate a user object', () => {
    expect(user).to.be.an.instanceOf(User);
  })

  it('should have an id', () => {
    expect(user.id).to.equal(2);
  })

  it('should have a name', () => {
    expect(user.name).to.equal("Rocio Schuster");
  })

  it('should be able to have a different id and name', () => {
    user = new User(users.users[0]);
    expect(user.id).to.equal(1);
    expect(user.name).to.equal("Leatha Ullrich");
  })

  it('should be able to return a string with the name', () => {
    expect(user.sayHello()).to.equal("Hello, Rocio Shuster!");
  })
})
