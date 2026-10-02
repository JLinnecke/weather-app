import { useState } from "react";
import { weatherImages } from "../../functions/weatherImages";
import styles from "../CityOverviewCard/CityOverviewCard.module.css";

function CityOverviewCard({ name, weatherData }) {
  const weatherCode = weatherData.current.weather_code;
  const { images, weatherCategory } = weatherImages(weatherCode);

  const [weatherCardBackground] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);

    return images[randomIndex];
  });

  const option = {
    timeZone: weatherData.timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const localeTime = new Date().toLocaleTimeString("de-DE", option);

  return (
    <div
      className={styles.card}
      style={{ backgroundImage: `url(${weatherCardBackground})` }}
    >
      <h1 style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}>{name}</h1>
      <p>
        {weatherCode} - {weatherCategory}
      </p>
      <div
        className={styles.temperature}
        style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.8)" }}
      >
        <p>
          <span>Min: </span>
          {weatherData.daily.temperature_2m_min[0]} °C
        </p>
        <p>
          <span>Max: </span>
          {weatherData.daily.temperature_2m_max[0]} °C
        </p>
      </div>
      <div className={styles.weather_details}>
        <p>
          <span>Relative humidity: </span>
          {weatherData.current.relative_humidity_2m} %
        </p>
        <p>
          <span>Wind speed: </span>
          {weatherData.current.wind_speed_10m} kph
        </p>
      </div>
      <p>{localeTime}</p>
    </div>
  );
}

export default CityOverviewCard;
