import chai from 'chai';
import Customer from '../src/Customer';
import Manager from '../src/Manager';
const expect = chai.expect;

describe('Manager', () => {
  let users;
  let customer;
  let manager;
  let bookings;
  let rooms;
  before(() => {
    users = {"users":
    [{"id": 1, "name": "Leatha Ullrich"},
    {"id": 2, "name": "Rocio Schuster"},
    {"id": 3, "name": "Kelvin Schiller"}]
  };
  manager = new Manager();
  customer = new Customer(users.users[0]);
  bookings = [
    {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2020/01/11","roomNumber":20,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl72q","userID":1,"date":"2020/01/19","roomNumber":19,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl72u","userID":3,"date":"2020/02/17","roomNumber":4,"roomServiceCharges":[]},
    {"id":"5fwrgu4i7k55hl72v","userID":32,"date":"2020/01/25","roomNumber":9,"roomServiceCharges":[]}
  ]
  rooms = [
    {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
    {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
    {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
    {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02}
  ]
});
  it('should be a function', () => {
    expect(Manager).to.be.a('function');
  })

  it('should create an instance of Manager', () => {
    expect(manager).to.be.an.instanceOf(Manager);
  })

  it('should have an ID of manager', () => {
    expect(manager.id).to.equal("manager");
  })

  it('should have a name of Overlook Manager', () => {
    expect(manager.name).to.equal("Overlook Manager");
  })

  it('should be able to see total revenue for a given day', () => {
    const date = "2020/02/17";
    const revenue = manager.totalRevenue(rooms, bookings, date);
    expect(revenue).to.equal(429.44);
  })

  it('should be able to search for customers by name', () => {
    let searchedCustomer = manager.searchUsersByName(users.users, "Leatha Ullrich");
    expect(searchedCustomer).to.deep.equal(customer);
  })
})
