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
    //.then(() =>  console.log('In time!'))
    .catch(() => console.log('Too long!'))
    .finally(() => clearTimeout(timer));
  //setTimeout(errorHandler('Request timed out, try again'), 5000);
}

// let getWeather = new Promise((resolve, reject) => {
//   const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&units=imperial&appid=d2d96f2512c3f3f99ab4627f4c42e945`;
//   fetch(weatherLink, { mode: 'cors' });
//   return 
// }
async function fetchWeather() {
  const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&units=imperial&appid=d2d96f2512c3f3f99ab4627f4c42e945`;
  const response = await fetch(weatherLink, { mode: 'cors' });
  let respJ = await response.json();
  console.log(respJ);
}
(function raceWeather() {
  timeout(fetchWeather(), 3000);
})()

// (async function raceWeather() {
//   const response = timeout(fetchWeather, 3000);
//   console.log(fetchedObj);
// })()

// function createReport(object) {
//   City = object.name,
//   Conditions = object.description,
//   Temp = object.temperature,
//   Humidity = object.humidity,
//   Wind = object.wind,
// }

// function createReport(loc, desc, temp, hum, wind) {
//   location = loc;
// }

//city
//temp
//description
//

submitBtn.addEventListener('click', () => {
  transformLocationData();
  getWeather();
})