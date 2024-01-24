import { format, parseISO } from 'date-fns';
import {render} from "./render";
import {unitFormater} from './unitFormater';


// private
const apiKey = 'f1213f6820a94d9588f171450241601';

// weather object to hold extracted api data
const currentWeatherArray = {
  // current weather
  temperature_c: '',
  temperature_f: '',
  condition_text: '',
  condition_icon: '',
  wind_mph: '',
  wind_dir: '',
  humidity: '',

  // date and time
  name: '',
  region: '',
  country: '',
  date: '',
  time: '' ,

  // forecast
  forecast: [
    {
      date: '',
      condition_icon: '',
      avgtemp_f: '',
      avgtemp_c: '',
      hightemp_f: '',
      hightemp_c: '',
      lowtemp_f: '',
      lowtemp_c: '',
    },
    {
      date: '',
      condition_icon: '',
      avgtemp_f: '',
      avgtemp_c: '',
      hightemp_f: '',
      hightemp_c: '',
      lowtemp_f: '',
      lowtemp_c: '',
    },
    {
      date: '',
      condition_icon: '',
      avgtemp_f: '',
      avgtemp_c: '',
      hightemp_f: '',
      hightemp_c: '',
      lowtemp_f: '',
      lowtemp_c: '',
    }
  ]
}



// extract and save weather data to object
function extractCurrentWeather(rawWeatherData){
  currentWeatherArray.temperature_c = rawWeatherData.current.temp_c;
  currentWeatherArray.temperature_f = rawWeatherData.current.temp_f;
  currentWeatherArray.condition_text  = rawWeatherData.current.condition.text;
  currentWeatherArray.condition_icon  = rawWeatherData.current.condition.icon;
  currentWeatherArray.wind_mph = rawWeatherData.current.wind_mph;
  currentWeatherArray.wind_dir = rawWeatherData.current.wind_dir;
  currentWeatherArray.humidity = rawWeatherData.current.humidity;

  currentWeatherArray.name = rawWeatherData.location.name;
  currentWeatherArray.region = rawWeatherData.location.region;
  currentWeatherArray.country = rawWeatherData.location.country;
  const timeTemp = rawWeatherData.location.localtime.split(' ');
  [currentWeatherArray.date, currentWeatherArray.time] = timeTemp;

  for (let i=0; i<3; i++)
  {
    // format date
    const numericalDate = rawWeatherData.forecast.forecastday[i].date;
    const parsedDate = parseISO(numericalDate);
    currentWeatherArray.forecast[i].date = format(parsedDate, 'MMM do');


    currentWeatherArray.forecast[i].condition_icon = rawWeatherData.forecast.forecastday[i].day.condition.icon;
    currentWeatherArray.forecast[i].avgtemp_c = rawWeatherData.forecast.forecastday[i].day.avgtemp_c;
    currentWeatherArray.forecast[i].avgtemp_f = rawWeatherData.forecast.forecastday[i].day.avgtemp_f;
    currentWeatherArray.forecast[i].hightemp_c = rawWeatherData.forecast.forecastday[i].day.maxtemp_c;
    currentWeatherArray.forecast[i].hightemp_f = rawWeatherData.forecast.forecastday[i].day.maxtemp_f;
    currentWeatherArray.forecast[i].lowtemp_c = rawWeatherData.forecast.forecastday[i].day.mintemp_c;
    currentWeatherArray.forecast[i].lowtemp_f = rawWeatherData.forecast.forecastday[i].day.mintemp_f;
  };

  
}


async function retrieveWeather(location){
  try{
  const jsonData = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3&aqi=no&alerts=no`);
  const weatherData = await jsonData.json();
  return weatherData;
  } catch (error) { console.error('Error fetching weather data: ', error.message);
  }
  return'';
}


// public
export const APImanager = {
  init(){
    this.fetchWeather("houston")
      .then(() => {
        unitFormater.init();
        render.renderAll(currentWeatherArray);
      })
      .catch(error => {
      console.error('Error during initialization:', error);
      });
  },
  
  // fetch current weather from weatherapi.com
  async fetchWeather(location){
      const weatherData = await retrieveWeather(location);
      extractCurrentWeather(weatherData);
      render.renderAll(currentWeatherArray);
  },

  getCurrentWeatherArray(){
    return currentWeatherArray;
  }
  

 

}


export default APImanager;