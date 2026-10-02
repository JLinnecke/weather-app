import styles from "./HumidityTile.module.css";

function HumidityTile({ humidity }) {
  return (
    <div className={styles.HumidityTile}>
      <h3 className={styles.tileHeading}>Humidity</h3>
      <div>
        <p>
          <span>Realtive humidity: </span>
          {humidity} %
        </p>
      </div>
    </div>
  );
}

export default HumidityTile;
