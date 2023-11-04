const apiKey = "5f0b41bbe81704ab0dab3d88a62edc1d";

var cityInput = document.getElementById("cityInput");
var weatherInfo = document.getElementById("weather-info");
var btn = document.getElementById("btn");

btn.addEventListener("click", function() {
  var cityName = cityInput.value.trim();
  if (cityName === "") {
    alert("Please enter a city name ");
    return;
  }

  var ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
  ourRequest.onload = function() {
    if (ourRequest.status >= 200 && ourRequest.status < 400) {
      var data = JSON.parse(ourRequest.responseText);
      console.log(data);

      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;
      const windSpeed = data.wind.speed;

      weatherInfo.innerHTML = `
        <p>Weather: ${weatherDescription}</p>
        <p>Main Temperature: ${temperature}°C</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
      `;
    } else {
      alert("City not found or an error occurred.");
    }
  };
  ourRequest.send();
});
