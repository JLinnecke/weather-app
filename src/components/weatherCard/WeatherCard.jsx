import { useEffect, useState } from "react";
import BackButton from "../BackButton/BackButton";
import Hours from "../Hours/Hours";

import styles from "../WeatherCard/WeatherCard.module.css";

const BASE_DAILY_URL = "https://api.open-meteo.com/v1/forecast";

const weatherImage = {
  clear: [
    "/img/weather/clear/clear1.webp",
    "/img/weather/clear/clear2.webp",
    "/img/weather/clear/clear3.webp",
    "/img/weather/clear/clear4.webp",
  ],
  cloudy: [
    "/img/weather/cloudy/1.webp",
    "/img/weather/cloudy/2.webp",
    "/img/weather/cloudy/3.webp",
    "/img/weather/cloudy/4.webp",
  ],
  rainy: [
    "/img/weather/rainy/rainy1.webp",
    "/img/weather/rainy/rainy2.webp",
    "/img/weather/rainy/rainy3.webp",
    "/img/weather/rainy/rainy4.webp",
  ],
};

function Weathercard({ searchResults }) {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const currentHour = Number(new Date().getHours());
  // console.log(currentHour, "currenthour");
  // console.log(searchResults, "SearchResult");

  useEffect(
    function () {
      if (searchResults.length === 0) return;
      async function fetchDailyWeather() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${BASE_DAILY_URL}?latitude=${searchResults[0].lat}&longitude=${searchResults[0].lon}&daily=sunrise,sunset,moonrise,moonset,moon_phase,wind_speed_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m,apparent_temperature&timezone=auto`,
          );
          // ?latitude=${52.52}&longitude=${13.41}
          const data = await res.json();
          console.log(data, "data");

          setWeatherData(data);
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
      fetchDailyWeather();
    },
    [searchResults],
  );

  useEffect(
    function () {
      if (!weatherData) return;

      const { hourly } = weatherData;

      const startIndex = hourly.time.findIndex((curr) => {
        const hour = Number(curr.split("T")[1].split(":")[0]);

        return hour === currentHour;
      });

      const weatherCode = hourly.weather_code[startIndex];

      let weatherCategory;

      if (weatherCode === 0) {
        weatherCategory = "clear";
      } else if (weatherCode === 1 || weatherCode === 2 || weatherCode === 3) {
        weatherCategory = "cloudy";
      } else if (weatherCode === 51 || weatherCode === 61) {
        weatherCategory = "rainy";
      }

      const images = weatherImage[weatherCategory];

      if (!images) return;

      const randomIndex = Math.floor(Math.random() * images.length);
      const weatherCardBackground = images[randomIndex];

      document.body.style.backgroundImage = `url(${weatherCardBackground})`;

      return () => {
        document.body.style.backgroundImage = "";
      };
    },
    [weatherData, currentHour],
  );

  if (!searchResults.length) return null;

  if (isLoading) return <p>Loading...</p>;

  if (!weatherData) return null;

  const { daily, hourly } = weatherData;

  const startIndex = hourly.time.findIndex((curr) => {
    const hour = Number(curr.split("T")[1].split(":")[0]);

    return hour === currentHour;
  });

  return (
    <div>
      <BackButton />
      <div className={styles.min_max_details}>
        <h1>{searchResults[0].name}</h1>
        <p>
          <span>Min: </span>
          {daily.temperature_2m_min[0]} °C
        </p>
        <br></br>
        <p>
          <span>Max: </span>
          {daily.temperature_2m_max[0]} °C
        </p>
        <br></br>
        <p>
          <span>Apparent temperature: </span>
          {hourly.apparent_temperature[0]} °C
        </p>
      </div>
      <div className={styles.hours_temp_container}>
        {hourly.time.slice(startIndex, startIndex + 24).map((hours, i) => (
          <Hours
            key={hours}
            time={hours}
            temperature={hourly.temperature_2m[i]}
            weatherCode={hourly.weather_code}
          />
        ))}
      </div>
    </div>
  );
}

export default Weathercard;

// DAILY API:
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset,moonrise,moonset,moon_phase,wind_speed_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m,apparent_temperature
