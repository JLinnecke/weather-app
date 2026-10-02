import styles from "./PercipitationTile.module.css";

function PercipitationTile({ precipitation, precipitationProbaility }) {
  return (
    <div className={styles.PercipitationTile}>
      <h3 className={styles.tileHeading}>Precipitation</h3>
      <div className={styles.precipitationDetails}>
        <p>
          <span>Precipitation probaility: </span>
          {precipitationProbaility} %
        </p>
        <p>
          <span>Precipitation: </span>
          {precipitation} mm
        </p>
      </div>
    </div>
  );
}

export default PercipitationTile;
