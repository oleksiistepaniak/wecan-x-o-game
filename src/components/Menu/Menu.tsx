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
          to="/start-game"
          className={Styles.menuItem}>
          START NEW GAME
      </Link>
      <Link
          to="/register"
          className={Styles.menuItem}>
          REGISTER
      </Link>
      <Link
          to="/records"
          className={Styles.menuItem}>
          RECORDS
      </Link>
      <Link to="/sign-in"
            className={Styles.menuItem}>
          SIGN IN
      </Link>
      <Footer/>
  </div>
};