import { useEffect, useRef, useState } from "react";
import BackButton from "../BackButton/BackButton";
import Hours from "../Hours/Hours";

import styles from "./WeatherCard.module.css";
import { weatherImages } from "../../functions/weatherImages";
import PercipitationTile from "../PercipitationTile/PercipitationTile";
import HumidityTile from "../HumidityTile/HumidityTile";

const BASE_DAILY_URL = "https://api.open-meteo.com/v1/forecast";

function WeatherCard({ searchResults }) {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const startX = useRef(0);
  const scrollRef = useRef(null);
  const scrollStart = useRef(0);
  const isDragging = useRef(false);

  const option = {
    timeZone: weatherData?.timezone,
    hour: "2-digit",
    hour12: false,
  };

  const currentHour = weatherData
    ? Number(new Date().toLocaleTimeString("de-DE", option).split(" ")[0])
    : null;

  function handleMouseDown(e) {
    isDragging.current = true;
    startX.current = e.clientX;
    scrollStart.current = scrollRef.current.scrollLeft;
    console.log(e.clientX);
  }

  function handleMouseMove(e) {
    if (!isDragging.current) return;
    const walk = e.clientX - startX.current;
    scrollRef.current.scrollLeft = scrollStart.current - walk;
  }

  function handleMouseLeave() {
    isDragging.current = false;
  }

  function handleMouseUp() {
    isDragging.current = false;
  }

  useEffect(
    function () {
      if (searchResults.length === 0) return;
      async function fetchDailyWeather() {
        setIsLoading(true);
        try {
          const res = await fetch(
            `${BASE_DAILY_URL}?latitude=${searchResults[0].lat}&longitude=${searchResults[0].lon}&daily=sunrise,sunset,moonrise,moonset,moon_phase,wind_speed_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,relative_humidity_2m,precipitation,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m,apparent_temperature&timezone=auto`,
          );

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

      const { images } = weatherImages(weatherCode);

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
      <div className={styles.minMaxDetails}>
        <h1>{searchResults[0].name}</h1>
        <div className={styles.weatherDetails}>
          <p className={styles.detailTile}>
            <span>Min: </span>
            {daily.temperature_2m_min[0]} °C
          </p>

          <p className={styles.detailTile}>
            <span>Max: </span>
            {daily.temperature_2m_max[0]} °C
          </p>

          <p className={styles.detailTile}>
            <span>Feels like: </span>
            {hourly.apparent_temperature[startIndex]} °C
          </p>
          <p className={styles.detailTile}>
            <span>Wind: </span>
            {hourly.wind_speed_10m[startIndex]} kph
          </p>
        </div>
      </div>

      <div
        className={styles.hoursTempContainer}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {hourly.time.slice(startIndex, startIndex + 24).map((hours, i) => (
          <Hours
            key={hours}
            time={hours}
            temperature={hourly.temperature_2m[startIndex + i]}
            weatherCode={hourly.weather_code}
            isFirst={i === 0}
          />
        ))}
      </div>
      <div className={styles.precipitationContainer}>
        <div className={styles.precipitationTile}>
          <PercipitationTile
            precipitationProbaility={
              hourly.precipitation_probability[startIndex]
            }
            precipitation={hourly.precipitation[startIndex]}
          />
        </div>
        <div>
          <HumidityTile humidity={hourly.relative_humidity_2m[startIndex]} />
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;

// DAILY API:
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=sunrise,sunset,moonrise,moonset,moon_phase,wind_speed_10m_max,temperature_2m_min,temperature_2m_max&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,showers,snowfall,weather_code,wind_speed_10m,apparent_temperature
