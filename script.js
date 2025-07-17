const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherInfo = document.getElementById("weatherInfo");
  const error = document.getElementById("error");

  if (!city) {
    error.textContent = "Please enter a city.";
    error.classList.remove("hidden");
    weatherInfo.classList.add("hidden");
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      error.classList.add("hidden");
      document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").textContent = `${data.main.temp}°C`;
      document.getElementById("description").textContent = data.weather[0].description;
      document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").textContent = `Wind Speed: ${data.wind.speed} m/s`;
      weatherInfo.classList.remove("hidden");
    })
    .catch(err => {
      error.textContent = err.message;
      error.classList.remove("hidden");
      weatherInfo.classList.add("hidden");
    });
}
