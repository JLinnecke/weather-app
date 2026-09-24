import styles from "./Header.module.css";

import Logo from "./Logo";
import Search from "../Search/Search";

function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <Search />
    </header>
  );
}

export default Header;
