import Styles from './Footer.module.scss';
import {Link} from "react-router-dom";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE FOOTER FOR EVERY PAGE IN THE APPLICATION
export const Footer = () => {
  return <footer className={Styles.footer}>
      <p className={Styles.footerText}>
          (c) Oleksii Stepaniak, 2023
      </p>
      <Link to="/rules" className={Styles.footerItem}> HOW TO PLAY TIC TAC TOE GAME?</Link>
  </footer>
};