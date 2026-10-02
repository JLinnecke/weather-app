import styles from "./HumidityTile.module.css";

function HumidityTile({ humidity }) {
  return (
    <div className={styles.HumidityTile}>
      <h1>Luftfeuchtigkeit</h1>
      <div>
        <p>
          <span>Realtive Luftfeuchtigkeit: </span>
          {humidity} %
        </p>
      </div>
    </div>
  );
}

export default HumidityTile;
