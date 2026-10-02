import styles from "./PercipitationTile.module.css";

function PercipitationTile({ precipitation, precipitationProbaility }) {
  return (
    <div className={styles.PercipitationTile}>
      <h1>Niederschlag</h1>
      <div className={styles.precipitationDetails}>
        <p>
          <span>Niederschlag warscheinlichkeit: </span>
          {precipitationProbaility} %
        </p>
        <p>
          <span>Niederschlag: </span>
          {precipitation} mm
        </p>
      </div>
    </div>
  );
}

export default PercipitationTile;
