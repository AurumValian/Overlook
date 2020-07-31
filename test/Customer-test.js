import chai from 'chai';
import Customer from '../src/Customer';
const expect = chai.expect;

describe('Customer', () => {
  let users;
  let customer;
  before(() => {
    users = {"users":
    [{"id": 1, "name": "Leatha Ullrich"},
    {"id": 2, "name": "Rocio Schuster"},
    {"id": 3, "name": "Kelvin Schiller"}]
  };
    customer = new Customer(users.users[0]);
  })

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  })

  it('should create an instance of Customer', () => {
    expect(customer).to.be.an.instanceOf(Customer);
  })

  it('should have a name and id', () => {
    expect(customer.name).to.equal("Leatha Ullrich");
    expect(customer.id).to.equal(1);
  })

  it('should be able to return a string with the name', () => {
    expect(customer.sayHello()).to.equal("Hello, Leatha Ullrich!");
  })
})
