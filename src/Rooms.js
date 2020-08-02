class Rooms {
  constructor(rooms) {
    this.rooms = rooms;
  }

  availableRooms(bookings, date) {
    return this.rooms.filter(room => {
      return bookings.reduce((isAvailable, booking) => {
        if (room.number === booking.roomNumber && date === booking.date) {
          return false;
        } else {
          return isAvailable;
        }
      }, true)
    })
  }

  roomsOccupiedPercentage(bookings, date) {
    return Math.round(((this.availableRooms(bookings, date).length / this.rooms.length) - 1) * -100);
  }

  searchByType(type, bookings, date) {
    return this.rooms.filter(room => {
      const roomsAvailable = this.availableRooms(bookings, date);
      return (room.roomType === type && roomsAvailable.includes(room));
    })
  }
}

export default Rooms;
