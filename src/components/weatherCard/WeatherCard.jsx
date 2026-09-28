import { useEffect, useState } from "react";
import BackButton from "../BackButton/BackButton";
import Hours from "../Hours/Hours";

import styles from "../WeatherCard/WeatherCard.module.css";

const BASE_DAILY_URL = "https://api.open-meteo.com/v1/forecast";

function Weathercard({ searchResults }) {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  console.log(searchResults, "SearchResult");

  useEffect(
    function () {
      if (searchResults.length === 0) return;
      async function fetchDailyWeather() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${BASE_DAILY_URL}?latitude=${searchResults[0].lat}&longitude=${searchResults[0].lon}&daily=sunrise,sunset,moonrise,moonset,moon_phase,wind_speed_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m,apparent_temperature`,
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

  if (!searchResults.length) return null;

  if (isLoading) return <p>Loading...</p>;

  if (!weatherData) return null;

  const { daily, hourly } = weatherData;

  return (
    <div>
      <BackButton />
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
      <p>{hourly.temperature_2m[0]}</p>
      <div className={styles.hours_temp_container}>
        {hourly.time.slice(0, 24).map((hours, i) => (
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
