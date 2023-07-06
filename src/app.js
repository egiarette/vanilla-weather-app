//Global variable for API Key
const apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";

//Get Current Date and Time

function displayDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

//Search Bar and Preset Cities
function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = `${city}`;
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    displayWeatherCondition(response);
    getForecast(response.data.coordinates);
  });
}

function getCurrentWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

function miami() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Miami&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    displayWeatherCondition(response);
    getForecast(response.data.coordinates);
  });
}
function london() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    displayWeatherCondition(response);
    getForecast(response.data.coordinates);
  });
}
function tokyo() {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tokyo&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(function (response) {
    displayWeatherCondition(response);
    getForecast(response.data.coordinates);
  });
}

//Weather Conditions
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);
}

//Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row text-center mt-5" id="forecast">`;

  forecast.forEach(function (forecastDays, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2 forecast-card">
              ${formatDay(forecastDays.time)}<br />
              <img
                class="forecast-icon"
                src="${forecastDays.condition.icon_url}"
                alt="${forecastDays.condition.icon}"
              />
              <p><strong>${Math.round(
                forecastDays.temperature.maximum
              )}˚</strong> / ${Math.round(
          forecastDays.temperature.minimum
        )}˚</p>
            </div>
          `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

//Get Current Date and Time
let dateElement = document.querySelector("#day-time");
let currentTime = new Date();
dateElement.innerHTML = displayDate(currentTime);

//Search Bar and Preset Cities
let searchButton = document.querySelector("#city-form");
searchButton.addEventListener("submit", searchEngine);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", getCurrentWeather);

let miamiButton = document.querySelector("#miami");
miamiButton.addEventListener("click", miami);

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", london);

let tokyoButton = document.querySelector("#tokyo");
tokyoButton.addEventListener("click", tokyo);

searchCity("Cullowhee");
