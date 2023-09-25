import Styles from './Registration.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import { useState} from "react";

import {CreateUserDto} from "../../../backend/src/user/dto/create-user.dto.ts";

const EMPTY_STRING: string = '';

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE REGISTRATION PAGE
export const Registration = () => {
    const [username, setUsername] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState(EMPTY_STRING);

    async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        const userDatabase: CreateUserDto = {
            username: username,
            password: password,
        };

        try {
            const response = await fetch('http://localhost:5555/user',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userDatabase),
            });
            if (response.ok) {
                setIsRegistrationSuccessful(true);
                setRegistrationMessage('Congratulations! You have been successfully signed up!');
                setUsername(EMPTY_STRING);
                setPassword(EMPTY_STRING);
            } else {
                const errorMessage = await response.text();
                setIsRegistrationSuccessful(false);
                setRegistrationMessage(errorMessage);
                setUsername(EMPTY_STRING);
                setPassword(EMPTY_STRING);
            }
        } catch (error) {
            console.error('Error during sending POST query', error);
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