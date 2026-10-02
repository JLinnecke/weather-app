import { useEffect, useState } from "react";
import { cities } from "../../data/cities";
import CityOverviewCard from "../CityOverviewCard/CityOverviewCard";
import styles from "../CityOverview/CityOverview.module.css";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

const BASE_OVERVIEW_URL =
  "&daily=temperature_2m_min,temperature_2m_max&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code&timezone=auto";

function CityOverview() {
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    async function fetchWeatherDataOverview() {
      try {
        setIsLoading(true);
        const requests = cities().map(async (city) => {
          const res = await fetch(
            `${BASE_URL}?latitude=${city.lat}&longitude=${city.lng}${BASE_OVERVIEW_URL}`,
          );
          const data = await res.json();
          // console.log(data);

          return data;
        });
        const data = await Promise.all(requests);
        // console.log(data);

        setWeatherData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchWeatherDataOverview();
  }, []);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.overview}>
      {cities().map((city, i) => (
        <CityOverviewCard
          name={city.name}
          key={i}
          weatherData={weatherData[i]}
        />
      ))}
    </div>
  );
}

export default CityOverview;

// OVERVIEW API:
// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=temperature_2m_min,temperature_2m_max&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,weather_code

// ?latitude=52.52&longitude=13.41
