let now = new Date();
      let dateElement = document.querySelector("#date");

      let date = now.getDate();
      let hours = now.getHours();
      if (hours<10) {
        hours =`0${hours}`;
      }
      let minutes = now.getMinutes();
      if (minutes<10) {
        minutes=`0${minutes}`;
      }
      let year = now.getFullYear();

      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[now.getDay()];

      let months = [
        "Jan",
        "Feb",
        "March",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      let month = months[now.getMonth()];

      dateElement.innerHTML = `${day} ${month} ${date} ${year}, ${hours}:${minutes}`;

    function displayForecast(response) {
      console.log(response.data.daily);
  let forecastElement =document.querySelector("#weather-forecast");
let days =["Thu", "Fri", "Sat", "Sun"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
  forecastHTML =
  forecastHTML +
  `
                    <div class="col-2">
                        <div class="weather-forecast-date">
                        ${day}
                    </div>
                        <img src="https://ssl.gstatic.com/onebox/weather/48/partly_cloudy.png"
                        alt="" width="36"/>
                        <div class="weather-forecast-temperatures">
                            <span class="weather-forecast-temperatures-max"> 18°</span>
                            <span class ="weather-forecast-temperatures-min"> 12°</span>
                        </div>
                    </div>
                `;
  });
forecastHTML=forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;

}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2aab278b1613f8cd861593e4ae3bb315";
  let apiUrl =`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}
    
    function showWeatherCondition (response) {
     document.querySelector("#city-element").innerHTML = response.data.name;
     document.querySelector("#temperature").innerHTML =Math.round(response.data.main.temp);
     document.querySelector ("#description").innerHTML = response.data.weather[0].main;
     document.querySelector ("#humidity").innerHTML =response.data.main.humidity;
     document.querySelector("#windSpeed").innerHTML = response.data.wind.speed;
     document.querySelector("#main-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#main-icon").setAttribute("alt", response.data.weather[0].main);

    celciusTemperature =response.data.main.temp;

    getForecast(response.data.coord);
}

function searchCity (city) {
  let apiKey = "2aab278b1613f8cd861593e4ae3bb315";
   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        axios.get(apiUrl).then(showWeatherCondition);
}
      function handleSubmit (event) {
        event.preventDefault();
        let cityInput = document.querySelector("#city-input");
        let city = cityInput.value;
        searchCity(city);
      }

function searchLocation (position) {
  let apiKey = "2aab278b1613f8cd861593e4ae3bb315";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeatherCondition);
}

function currentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML =Math.round(celciusTemperature);
}


function showFahrenheit(event) {
  event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round((celciusTemperature * 9)/5 +32);
}

let celciusTemperature = null;

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);

let form = document.querySelector("#city-form");
      form.addEventListener("submit", handleSubmit);

let tempCelcius=document.querySelector("#temp-celcius");
tempCelcius.addEventListener("click", showCelcius);

let tempFahrenheit = document.querySelector("#temp-fahrenheit");
  tempFahrenheit.addEventListener("click", showFahrenheit);

searchCity ("London");      
displayForecast();