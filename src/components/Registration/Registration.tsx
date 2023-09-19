import Styles from './Registration.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useState} from "react";
import {useServices} from "../../context/ServicesContext.tsx";
import {User} from "../../types/User.tsx";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE REGISTRATION PAGE
export const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState('');
    const {userService} = useServices();

    function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        event.preventDefault();
        const user: User | string = userService.createUser(username, password);
        if (typeof user === 'string') {
            setIsRegistrationSuccessful(false);
            setRegistrationMessage(user);
        } else {
            setIsRegistrationSuccessful(true);
            setRegistrationMessage('Congratulations! You have been successfully signed up!');
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