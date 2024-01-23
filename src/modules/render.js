
// private
function renderCurrent(currentWeather){
  document.querySelector('#condition').textContent = currentWeather.condition_text;
  document.querySelector('#condition-icon').src = currentWeather.condition_icon;
  document.querySelector('#temperature').textContent = currentWeather.temperature_f; // needs to be updated to use c/f
  document.querySelector('#wind').textContent = `${currentWeather.wind_mph} ${currentWeather.wind_dir}`;
  document.querySelector('#humidity').textContent = currentWeather.humidity;

  // update location and time
  document.querySelector('#name').textContent = currentWeather.name;
  document.querySelector('#region').textContent = currentWeather.region;
  document.querySelector('#country').textContent = currentWeather.country;
  document.querySelector('#date').textContent = currentWeather.date;
  document.querySelector('#time').textContent = currentWeather.time;

  // update forecast
  for (let i = 0; i < 3; i++){
    const curDay = document.querySelector(`#day${i+1}`);
    curDay.querySelector('.date').textContent = currentWeather.forecast[i].date;
    curDay.querySelector('.condition-icon').src = currentWeather.forecast[i].condition_icon;
    curDay.querySelector('.avgtemp').textContent = currentWeather.forecast[i].avgtemp_f;// need to select f/c temp
    curDay.querySelector('.highlow .hightemp').textContent = currentWeather.forecast[i].hightemp_f;
    curDay.querySelector('.lowtemp').textContent = currentWeather.forecast[i].lowtemp_f;

  }
}





export const render = {
  renderAll(currentWeather){
    renderCurrent(currentWeather);
  }
}

export default render;