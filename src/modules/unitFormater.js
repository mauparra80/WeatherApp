import {APImanager} from "./API-manager";

// private
const formatedTempUnits = {
  unit: 'C$deg',
  currentTemp: '',
  formatedForecast: [
    {
      averageTemp: '',
      highTemp: '',
      lowTemp: '',
    },
    {
      averageTemp: '',
      highTemp: '',
      lowTemp: '',
    },
    {
      averageTemp: '',
      highTemp: '',
      lowTemp: '',
    }
  ]
}

const unitButton = document.querySelector('#unitToggle');
function toggleUnits(weatherArray){
  if (formatedTempUnits.unit === 'F$deg'){
    formatedTempUnits.unit = 'C$deg';
    formatedTempUnits.currentTemp = `${weatherArray.temperature_c}\xB0C`;

    for (let i=0; i<3; i++){
      formatedTempUnits.formatedForecast[i].averageTemp = `${weatherArray.forecast[i].avgtemp_c}\xB0C`;
      formatedTempUnits.formatedForecast[i].highTemp = `${weatherArray.forecast[i].hightemp_c}\xB0C`;
      formatedTempUnits.formatedForecast[i].lowTemp = `${weatherArray.forecast[i].lowtemp_c}\xB0C`;
    }
    unitButton.textContent = 'C';
  }else{
      formatedTempUnits.unit = 'F$deg';
      formatedTempUnits.currentTemp = `${weatherArray.temperature_f}\xB0F`;
  
      for (let i=0; i<3; i++){
        formatedTempUnits.formatedForecast[i].averageTemp = `${weatherArray.forecast[i].avgtemp_f}\xB0F`;
        formatedTempUnits.formatedForecast[i].highTemp = `${weatherArray.forecast[i].hightemp_f}\xB0F`;
        formatedTempUnits.formatedForecast[i].lowTemp = `${weatherArray.forecast[i].lowtemp_f}\xB0F`;
      }
      unitButton.textContent = 'F';
    }

    
}


// public
export const unitFormater = {
  init() {
    toggleUnits(APImanager.getCurrentWeatherArray());
    console.log(formatedTempUnits);
  },

  getFormatedTemp(){
    return formatedTempUnits;
  },

  toggleTempUnits(){
    toggleUnits(APImanager.getCurrentWeatherArray());
  }
}

export default unitFormater;