const apiKey = "3595ae52e051e29f9b5c4eb04dc03f82";
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
const countryText  = document.getElementById("countryName");
const clear = document.getElementById("clear");
const errp = document.getElementById("errp");
const loading = document.getElementById("loading");
const errorText = document.getElementById("errorText");
const resultsInner = document.querySelector(".resultsInner");


function openResults() {
  container.classList.add("expanded");
  resultsInner.classList.remove("fadeIn");
  void resultsInner.offsetWidth;
  resultsInner.classList.add("fadeIn");
}

function showError(message) {
  errorText.textContent = message;
  allData.style.display = "none";
  errorMessage.style.display = "flex";
  openResults();
}

async function checkWeather(city) {
  loading.classList.remove("hide");

  let response;
  try {
    response = await fetch(apiUrl + encodeURIComponent(city) + `&appid=${apiKey}`);
  } catch (error) {
    loading.classList.add("hide");
    showError("No internet connection. Please check your connection and try again.");
    return;
  }

  loading.classList.add("hide");

  if (!response.ok) {
    if (response.status === 404) {
      showError("Invalid Location :/");
    } else if (response.status === 401) {
      showError("API key problem. Please check your key.");
    } else if (response.status === 429) {
      showError("Too many requests. Try again in a minute.");
    } else {
      showError("Something went wrong. Please try again.");
    }
    return;
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    showError("Something went wrong. Please try again.");
    return;
  }

  temp.innerHTML = Math.round(data.main.temp) + "°C";
  tempDescription.innerHTML = data.weather[0].description;
  humidityText.innerHTML = data.main.humidity + "%";
  windSpeedText.innerHTML = Math.round(data.wind.speed * 3.6) + " Km/h";

const countryCode = data.sys.country;
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
const countryName = regionNames.of(countryCode);
countryText.innerHTML = countryName;

  const condition = data.weather[0].main;
  if (condition == "Clouds") { weatherImg.src = "Images/clouds.png"; }
  else if (condition == "Clear") { weatherImg.src = "Images/sun.png"; }
  else if (condition == "Rain") { weatherImg.src = "Images/rain.png"; }
  else if (condition == "Drizzle") { weatherImg.src = "Images/drizzle.png"; }
  else if (condition == "Mist") { weatherImg.src = "Images/mist.png"; }
  else if (condition == "Snow") { weatherImg.src = "Images/snow.png"; }

  errorMessage.style.display = "none";
  allData.style.display = "block";
  openResults();
}

function search() {
  const city = cityInput.value.trim();
  if (city === "") {
    errp.classList.add("show");
    return;
  }
  errp.classList.remove("show");
  checkWeather(city);
}

searchBtn.addEventListener("click", search);

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    search();
  } else {
    errp.classList.remove("show");
  }
});

clear.addEventListener("click", () => {
    cityInput.value = "";
  container.classList.remove("expanded");
  setTimeout(() => {
    allData.style.display = "none";
    errorMessage.style.display = "none";
  }, 400);

}) 