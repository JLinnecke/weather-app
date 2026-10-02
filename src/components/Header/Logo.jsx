import styles from "./Header.module.css";

function Logo() {
  return (
    <div>
      <img src="/logo.webp" alt="Weather Logo" className={styles.logo}></img>
    </div>
  );
}

export default Logo;
