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

const loginError = document.querySelector('.login-error-message');
let loadData = {};
let user;
window.onload = loadRuntime;
console.log('This is the JavaScript entry file - your code begins here.');

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
  } else if (0 < loginValue <= 50) {
    renderCustomerPage(loginValue);
  } else {
    renderLoginErrorMessage();
  }
}

function validateLogin(username, password) {
  if (password !== 'overlook2020') {
    return false;
  } else if (username.includes('customer')) {
    const customerID = username.slice(-2);
    return Number(customerID);
  } else if (username === 'manager') {
    return 'manager';
  } else {
    return false;
  }
}

function renderManagerPage() {

}

function renderCustomerPage(loginValue) {

}

function renderLoginErrorMessage() {
  loginError.style.display = "block";
  setTimeout(() => {
    loginError.style.display = "none"
  }, 2500)
}
