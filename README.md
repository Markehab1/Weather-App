# Weather App

A clean, responsive weather app. Type any city and instantly see the current temperature, conditions, humidity, wind speed and country, with a matching weather icon.

**Live demo:** https://markehab1.github.io/Weather-App/

## Features

- Search any city by clicking the search button or pressing Enter
- Shows temperature (°C), weather description, humidity, wind speed (km/h) and country
- Weather icon that changes with the condition (clouds, clear, rain, drizzle, mist, snow)
- Loading indicator while the weather is being fetched
- Friendly messages for an invalid city name and for no internet connection
- Responsive layout for phones, tablets and desktops
- Respects reduced-motion settings

## Built with

- HTML5, CSS3 and vanilla JavaScript (`fetch`, `async/await`)
- [OpenWeatherMap Current Weather API](https://openweathermap.org/current)
- Font Awesome icons and the Poppins font
- Deployed on GitHub Pages

## Run it locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Markehab1/Weather-App.git
   cd Weather-App
   ```
2. Get a free API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys). New keys can take up to 2 hours to activate.
3. Open `main.js` and put your key on the first line:
   ```js
   const apiKey = "YOUR_API_KEY";
   ```
4. Open `index.html` in your browser.

## Project structure

```
Weather-App/
├── index.html   # page structure
├── main.css     # styles and responsive layout
├── main.js      # API call, error handling and UI updates
└── Images/      # weather icons
```

## What I practiced

- Fetching data from a REST API and handling errors (invalid city, network failure)
- Converting units (the API returns wind in m/s, converted to km/h)
- Building a responsive layout with media queries

## Author

**Mark Ehab** | Front-End Developer
[LinkedIn](https://www.linkedin.com/in/mark-ehab-453519389/) · [GitHub](https://github.com/Markehab1)
