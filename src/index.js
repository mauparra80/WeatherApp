import "./styles/style.css";
import {APImanager} from './modules/API-manager'
import { unitFormater } from "./modules/unitFormater";
import {render} from "./modules/render";










// const locationInput = document.querySelector('#locationInput');
// const submitBtn = document.querySelector('#submitLocation');

// const apiKey = 'f1213f6820a94d9588f171450241601';


  
// async function fetchWeather(location){
//   try {
//     const jsonData = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`);
//     const data = await jsonData.json();
//     return data;
//   } catch (error) {console.error('Error fetching weather data: ', error.message);}
// };

APImanager.init()
  
// searchbar
const locationInput = document.querySelector('#locationInput');
const submitBtn = document.querySelector("#submitLocation");
// get input, fetch weather, then print weather
submitBtn.addEventListener('click', () => {
  if(locationInput.value !== ''){
    APImanager.fetchWeather(locationInput.value);
  }
})

// unit toggle button
const unitBtn = document.querySelector('#unitToggle');
unitBtn.addEventListener('click', () => {
  unitFormater.toggleTempUnits();
  render.renderAll(APImanager.getCurrentWeatherArray());
})

