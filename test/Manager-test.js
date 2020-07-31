import chai from 'chai';
import Manager from '../src/Manager';
const expect = chai.expect;

describe('Manager', () => {
  let users;
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
    bookings = {"bookings": [
      {"id":"5fwrgu4i7k55hl6x8","userID":1,"date":"2020/01/11","roomNumber":20,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72q","userID":1,"date":"2020/01/19","roomNumber":19,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72u","userID":3,"date":"2020/02/17","roomNumber":4,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl72v","userID":32,"date":"2020/01/25","roomNumber":9,"roomServiceCharges":[]}
    ]}
    rooms = {"rooms": [
      {"number":3,"roomType":"single room","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":491.14},
      {"number":4,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":1,"costPerNight":429.44},
      {"number":5,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":2,"costPerNight":340.17},
      {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02}
    ]}
  })
