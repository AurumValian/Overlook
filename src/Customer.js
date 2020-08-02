import User from './User';

class Customer extends User {
  constructor(customer) {
    super(customer)
  }

  returnBookings(bookingData) {
    return bookingData.filter(booking => {
      return this.id === booking.userID;
    })
  }

  totalAmountSpent(bookingData, rooms) {
    const customerBookings = this.returnBookings(bookingData);
    return customerBookings.reduce((totalAmount, booking) => {
      const bookedRoom = rooms.find(room => {
        return booking.roomNumber === room.number;
      })
      return totalAmount + bookedRoom.costPerNight;
    }, 0)
  }
}

export default Customer;
