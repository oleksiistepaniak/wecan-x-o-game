import Styles from "../Header/Header.module.scss";
import {Link} from "react-router-dom";

export const Header = () => {
  return <header className={Styles.header}>
      <h1 className={Styles.headerTitle}>
          WECAN TIC TAC TOE GAME
      </h1>
      <Link
          to="/"
          className={Styles.headerItem}>
          GO TO MENU
      </Link>
  </header>
};