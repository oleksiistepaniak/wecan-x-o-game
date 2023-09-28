import Styles from './Authentication.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useContext, useState} from "react";
import {AppContext} from "../../main.tsx";
import { useNavigate} from "react-router-dom";
import {UserDto} from "../../../backend/src/user/dto/user-dto.ts";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE AUTHENTICATION PAGE
export const Authentication = () => {
    const {userService} = useContext(AppContext);
    const [xUsername, setXUsername] = useState('');
    const [xPassword, setXPassword] = useState('');
    const [xUserId, setXUserId] = useState('');
    const [oUsername, setOUsername] = useState('');
    const [oPassword, setOPassword] = useState('');
    const [oUserId, setOUserId] = useState('');
    const [xIsAuthenticated, setXIsAuthenticated]
        = useState(false);
    const [xAuthenticationMessage, setXAuthenticationMessage]
        = useState('');
    const [oIsAuthenticated, setOIsAuthenticated]
        = useState(false);
    const [oAuthenticationMessage, setOAuthenticationMessage]
        = useState('');
    const [isContinuePossible, setIsContinuePossible]
        = useState(false);
    const [continueMessage, setContinueMessage]
        = useState('');
    const navigate = useNavigate();

    async function handleClickFirstUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        const userX: UserDto = {
            username: xUsername,
            password: xPassword
        }
        const response = await userService.authenticate(userX);
        const userXData = await response.json();

        if (response.ok) {
            setXIsAuthenticated(true);
            setXAuthenticationMessage('You have successfully signed in as X!');
            setXUserId(userXData._id);
            setXUsername('');
            setXPassword('');
        } else if (response.status === 400) {
            setXIsAuthenticated(false);
            setXAuthenticationMessage('You have entered wrong password or username!');
            setXUsername('');
            setXPassword('');
        }
        if (xUsername === oUsername) {
            setXIsAuthenticated(false);
            setXAuthenticationMessage('Each user must be unique!');
            setXUsername('');
            setXPassword('');
        }
    }

    async function handleClickSecondUser(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        const userO: UserDto = {
            username: oUsername,
            password: oPassword
        }
        const response = await userService.authenticate(userO);
        const userOData = await response.json();

        if (response.ok) {
            setOIsAuthenticated(true);
            setOAuthenticationMessage('You have successfully signed in as X!');
            setOUserId(userOData._id);
            setOUsername('');
            setOPassword('');
        } else if (response.status === 400) {
            setOIsAuthenticated(false);
            setOAuthenticationMessage('You have entered wrong password or username!');
            setOUsername('');
            setOPassword('');
        }
        if (xUsername === oUsername) {
            setOIsAuthenticated(false);
            setOAuthenticationMessage('Each user must be unique!');
            setOUsername('');
            setOPassword('');
        }
    }

    function handleContinueClick(event:   React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        if ((xUserId !== '' && oUserId !== '') && (xUserId !== oUserId)) {
            setIsContinuePossible(true);
            navigate(`/start-game?firstUserId=${xUserId}&secondUserId=${oUserId}`);
        } else {
            setIsContinuePossible(false);
            setContinueMessage('You need to sign in before proceed to the next step!');
        }
    }

  return <>
      <Header/>
      <div className={Styles.authenticationBlock}>
      <form className={Styles.authenticationForm}>
          <label className={Styles.authenticationItem}>
              Username for X:
              <input
                  className={Styles.authenticationInput}
                  type="text"
                  value={xUsername}
                  placeholder="enter X username"
                  onChange={(event) => setXUsername(event.target.value)}/>
          </label>
          <label className={Styles.authenticationItem}>
              Password for X:
              <input
                  className={Styles.authenticationInput}
                  type="password"
                  value={xPassword}
                  placeholder="enter X password"
                  onChange={(event) => setXPassword(event.target.value)}/>
          </label>
          <button
              className={Styles.authenticationSubmit}
              type="submit"
              onClick={(event) => handleClickFirstUser(event)}>
              SIGN IN AS X
          </button>
          <div className={xIsAuthenticated ? Styles.successMessage : Styles.errorMessage}>
              {xAuthenticationMessage}
          </div>
      </form>
      <form className={Styles.authenticationForm}>
          <label className={Styles.authenticationItem}>
              Username for O:
              <input
                  className={Styles.authenticationInput}
                  type="text"
                  value={oUsername}
                  placeholder="enter O username"
                  onChange={(event) => setOUsername(event.target.value)}/>
          </label>
          <label className={Styles.authenticationItem}>
              Password for O:
              <input
                  className={Styles.authenticationInput}
                  type="password"
                  value={oPassword}
                  placeholder="enter O password"
                  onChange={(event) => setOPassword(event.target.value)}/>
          </label>
          <button
              className={Styles.authenticationSubmit}
              type="submit"
              onClick={(event) => handleClickSecondUser(event)}>
              SIGN IN AS O
          </button>
          <div className={oIsAuthenticated ? Styles.successMessage : Styles.errorMessage}>
              {oAuthenticationMessage}
          </div>
      </form>
      </div>
      <div className={Styles.continueForm}>
          <button
              className={Styles.continueButton}
              onClick={(event) => handleContinueClick(event)}>
              CONTINUE
          </button>
          <div className={isContinuePossible ? '' : Styles.errorMessage}>
              {continueMessage}
          </div>
      </div>
      <Footer/>
  </>
};