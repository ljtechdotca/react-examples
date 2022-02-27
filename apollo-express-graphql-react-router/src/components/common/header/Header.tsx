import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.root}>
      <Link to="">
        <span className={styles.link}>Home</span>
      </Link>
      <Link to="posts">
        <span className={styles.link}>Posts</span>
      </Link>
    </header>
  );
};

export default Header;
