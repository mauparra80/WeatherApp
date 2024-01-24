
import {unitFormater} from "./unitFormater";

// private
function renderCurrent(currentWeather){
  // get formated units first
  const formatedTemp = unitFormater.getFormatedTemp();
  console.log(formatedTemp);

  // render current temps
  document.querySelector('#condition').textContent = currentWeather.condition_text;
  document.querySelector('#condition-icon').src = currentWeather.condition_icon;
  document.querySelector('#temperature').textContent = formatedTemp.currentTemp;
  document.querySelector('#wind').textContent = `${currentWeather.wind_mph} ${currentWeather.wind_dir}`;
  document.querySelector('#humidity').textContent = currentWeather.humidity;

  // render location and time
  document.querySelector('#name').textContent = currentWeather.name;
  document.querySelector('#region').textContent = currentWeather.region;
  document.querySelector('#country').textContent = currentWeather.country;
  document.querySelector('#date').textContent = currentWeather.date;
  document.querySelector('#time').textContent = currentWeather.time;

  // render forecast
  for (let i = 0; i < 3; i++){
    const curDay = document.querySelector(`#day${i+1}`);
    curDay.querySelector('.date').textContent = currentWeather.forecast[i].date;
    curDay.querySelector('.condition-icon').src = currentWeather.forecast[i].condition_icon;
    curDay.querySelector('.avgtemp').textContent = formatedTemp.formatedForecast[i].averageTemp
    curDay.querySelector('.highlow .hightemp').textContent = formatedTemp.formatedForecast[i].highTemp;
    curDay.querySelector('.lowtemp').textContent = formatedTemp.formatedForecast[i].lowTemp;

  }
}





export const render = {
  renderAll(currentWeather){
    renderCurrent(currentWeather);
  }
}

export default render;