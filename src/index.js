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
  newObj.Humidity = obj.main.humidity;
  newObj.Wind = obj.wind.speed;
}

function displayWeather(obj) {
  const dataContainer = document.getElementById('data-container');
  while (dataContainer.firstChild) {
    dataContainer.removeChild(dataContainer.firstChild);
  }
  for (const key in obj) {
    if (key === 'City') {
      const cityName = document.getElementById('city-name');
      cityName.textContent = `${obj[key]}`;
    } else {
      const keyDiv = document.createElement('div');
      const dataDiv = document.createElement('div');
      keyDiv.classList.add('data-key');
      dataDiv.classList.add('data-info');
      dataContainer.appendChild(keyDiv);
      dataContainer.appendChild(dataDiv);
      keyDiv.textContent = `${key}: `;
      dataDiv.textContent = `${obj[key]}`;
    }
  }
}
function setImage(temp) {
  const weatherPic = document.getElementById('weather-pic');
  if (temp < 32) {
    weatherPic.src = 'icicles.jpg';
  }
  else if (temp < 48) {
    weatherPic.src = 'brrr!-cold.jpg';
  }
  else if (temp < 65) {
    weatherPic.src = 'chilly-weather.jpeg';
  }
  else if (temp < 85) {
    weatherPic.src = 'just-right-temp.png';
  } else {
    weatherPic.src = 'too-hot.gif';
  }
}

async function fetchWeather() {
  const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&units=imperial&appid=d2d96f2512c3f3f99ab4627f4c42e945`;
  const response = await fetch(weatherLink, { mode: 'cors' });
  let respJ = await response.json();
  createWeatherObj(respJ, currentWeather);
  displayWeather(currentWeather);
  setImage(currentWeather.Temp);
  console.log(respJ);
}
function raceWeather() {
  timeout(fetchWeather(), 3000);
}
raceWeather();

submitBtn.addEventListener('click', () => {
  transformLocationData();
  raceWeather();
})