const apiKey = "Your_API_Key_Here"; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

if (!getWeatherBtn || !cityInput || !weatherInfo) {
  console.error("One or more HTML elements are missing.");
}

getWeatherBtn.addEventListener("click", async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert("Please enter a city name!");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new Error(`City not found: ${response.statusText}`);
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    if (error.message === "Failed to fetch") {
      alert("Network error. Please try again later.");
    } else {
      alert(error.message);
    }
  }
});

function displayWeather(data) {
  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temperature").textContent = data.main.temp;
  document.getElementById("humidity").textContent = data.main.humidity;
  document.getElementById("description").textContent =
    data.weather[0].description;

  weatherInfo.classList.remove("hidden");
}
