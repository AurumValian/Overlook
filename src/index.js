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

moment().format("YYYY/MM/DD");

const dateToday = "2020/01/27";
const userWelcome = document.querySelector('.user-welcome');
const loginForm = document.querySelector('.login-form');
const usernameInput = document.querySelector('.username-input');
const passwordInput = document.querySelector('.password-input');
const loginButton = document.querySelector('.login-button');
const loginError = document.querySelector('.login-error-message');
const customerBookingInformation = document.querySelector('.booking-area');
const customerSpendingInformation = document.querySelector('.amount-spent-area');
const customerPage = document.querySelector('.customer-page');

let loadData = {};
let user;
let rooms;
window.onload = loadRuntime;
window.addEventListener('click', clickWrangler);

function clickWrangler(event) {
  if (event.target === loginButton) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    logIn(username, password);
  }
}

//https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users - user data endpoint
//https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms - room data endpoint
//https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings - booking data endpoint
function loadRuntime() {
  fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/users/users', 'users');
  fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/rooms/rooms', 'rooms');
  fetchData('https://fe-apps.herokuapp.com/api/v1/overlook/1904/bookings/bookings', 'bookings');
  rooms = new Rooms(loadData.rooms);
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

}

function renderCustomerPage(loginValue) {
  user = new Customer(findUser(loginValue));
  customerBookingInformation.innerText = user.returnBookings(loadData.bookings);
  customerSpendingInformation.innerText = user.totalAmountSpent(loadData.bookings, rooms.rooms);
  userWelcome.innerText = user.sayHello();
  loginForm.style.display = "none";
  customerPage.style.display = "grid";

}

function renderLoginErrorMessage() {
  loginError.style.display = "block";
  setTimeout(() => {
    loginError.style.display = "none"
  }, 2500)
}
