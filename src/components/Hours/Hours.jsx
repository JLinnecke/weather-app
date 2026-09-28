import styles from "../Hours/Hours.module.css";

function Hours({ time, temperature, weatherCode }) {
  const formatedTime = time.split("T")[1];

  return (
    <div className={styles.details_container}>
      <div className={styles.hour_temp_container}>
        <p>{formatedTime} </p>
        <p>{temperature}</p>
      </div>
    </div>
  );
}

export default Hours;
