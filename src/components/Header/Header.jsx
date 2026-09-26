import styles from "./Header.module.css";

import Logo from "./Logo";
import Search from "../Search/Search";

function Header({ setSearchResults }) {
  return (
    <header className={styles.header}>
      <Logo />
      <Search setSearchResults={setSearchResults} />
    </header>
  );
}

export default Header;
