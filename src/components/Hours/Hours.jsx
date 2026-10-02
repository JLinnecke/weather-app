import styles from "../Hours/Hours.module.css";

function Hours({ time, temperature, isFirst }) {
  const formatedTime = time.split("T")[1];

  const date = time.split("T")[0];

  const formatedDate = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short",
  }).format(new Date(`${date}T00:00`));

  return (
    <div className={styles.details_container}>
      <p className={styles.date}>
        {isFirst ? formatedDate : formatedTime === "00:00" ? formatedDate : ""}
      </p>
      <div className={styles.hour_temp_container}>
        <p>{formatedTime} </p>
        <p>{temperature.toFixed(1)} °C</p>
      </div>
    </div>
  );
}

export default Hours;
