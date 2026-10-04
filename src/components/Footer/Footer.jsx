import styles from "./Footer.module.css";

function Footer() {
  return (
    <div>
      <footer className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="/legal-notice">Legal Notice</a>
          <a href="/privacy-policy">Privacy Policy</a>
        </div>

        <a
          href="https://open-meteo.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Weather data by Open-Meteo
        </a>

        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noopener noreferrer"
        >
          © OpenStreetMap contributors
        </a>

        <span>© 2026 Johannes Linnecke</span>
      </footer>
    </div>
  );
}

export default Footer;
