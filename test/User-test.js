import chai from 'chai';
import User from '../src/User.js';
const expect = chai.expect;

describe('User', () => {
  before(() => {
    const users = {"users":
    [{"id": 1, "name": "Leatha Ullrich"},
    {"id": 2, "name": "Rocio Schuster"},
    {"id": 3, "name": "Kelvin Schiller"}]
  };
    const user = new User();
  })

  it('should be a function', () => {
    expect(User).to.be.a('function');
  })
})
