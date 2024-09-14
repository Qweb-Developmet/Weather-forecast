function searchhandlingfn(event) {
    event.preventDefault();
    let searchInput = document.querySelector(`#searchcity`);
  
    apihandlingfn(searchInput.value);
  }
  
  function apihandlingfn(city) {
    if (!city) {
      city = "Kabul";
    }
    axios
      .get(
        `https://api.shecodes.io/weather/v1/current?query=${city}&key=t7a4be44f280a0ace73854a28fo70b86&units=metric`
      )
      .then(htmlmodifier);
    console.log(city);
  }
  window.onload = function () {
    apihandlingfn(); // Call searchCity when the page is loaded
  };
  let form = document.querySelector("form");
  form.addEventListener("submit", searchhandlingfn);
  
  function htmlmodifier(response) {
    let cityElement = document.querySelector(`.cityname`);
    let tempratureElement = document.querySelector(`.tempnumber`);
    let weatherIcon = document.querySelector(`.wicon`);
    let temperature = response.data.temperature.current;
  
    // let date = new Date(response.data.time * 1000);
    let TimeElement = document.querySelector(`time`);
    let whenElement = document.querySelector(`when`);
    let forcaweather = document.querySelectorAll(`.wicon2`);
    let tempraturelikeElement = document.querySelector(`.tempraturelike`);
    let windspeedElement = document.querySelector(`.windspeed`);
  
    // let
    console.log(weatherIcon); // Will work inside the function
    // console.log(date.toLocaleString);
    console.log(forcaweather);
    console.log(response.data);
  
    forcaweather.forEach((element) => {
      element.src = response.data.condition.icon_url; // Assuming the elements are <img> tags
    });
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
  
    // Select the forecast elements
    let day1 = document.querySelector(`.dforecast1`);
    let day2 = document.querySelector(`.dforecast2`);
    let day3 = document.querySelector(`.dforecast3`);
    let day4 = document.querySelector(`.dforecast4`);
    let day5 = document.querySelector(`.dforecast5`);
    let day6 = document.querySelector(`.dforecast6`);
    let day7 = document.querySelector(`.dforecast7`);
    console.log(day1, day2, day3);
  
    // Helper function to get the correct day name, considering wrapping around the week
    function getDayName(dayIndex) {
      return daysOfWeek[dayIndex % 7]; // % 7 ensures it wraps around if it exceeds the index
    }
  
    // Update the forecast days
    day1.innerHTML = getDayName(currentDayIndex); // Today
    day2.innerHTML = getDayName(currentDayIndex + 1); // Tomorrow
    day3.innerHTML = getDayName(currentDayIndex + 2); // Day after tomorrow
    day4.innerHTML = getDayName(currentDayIndex + 3);
    day5.innerHTML = getDayName(currentDayIndex + 4);
    day6.innerHTML = getDayName(currentDayIndex + 5);
    day7.innerHTML = getDayName(currentDayIndex + 6);
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
  
    // Display the day, date, and time
    console.log(`Day: ${day}`);
    console.log(`Date: ${fullDate}`);
    console.log(`Time: ${time}`);
    console.log(day);
  
    TimeElement.innerHTML = fullDateTime;
    cityElement.innerHTML = `${response.data.city} / ${response.data.country}`;
    tempratureElement.innerHTML = Math.round(temperature);
    weatherIcon.src = response.data.condition.icon_url;
    whenElement.innerHTML = response.data.condition.icon;
    tempraturelikeElement.innerHTML = response.data.temperature.feels_like;
    windspeedElement.innerHTML = response.data.wind.speed;
    console.log(tempraturelikeElement, windspeedElement);
  }
  // function datetimefn(date) {
  //   // Get current date and time
  //   const now = new Date();
  
  //   // Get day of the week
  //   let daysOfWeek = [
  //     "Sunday",
  //     "Monday",
  //     "Tuesday",
  //     "Wednesday",
  //     "Thursday",
  //     "Friday",
  //     "Saturday",
  //   ];
  //   const day = daysOfWeek[now.getDay()];
  // }
  // datetimefn();
  // Call the function to test