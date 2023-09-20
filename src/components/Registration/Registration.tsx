import Styles from './Registration.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useContext, useState} from "react";
import {User} from "../../types/User.ts";
import {AppContext} from "../../main.tsx";

const EMPTY_STRING: string = '';

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE REGISTRATION PAGE
export const Registration = () => {
    const {userService}  = useContext(AppContext);
    const [username, setUsername] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState(EMPTY_STRING);

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        const user: User | string = userService.createUser(username, password);
        if (typeof user === 'string') {
            setIsRegistrationSuccessful(false);
            setRegistrationMessage(user);
            setUsername(EMPTY_STRING);
            setPassword(EMPTY_STRING);
        } else {
            setIsRegistrationSuccessful(true);
            setRegistrationMessage('Congratulations! You have been successfully signed up!');
            setUsername(EMPTY_STRING);
            setPassword(EMPTY_STRING);
        }
    }

   return <>
       <Header/>
    <form className={Styles.registerForm}>
       <label className={Styles.registerFormInput}>
           Username:  <input
           type="text"
           placeholder="enter your nickname"
           value={username}
           onChange={(event) => setUsername(event.target.value)}
       />
       </label>
       <label className={Styles.registerFormInput}>
           Password: <input
           type="password"
           placeholder="at least 6 characters"
           value={password}
           onChange={(event) => setPassword(event.target.value)}
       />
       </label>
       <button
           type="submit"
           className={Styles.registerFormSubmit}
           onClick={(event) => handleClick(event)}>
           SIGN UP
       </button>
    </form>
       <div className={isRegistrationSuccessful ? Styles.successMessage : Styles.errorMessage}>
           {registrationMessage}
       </div>
       <Footer/>
   </>
}