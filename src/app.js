//Initial Display on Load
function displayInitial(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.coordinates);
}

let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=nyc&key=${apiKey}`;

axios.get(apiUrl).then(displayInitial);

//Get Current Date and Time
let today = new Date();

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

//Search Bar and Current Location
function searchEngine(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = `${city.value}`;
}

function searchCity(city) {
  let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

// function searchLocation(coordinates) {
//   let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayWeatherCondition);
// }

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getCurrentWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

function miami() {
  let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Miami&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function london() {
  let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function tokyo() {
  let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tokyo&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Weather Conditions
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document
    .querySelector("#icon")
    .setAttribute("src", `${response.data.condition.icon_url}`);
}

//Forecast
function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "f19f9fa0bec78fe139t58o4f75a1682f";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  console.log(apiURL);
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHTML = `<div class="row text-center mt-5" id="forecast">`;

  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
            <div class="col-2 forecast-card">
              ${day}<br />
              <img
                class="forecast-icon"
                src="images/cloudy-grey.svg"
                alt="Grey Cloudy Icon"
              />
              <p><strong>15˚</strong> / 5˚</p>
            </div>
          `;
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

//Get Current Date and Time
let dateElement = document.querySelector("#day-time");
let currentTime = new Date();
dateElement.innerHTML = displayDate(currentTime);

//Search Bar and Current Location
let searchButton = document.querySelector("#city-form");
searchButton.addEventListener("submit", searchEngine);

// let currentLocationButton = document.querySelector("#current-location");
// currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", getCurrentWeather);

let miamiButton = document.querySelector("#miami");
miamiButton.addEventListener("click", miami);

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", london);

let tokyoButton = document.querySelector("#tokyo");
tokyoButton.addEventListener("click", tokyo);
