import './style.css';

const geoForm = document.getElementById('geo-form');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const submitBtn = document.getElementById('btn-submit');
let cityState = 'new+york,US-NY';
const weatherOutput = document.getElementById('weather-output');
const location = document.getElementById('location');
const weatherIcon = document.getElementById('weather-icon');

function transformLocationData() {
  let city = cityInput.value;
  city = city.replace(/\s/g, '+');
  city = city.toLowerCase();
  let state = stateInput.value;
  state = 'US-' + state.toUpperCase();
  cityState = city + ',' + state;
  console.log(cityState);
}

function errorHandler(err) {
  alert(err);
}
const timeout = (prom, time) => {
  let timer;
  Promise.race([prom, new Promise((resolve, reject) => timer = setTimeout(reject, time))])
    .then(() =>  console.log('In time!'))
    .catch(() => errorHandler('Too long!'))
    .finally(() => clearTimeout(timer));
}
let currentWeather = {};

function createWeatherObj(obj, newObj) {
  newObj.City = obj.name;
  newObj.Conditions = obj.weather[0].main;
  newObj.Temp = obj.main.temp;
  newObj.Humidity = '';
  newObj.Wind = '';
}

function displayWeather(obj) {
  location.textContent = obj.City;
  for (const key in obj) {
    const newDiv = document.createElement('div');
    weatherOutput.appendChild(newDiv);
    newDiv.textContent = `${key}: ${obj[key]}`;
  }
}

async function fetchWeather() {
  const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&units=imperial&appid=d2d96f2512c3f3f99ab4627f4c42e945`;
  const response = await fetch(weatherLink, { mode: 'cors' });
  let respJ = await response.json();
  createWeatherObj(respJ, currentWeather);
  displayWeather(currentWeather);
  console.log(respJ);
}
(function raceWeather() {
  timeout(fetchWeather(), 3000);
})()

submitBtn.addEventListener('click', () => {
  transformLocationData();
  getWeather();
})