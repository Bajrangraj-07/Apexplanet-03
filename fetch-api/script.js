// weather codes ka matlab (Open-Meteo docs se liya hai)
const weatherCodes = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  80: "Rain showers",
  95: "Thunderstorm"
};

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const resultArea = document.getElementById("result-area");

searchBtn.addEventListener("click", getWeather);

// enter dabane pe bhi search ho jaye
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    resultArea.innerHTML = `<p class="error-text">Please type a city name first</p>`;
    return;
  }

  resultArea.innerHTML = `<p id="status-text">Loading...</p>`;

  try {
    // step 1: city ka naam se latitude/longitude nikalna (geocoding)
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      resultArea.innerHTML = `<p class="error-text">City not found. Try another name.</p>`;
      return;
    }

    const place = geoData.results[0];
    const lat = place.latitude;
    const lon = place.longitude;

    // step 2: lat/lon se current weather nikalna
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );
    const weatherData = await weatherRes.json();

    const current = weatherData.current_weather;
    const conditionText = weatherCodes[current.weathercode] || "Unknown condition";

    resultArea.innerHTML = `
      <p class="city-name">${place.name}, ${place.country}</p>
      <p class="temp">${current.temperature}°C</p>
      <p class="condition">${conditionText} | Wind: ${current.windspeed} km/h</p>
    `;

  } catch (error) {
    console.log(error);
    resultArea.innerHTML = `<p class="error-text">Something went wrong. Check your internet and try again.</p>`;
  }
}
