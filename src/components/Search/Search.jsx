import styles from "./Search.module.css";

function Search() {
  return (
    <div>
      <input className={styles.searchbar} placeholder="Search city..."></input>
      <button className={styles.searchBtn}>🔎</button>
    </div>
  );
}

export default Search;
