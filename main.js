const apiKey = "57e5cdf0f4bb9dd6fe91f238c0d4c748";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const errorMessage = document.querySelector(".errorMessage");
const allData = document.querySelector(".allData");
const weatherImg = document.querySelector(".weatherImgAndTemp img");
const temp = document.getElementById("temp");
const tempDescription = document.getElementById("tempDescription");
const humidityText = document.querySelector("#humidity .percentage");
const windSpeedText = document.querySelector("#windSpeed .percentage");
const container = document.querySelector(".container");

async function checkWeather(city) {
  errorMessage.style.display = "none";
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    allData.classList.add("hidden");
      setTimeout(() => {
        allData.style.display = "block";
      container.classList.add("expanded");
      errorMessage.style.display = "flex";} ,100)
      
    return;
  }

  const data = await response.json();

  temp.innerHTML = Math.round(data.main.temp) + "°C";
  tempDescription.innerHTML = data.weather[0].description;
  humidityText.innerHTML = data.main.humidity + "%";
  windSpeedText.innerHTML = data.wind.speed + " Km/h";

  const condition = data.weather[0].main;
  if (condition == "Clouds") { weatherImg.src = "Images/clouds.png"; }
  else if (condition == "Clear") { weatherImg.src = "Images/sun.png"; }
  else if (condition == "Rain") { weatherImg.src = "Images/rain.png"; }
  else if (condition == "Drizzle") { weatherImg.src = "Images/drizzle.png"; }
  else if (condition == "Mist") { weatherImg.src = "Images/mist.png"; }
  else if (condition == "Snow") { weatherImg.src = "Images/snow.png"; }

  allData.classList.remove("hidden");
  allData.style.display = "block";
  container.classList.add("expanded");
  allData.classList.remove("animate");
  void allData.offsetWidth;
  allData.classList.add("animate");
}

searchBtn.addEventListener("click", () => {
  checkWeather(cityInput.value.trim());
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    checkWeather(cityInput.value.trim());
  }
});