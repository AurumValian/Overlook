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

  roomsOccupiedPercentage() {
    return Math.round(this.availableRoomsToday(loadData.bookings).length / this.rooms.length);
  }

  searchByType(type, date, bookings) {
    return this.rooms.filter(room => {
      const roomsAvailable = availableRooms(bookings, date);
      return (room.roomType === type && roomsAvailable.includes(room));
    })
  }
}

export default Rooms;
