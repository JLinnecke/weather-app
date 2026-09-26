import { useState } from "react";
import styles from "./Search.module.css";

const BASE_CITY_URL = `https://nominatim.openstreetmap.org/search`;

function Search({ setSearchResults }) {
  const [query, setQuery] = useState("");

  async function handleFetchCityData() {
    try {
      const res = await fetch(
        `${BASE_CITY_URL}?q=${encodeURIComponent(query)}&format=jsonv2`,
      );

      const data = await res.json();
      console.log(data);

      setSearchResults(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <input
        className={styles.searchbar}
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className={styles.searchBtn} onClick={handleFetchCityData}>
        🔎
      </button>
    </div>
  );
}

export default Search;

//  https://nominatim.openstreetmap.org/search?<params>
