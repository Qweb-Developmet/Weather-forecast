function searchhandlingfn(event) {
  event.preventDefault();
  let searchInput = document.querySelector(`#searchcity`);

  let city = searchInput.value;
  apihandlingfn(city);
  forecastapihandlingfn(city); // Pass the city to forecast function as well
  console.log(searchInput);
}

function apihandlingfn(city) {
  // if (!city) {
  //   city = "Kabul";
  // }
  axios
    .get(
      `https://api.shecodes.io/weather/v1/current?query=${city}&key=t7a4be44f280a0ace73854a28fo70b86&units=metric`
    )
    .then(htmlmodifier);
  console.log(city);
}
window.onload = function () {
  apihandlingfn("kabul"); // Default city
  forecastapihandlingfn("kabul"); // Default city for forecast
};

function forecastapihandlingfn(city) {
  // if (!city) {
  //   city = "Kabul";
  // }
  axios
    .get(
      `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=t7a4be44f280a0ace73854a28fo70b86&units=metric`
    )
    .then(forecastfn);
}
function formatday(timestamp) {
  let date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function forecastfn(response) {
  console.log(response.data);
  let forecastsHtml = ``;
  response.data.daily.forEach(function (day) {
    // Call formatday to get the correct day of the week

    forecastsHtml += `
      <li class="2day">
        <div class="dforecast1">
          <div >${formatday(day.time)} <p> ${Math.round(
      day.temperature.minimum
    )}°C to
          <b style="font-size: larger;"> ${Math.round(
            day.temperature.maximum
          )}°C</b>
          </p> </div>
          <img
            src="${day.condition.icon_url}" alt="weather icon"
            class="wicon2"
            id="wicon"
            width="100px"
          />
        </div>
      </li>`;
  });
  let forecastElement = document.querySelector(`#forecast`);
  forecastElement.innerHTML = forecastsHtml;
}

let form = document.querySelector("form");
document.addEventListener("submit", searchhandlingfn);

function htmlmodifier(response) {
  let cityElement = document.querySelector(`.cityname`);
  let tempratureElement = document.querySelector(`.tempnumber`);
  let weatherIcon = document.querySelector(`.wicon`);
  let temperature = response.data.temperature.current;

  let TimeElement = document.querySelector(`time`);
  let whenElement = document.querySelector(`when`);
  let forcaweather = document.querySelectorAll(`.wicon2`);
  let tempraturelikeElement = document.querySelector(`.tempraturelike`);
  let windspeedElement = document.querySelector(`.windspeed`);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // Get current day of the week
  const now = new Date();

  let currentDayIndex = now.getDay(); // returns 0 for Sunday, 1 for Monday, etc.

  // Helper function to get the correct day name, considering wrapping around the week
  // function getDayName(dayIndex) {
  //   return daysOfWeek[dayIndex % 7]; // % 7 ensures it wraps around if it exceeds the index
  // }

  const day = daysOfWeek[now.getDay()];
  // Get current date (DD/MM/YYYY format)
  const date1 = now.getDate();
  const month = now.getMonth() + 1; // Months are 0-based
  const year = now.getFullYear();
  const fullDate = `${day}/${date1}/${month}/${year}`;

  // Get current time (HH:MM:SS format)
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const time = `${hours}:${minutes}:${seconds}`;
  let fullDateTime = `${fullDate}, ${time}`;

  TimeElement.innerHTML = fullDateTime;
  cityElement.innerHTML = `${response.data.city} / ${response.data.country}`;
  tempratureElement.innerHTML = Math.round(temperature);
  weatherIcon.src = response.data.condition.icon_url;
  whenElement.innerHTML = response.data.condition.icon;
  tempraturelikeElement.innerHTML = response.data.temperature.feels_like;
  windspeedElement.innerHTML = response.data.wind.speed;
}
