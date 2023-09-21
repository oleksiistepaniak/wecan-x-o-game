import Styles from './Menu.module.scss';
import { Link } from "react-router-dom";
import {Footer} from "../Footer/Footer.tsx";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE MENU PAGE
export const Menu = () => {
  return <div className={Styles.menu}>
      <h1 className={Styles.menuTitle}>
          WECAN TIC TAC TOE GAME
      </h1>
      <Link
          to="/sign-in"
          className={Styles.menuItem}>
          START NEW GAME
      </Link>
      <Link
          to="/sign-up"
          className={Styles.menuItem}>
          SIGN UP
      </Link>
      <Link
          to="/records"
          className={Styles.menuItem}>
          RECORDS
      </Link>
      <Link
          to="/history"
          className={Styles.menuItem}>
          HISTORY OF GAMES
      </Link>
      <Footer/>
  </div>
};