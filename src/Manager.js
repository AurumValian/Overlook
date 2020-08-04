import User from './User';
import Customer from './Customer';
class Manager extends User {
  constructor() {
    super({id: "manager", name: "Overlook Manager"})
  }

  totalRevenue(rooms, bookings, date) {
    const bookingsOnDate = bookings.filter(booking => {
      return booking.date === date;
    })
    return bookingsOnDate.reduce((totalRevenue, booking) => {
      const roomOfBooking = rooms.find(room => {
        return booking.roomNumber === room.number;
      })
      return roomOfBooking.costPerNight + totalRevenue;
    }, 0)
  }

  searchUsersByName(users, name) {
    const searchedUser = users.find(user => {
      return user.name === name;
    })
    if (searchedUser) {
      return searchedUser;
    } else {
      return false;
    }
  }
}

export default Manager;
