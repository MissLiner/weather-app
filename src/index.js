import './style.css';

const geoForm = document.getElementById('geo-form');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');
const submitBtn = document.getElementById('btn-submit');
let cityState = 'new+york,US-NY';
const weatherOutput = document.getElementById('weather-output');

// "api.openweathermap.org/data/2.5/weather?q=new+york,US-NY&appid=d2d96f2512c3f3f99ab4627f4c42e945";

function transformLocationData() {
  let city = cityInput.value;
  city = city.replace(/\s/g, '+');
  city = city.toLowerCase();
  let state = stateInput.value;
  state = 'US-' + state.toUpperCase();
  cityState = city + ',' + state;
  console.log(cityState);
}

(async function getWeather() {
  transformLocationData();
  const weatherLink = `https://api.openweathermap.org/data/2.5/weather?q=${cityState}&appid=d2d96f2512c3f3f99ab4627f4c42e945`;

  let response = await fetch(weatherLink, { mode: 'cors' });
  let responseJSON = await response.json();
  console.log(responseJSON);
  //weatherOutput.src = 
})()

submitBtn.addEventListener('click', () => {
  getWeather();
})