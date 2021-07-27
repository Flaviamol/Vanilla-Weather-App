const apiKey = "49d65f3e3cd6a2a73473bcfc10a0a319";
const units = "metric";

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentDay = document.querySelector(".default-subtitle");
currentDay.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let cityElement = document.querySelector(".default-city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector(".current-icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// function forecastTemperature(response) {
//   console.log(response.data);

//   let forecastColsHtml = "";
//   response.data.list.forEach((element) => {
//     forecastColsHtml += `
//         <div class="col">
//               <div class="forecast-day">${formatDate(element.dt * 1000)}</div>
//               <img src="" class="forecast-icon" />
//               <div class="forecast-temp">
//                 <span class="forecast-temp-min">${
//                   element.main.temp_min
//                 }° /</span>
//                 <span class="forecast-temp-max">${element.main.temp_max}°</span>
//               </div>
//         </div>
//     `;
//   });

//   let weatherForecastElem = document.querySelector(".weatherForecast");
//   weatherForecastElem.innerHTML = forecastColsHtml;

//   //   let forecastTempMax = document.querySelector(".forecast-temp-max");
//   //   let forecastTempMin = document.querySelector(".forecast-temp-min");
//   //   let forecastIcon = document.querySelector(".forecast-icon");
//   //   let dateForecast = document.querySelector(".forecast-day");

//   //   forecastTempMax.innerHTML = `${Math.round(
//   //     response.data.list[0].main.temp_max
//   //   )}°`;

//   //   forecastTempMin.innerHTML = `${Math.round(
//   //     response.data.list[0].main.temp_min
//   //   )}°/`;

//   //   forecastIcon.setAttribute(
//   //     "src",
//   //     `http://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`
//   //   );

//   //   dateForecast.innerHTML = formatDate(response.data.list[0].dt * 1000);
// }

// let apiForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
// console.info(apiForecastUrl);
// axios.get(apiForecastUrl).then(forecastTemperature);

// function formatDate(timeStamp) {
//   let dateForecast = new Date(timeStamp);
//   let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//   let day = days[now.getDay()];
//   return `${day}`;
// }

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

search("Berlin");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
