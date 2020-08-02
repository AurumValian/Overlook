import chai from 'chai';
import Customer from '../src/Customer';
const expect = chai.expect;

describe('Customer', () => {
  let users;
  let customer;
  let bookings;
  let rooms;
  before(() => {
    users = {"users":
    [{"id": 1, "name": "Leatha Ullrich"},
    {"id": 2, "name": "Rocio Schuster"},
    {"id": 3, "name": "Kelvin Schiller"}]
  };
    customer = new Customer(users.users[0]);
    bookings = [
      {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2020/01/11","roomNumber":3,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72q","userID":1,"date":"2020/01/19","roomNumber":6,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72u","userID":3,"date":"2020/02/17","roomNumber":4,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72v","userID":32,"date":"2020/01/25","roomNumber":9,"roomServiceCharges":[]}
    ]
    rooms = [
      {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
      {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
      {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
      {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02}
    ]
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

  it('should be able to return its room bookings', () => {
    let customerBookings = customer.returnBookings(bookings);
    expect(customerBookings).to.deep.equal(
      [
        {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2020/01/11","roomNumber":3,"roomServiceCharges":[]},
        {"id":"5fwrgu4i7k55hl72q","userID":1,"date":"2020/01/19","roomNumber":6,"roomServiceCharges":[]}
      ]
    )
  })

  it('should be able to see how much they have spent on rooms', () => {
    expect(customer.totalAmountSpent(bookings, rooms)).to.equal(888.16);
  })

  it('should be able to filter rooms by type', () => {

  })
})
