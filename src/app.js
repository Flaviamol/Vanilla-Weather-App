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

// function formatDate(timeStamp) {
//   let date = new Date(timeStamp);
//   let hours = date.getHours();
//   let minutes = date.getMinutes();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[now.getDay()];
//   return `${day} ${hours}:${minutes}`;
// }

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let cityElement = document.querySelector(".default-city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  //   let dateElement = document.querySelector(".default-subtitle");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  console.log(response.data);
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  //   dateElement.innerHTML = formatDate(response.data.dt * 1000);
}

let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=berlin&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayTemperature);

// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCityName.value}&appid=${apiKey}&units=${units}`;
