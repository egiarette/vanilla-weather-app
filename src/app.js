//Initial Display on Load
function displayInitial(response) {
	let temperatureElement = document.querySelector("#temp");
	let cityElement = document.querySelector("#city");
	let descriptionElement = document.querySelector("#description");
	let iconElement = document.querySelector("#icon");
	temperatureElement.innerHTML = Math.round(response.data.main.temp);
	cityElement.innerHTML = response.data.name;
	descriptionElement.innerHTML = response.data.weather[0].description;
	iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

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
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function getCurrentWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}

function miami() {
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=miami&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function london() {
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=london&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function tokyo() {
  let apiKey = "8c48afa47a9a9c24f3500c7039d50aaa";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

//Weather Conditions
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
	document.querySelector("#icon").setAttribute( "src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

//// Conversion
//function convertFahrenheit(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#temp");
//  temperatureElement.innerHTML = "";
//}
//function convertCelsius(event) {
//  event.preventDefault();
//  let temperatureElement = document.querySelector("#temp");
//  temperatureElement.innerHTML = "";
//}
//Get Current Date and Time
let dateElement = document.querySelector("#day-time");
let currentTime = new Date();
dateElement.innerHTML = displayDate(currentTime);

//Search Bar and Current Location
let searchButton = document.querySelector("#city-form");
searchButton.addEventListener("submit", searchEngine);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", getCurrentWeather);

let miamiButton = document.querySelector("#miami");
miamiButton.addEventListener("click", miami);

let londonButton = document.querySelector("#london");
londonButton.addEventListener("click", london);

let tokyoButton = document.querySelector("#tokyo");
tokyoButton.addEventListener("click", tokyo);

//// Conversion
//let fahrenheit = document.querySelector("#fahrenheit");
//fahrenheit.addEventListener("click", convertFahrenheit);
//
//let celsius = document.querySelector("#celsius");
//celsius.addEventListener("click", convertCelsius);
