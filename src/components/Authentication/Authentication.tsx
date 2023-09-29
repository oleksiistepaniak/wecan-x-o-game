import Styles from './Authentication.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useContext, useState} from "react";
import {AppContext} from "../../main.tsx";
import {Link, useNavigate} from "react-router-dom";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE AUTHENTICATION PAGE
export const Authentication = () => {
    const {backendService} = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authenticationMessage, setAuthenticationMessage] = useState('');
    const navigate = useNavigate();

    async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
    }

  return <>
      <Header/>
      <form className={Styles.authenticationForm}>
          <div className={Styles.authenticationFormTitle}>
              AUTHENTICATION
          </div>
          <label className={Styles.authenticationFormItem}>
              <div className={Styles.authenticationFormTextContainer}>
                  Email
              </div>
              <input
                  className={Styles.authenticationFormText}
                  type="text"
                  value={email}
                  placeholder="enter your email"
                  onChange={(event) => setEmail(event.target.value)}/>
          </label>
          <label className={Styles.authenticationFormItem}>
              <div className={Styles.authenticationFormTextContainer}>
                  Password
              </div>
              <input
                  className={Styles.authenticationFormText}
                  type="password"
                  value={password}
                  placeholder="enter your password"
                  onChange={(event) => setPassword(event.target.value)}/>
          </label>
          <div className={isAuthenticated ? Styles.successMessage : Styles.errorMessage}>
              {authenticationMessage}
          </div>
          <button
              className={Styles.authenticationFormSubmit}
              type="submit"
              onClick={(event) => handleClick(event)}>
              SIGN IN
          </button>
          <div className={Styles.authenticationFormIsNotRegistered}>
              <div className={Styles.authenticationFormIsNotRegisteredText}>
                  Not registered yet? You can sign up
              </div>
              <Link
                  to="/sign-up"
                  className={Styles.authenticationFormSignUp}>
                  SIGN UP
              </Link>
          </div>
      </form>
      <Footer/>
  </>
};