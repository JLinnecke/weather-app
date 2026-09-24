import WeatherLogo from "../../../public/logo.png";
import styles from "./Header.module.css";

function Logo() {
  return (
    <div>
      <img src={WeatherLogo} alt={WeatherLogo} className={styles.logo}></img>
    </div>
  );
}

export default Logo;
