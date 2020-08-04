// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';
import User from './User';
import Manager from './Manager';
import Customer from './Customer';
import Rooms from './Rooms';
const moment = require("moment");
// An example of how you tell webpack to use an image (also need to link to it in the index.html)

const dateToday = moment(Date.now()).format("YYYY/MM/DD");

const userWelcome = document.querySelector('.user-welcome');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');
const loginError = document.querySelector('.login-error-message');
const customerBookingInformation = document.querySelector('.booking-area');
const customerSpendingInformation = document.querySelector('.amount-spent-area');
const customerPage = document.querySelector('.customer-page');
const managerPage = document.querySelector('.manager-page');
const availableRoomsArea = document.querySelector('.available-rooms-area');
const revenueArea = document.querySelector('.revenue-area');
const percentageOccupiedArea = document.querySelector('.percentage-occupied-area');
const dateInput = document.querySelector('.date-input');
const singleRoomButton = document.querySelector('.single-room-button');
const juniorSuiteButton = document.querySelector('.junior-suite-button');
const residentialSuiteButton = document.querySelector('.residential-suite-button');
const suiteButton = document.querySelector('.suite-button');
const customerNameInput = document.querySelector('.customer-name-input');
const searchUsersButton = document.querySelector('.submit-search-users-button');
const searchedRoomsPage = document.querySelector('.searched-rooms');
const managerInteractionPage = document.querySelector('.manager-interaction-page');
const deleteRoomInput = document.querySelector('.delete-room-input');
const deleteDateInput = document.querySelector('.delete-date-input');
const deleteBookingButton = document.querySelector('.delete-button');

dateInput.defaultValue = "2020-01-01";
deleteDateInput.defaultValue = "2020-01-01";

let loadData = {};
let user;
let rooms;
let puppet;
window.onload = loadRuntime;
window.addEventListener('click', clickWrangler);
searchedRoomsPage.addEventListener('click', bookingClickWrangler);

function clickWrangler(event) {
  const bookRoomButtons = document.querySelectorAll('.book-room-button');
  if (event.target === loginButton) {
    event.preventDefault();
    rooms = new Rooms(loadData.rooms);
    const username = usernameInput.value;
    const password = passwordInput.value;
    logIn(username, password);
  }
  if (event.target === singleRoomButton) {
    event.preventDefault();
    customerSearchRooms('single room', moment(dateInput.value).format("YYYY/MM/DD"));
  }
  if (event.target === juniorSuiteButton) {
    event.preventDefault();
    customerSearchRooms('junior suite', moment(dateInput.value).format("YYYY/MM/DD"));
  }
  if (event.target === residentialSuiteButton) {
    event.preventDefault();
    customerSearchRooms('residential suite', moment(dateInput.value).format("YYYY/MM/DD"));
  }
  if (event.target === suiteButton) {
    event.preventDefault();
    customerSearchRooms('suite', moment(dateInput.value).format("YYYY/MM/DD"));
  }
  if (event.target === searchUsersButton) {
    event.preventDefault();
    showSearchedCustomer(customerNameInput.value);
  }
  if (event.target === deleteBookingButton) {
    event.preventDefault();
    const bookingID = findBookingID(moment(deleteDateInput.value).format("YYYY/MM/DD"), deleteRoomInput.value, puppet.id);
    deleteBooking(bookingID);
  }
}

function bookingClickWrangler(event) {
  const bookRoomButtons = document.querySelectorAll('.book-room-button');
  bookRoomButtons.forEach(button => {
    if (button === event.target) {
      const roomText = event.target.closest(".room-card").children[0].innerText;
      const roomNumber = Number(roomText.slice(-1));
      let bookingObject;
      if (user.id === "manager") {
        bookingObject = buildBookingObject(puppet.id, moment(dateInput.value).format("YYYY/MM/DD"), roomNumber);
      } else {
        bookingObject = buildBookingObject(user.id, moment(dateInput.value).format("YYYY/MM/DD"), roomNumber);
      }
      postNewBooking(bookingObject);
    }
  })
}

//https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users - user data endpoint
//https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms - room data endpoint
//https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings - booking data endpoint
function loadRuntime() {
  fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users', 'users');
  fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms', 'rooms');
  fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', 'bookings');
}

function fetchData(url, keyName) {
  return fetch(url)
    .then(response => response.json())
    .then(response => {
      loadData[keyName] = response[keyName];
    })
    .catch(error => console.log(error));
}

function logIn(username, password) {
  const loginValue = validateLogin(username, password);
  if (loginValue === 'manager') {
    renderManagerPage();
  } else if (0 < loginValue && loginValue <= 50) {
    renderCustomerPage(loginValue);
  } else {
    renderLoginErrorMessage();
  }
}

function validateLogin(username, password) {
  if (password !== 'overlook2020') {
    return false;
  } else if (username.includes('customer')) {
    const customerID = Number(username.slice(-2));
    return customerID;
  } else if (username === 'manager') {
    return 'manager';
  } else {
    return false;
  }
}

function findUser(id) {
  return loadData.users.find(user => {
    return user.id === id;
  })
}

function renderManagerPage() {
  user = new Manager();
  renderManagerDashboard();
  userWelcome.innerText = user.sayHello();
  loginForm.style.display = "none";
  managerPage.style.display = "grid";
}

function renderManagerDashboard() {
  const roomsAvailable = rooms.availableRooms(loadData.bookings, dateToday).length;
  availableRoomsArea.innerText = `Number of Rooms Available: ${roomsAvailable}`;
  const totalRevenue = user.totalRevenue(rooms.rooms, loadData.bookings, dateToday);
  revenueArea.innerText = `Amount Earned Today : $${totalRevenue.toFixed(2)}`;
  const percentageOccupied = rooms.roomsOccupiedPercentage(loadData.bookings, dateToday);
  percentageOccupiedArea.innerText = `Percent of Rooms Occupied Today: ${percentageOccupied}%`;
}

function renderCustomerPage(loginValue) {
  user = new Customer(findUser(loginValue));
  renderCustomerDashboard(user);
  userWelcome.innerText = user.sayHello();
  loginForm.style.display = "none";
  customerPage.style.display = "grid";
}

function renderCustomerDashboard(user) {
  const userBookings = user.showSpecificBookings(loadData.bookings).join('\n');
  customerBookingInformation.innerText = `Your Bookings: \n ${userBookings}`;
  const customerAmountSpent = user.totalAmountSpent(loadData.bookings, rooms.rooms).toFixed(2);
  customerSpendingInformation.innerText = `Amount Spent on Rooms: $${customerAmountSpent}`;
}

function renderLoginErrorMessage() {
  loginError.style.display = "block";
  setTimeout(() => {
    loginError.style.display = "none"
  }, 2500)
}

function customerSearchRooms(type, date) {
  if (!date || date <= dateToday) {
    searchedRoomsPage.innerHTML = `
      <p class="date-error">Please enter a date after ${dateToday}</p>
      `
  } else {
    const roomsFound = rooms.searchByType(type, loadData.bookings, date);
    searchedRoomsPage.innerHTML = "";
    if (roomsFound.length === 0) {
      searchedRoomsPage.innerHTML = "<p class='no-rooms-message'>We are SO, SO, SO SORRY!\nWe apologize for the inconvenience, but there are no available rooms for that room type.\nPlease select a different room type or date.</p>"
    } else {
      roomsFound.forEach(room => {
      renderRoomFound(room);
      })
    }
  }
}

function renderRoomFound(room) {
  searchedRoomsPage.innerHTML += `
  <article class="room-card">
    <p class="room-number">Room ${room.number}<p><br>
    <p class="bidet">Bidet: ${room.bidet ? "yes" : "no"}</p><br>
    <p class="bed-size">Bed Size: ${room.bedSize}</p><br>
    <p class="num-beds">Number of Beds: ${room.numBeds}</p><br>
    <p class="price">Price: $${room.costPerNight}</p><br>
    <button class="book-room-button">Book Room</button>
  </article>
  `
}

function showSearchedCustomer(name) {
  const searchedCustomer = user.searchUsersByName(loadData.users, name);
  puppet = new Customer(searchedCustomer);
  renderCustomerDashboard(puppet);
  customerPage.style.display = "grid";
  renderManagerInteractions();
}

function renderManagerInteractions() {
  managerPage.style.display = "none";
  managerInteractionPage.style.display = "block";
}

function buildBookingObject(user, date, roomNumber) {
  return {
    "userID": user,
    "date": date,
    "roomNumber": roomNumber
  }
}

function postNewBooking(newBooking) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'POST',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(newBooking)
  })
    .then(response => response.json())
    .catch(error => console.log(error));
}

function findBookingID(date, roomNumber, id) {
  if (date > dateToday) {
    let foundBooking = loadData.bookings.find(booking => {
      // console.log(Number(roomNumber))
      // console.log(booking.date, date, booking.roomNumber, roomNumber, booking.userID, id);
      return booking.date === date && booking.roomNumber === Number(roomNumber) && booking.userID === id;
    })
    return { "id": foundBooking.id };
  } else {
    return false;
  }
}

function deleteBooking(bookingID) {
  fetch('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', {
    method: 'DELETE',
    headers: {
      'content-Type': 'application/json'
    },
    body: JSON.stringify(bookingID)
  })
  .then(response => response.json())
  .catch(error => console.log(error));
}
