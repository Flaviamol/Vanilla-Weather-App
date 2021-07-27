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

//search engine
function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector(".current-temperature");
  let cityElement = document.querySelector(".default-city-name");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector(".current-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = `${response.data.main.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  forecast(response.data.coord);
}

function forecast(coordinates) {
  let apiUrlGeoLoc = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrlGeoLoc).then(displayForecast);
}

function displayForecast(response) {
  // removes the first element (today)
  response.data.daily.shift();
  let count = 0;

  let forecastColsHtml = "";
  response.data.daily.forEach((element) => {
    if (count == 5) {
      return;
    }

    forecastColsHtml += `
        <div class="col">
              <div class="forecast-day">${formatDate(element.dt * 1000)}</div>
              <img src="http://openweathermap.org/img/wn/${
                element.weather[0].icon
              }@2x.png" class="forecast-icon" />
              <div class="forecast-temp">
                <span class="forecast-temp-min">${Math.round(
                  element.temp.min
                )}° /</span>
                <span class="forecast-temp-max">${Math.round(
                  element.temp.max
                )}°</span>
              </div>
        </div>
    `;
    count++;
  });

  let weatherForecastElem = document.querySelector(".weatherForecast");
  weatherForecastElem.innerHTML = forecastColsHtml;
}

function formatDate(timeStamp) {
  let dateForecast = new Date(timeStamp);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[dateForecast.getDay()];
  return `${day}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

//celsius and fahrenheit
function dislplayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitTemperature;
}

function dislplaycelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".current-temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", dislplayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", dislplaycelsiusTemperature);

search("Berlin");
