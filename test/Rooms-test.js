const chai = require('chai');
import Rooms from '../src/Rooms.js';
const expect = chai.expect;


describe('Rooms', () => {
  let rooms;
  let bookings;
  before(() => {
    rooms = new Rooms([
      {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
      {"number":7,"roomType":"single room","bidet":false,"bedSize":"queen","numBeds":2,"costPerNight":231.46},
      {"number":8,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":261.26},
      {"number":9,"roomType":"single room","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":200.39}
    ])
    bookings = [
      {"id":"5fwrgu4i7k55hl6t7","userID":20,"date":"2020/02/16","roomNumber":7,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t8","userID":1,"date":"2020/02/05","roomNumber":6,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6t9","userID":38,"date":"2020/02/14","roomNumber":14,"roomServiceCharges":[]},
      {"id":"5fwrgu4i7k55hl6ta","userID":25,"date":"2020/02/16","roomNumber":9,"roomServiceCharges":[]}
    ]
  })

  it('should be a function', () => {
    expect(Rooms).to.be.a('function');
  })

  it('should create an instance of Rooms', () => {
    expect(rooms).to.be.an.instanceOf(Rooms);
  })

  it('should be able to find available rooms on a given day', () => {
    const date = "2020/02/16";
    const roomsAvailable = rooms.availableRooms(bookings, date);
    expect(roomsAvailable).to.deep.equal(
      [
        {"number":6,"roomType":"junior suite","bidet":true,"bedSize":"queen","numBeds":1,"costPerNight":397.02},
        {"number":8,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":261.26}
      ]
    )
  })

  it('should be able to return the percentage of rooms occupied for a given date', () => {
    const date = "2020/02/05";
    const percentageOfRoomsOccupied = rooms.roomsOccupiedPercentage(bookings, date);
    expect(percentageOfRoomsOccupied).to.equal(25);
  })

  it('should be able to search available rooms by type', () => {
    const date = "2020/02/05";
    const searchedRoomsByType = rooms.searchByType('junior suite', bookings, date)
    expect(searchedRoomsByType).to.deep.equal([{"number":8,"roomType":"junior suite","bidet":false,"bedSize":"king","numBeds":1,"costPerNight":261.26}])
  })
})
