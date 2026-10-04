import { useState } from "react";
import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";

const BASE_CITY_URL = `https://nominatim.openstreetmap.org/search`;

function Search({ setSearchResults }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  async function handleFetchCityData(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        `${BASE_CITY_URL}?q=${encodeURIComponent(query)}&format=jsonv2`,
      );

      const data = await res.json();

      const city = data[0];

      setSearchResults(data);
      navigate(`/${city.name}/${city.lat}/${city.lon}`);
      setQuery("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleFetchCityData}>
        <input
          className={styles.searchbar}
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className={styles.searchBtn} type="submit">
          🔎
        </button>
      </form>
    </div>
  );
}

export default Search;
