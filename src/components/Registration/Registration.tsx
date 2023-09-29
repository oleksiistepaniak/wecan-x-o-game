import Styles from './Registration.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useContext, useState} from "react";
import {AppContext} from "../../main.tsx";
import {Link, useNavigate} from "react-router-dom";
import {UserRequestDto} from "../../../backend/src/dtos/UserRequestDto.ts";

const EMPTY_STRING: string = '';

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE REGISTRATION PAGE
export const Registration = () => {
    const {backendService} = useContext(AppContext);
    const [username, setUsername] = useState(EMPTY_STRING);
    const [password, setPassword] = useState(EMPTY_STRING);
    const [email, setEmail] = useState(EMPTY_STRING);
    const [isRegistrationSuccessful, setIsRegistrationSuccessful] = useState(false);
    const [registrationMessage, setRegistrationMessage] = useState(EMPTY_STRING);
    const navigate = useNavigate();

    async function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        const userDatabase: UserRequestDto = {
            email: email,
            username: username,
            password: password,
        };

        try {
            const response = await backendService.createUser(userDatabase);
            if (response.ok) {
                setIsRegistrationSuccessful(true);
                setRegistrationMessage('Congratulations! You have been successfully signed up!');
                setUsername(EMPTY_STRING);
                setPassword(EMPTY_STRING);
                setEmail(EMPTY_STRING);
                setTimeout(() => {
                    navigate('/');
                }, 5000);
            } else if (response.status === 409) {
                setIsRegistrationSuccessful(false);
                setRegistrationMessage(`A user with this username already exists!`);
                setUsername(EMPTY_STRING);
                setPassword(EMPTY_STRING);
                setEmail(EMPTY_STRING);
            } else {
                setIsRegistrationSuccessful(false);
                setRegistrationMessage('You have entered an invalid data! Please, try again!');
                setUsername(EMPTY_STRING);
                setPassword(EMPTY_STRING);
                setEmail(EMPTY_STRING);
            }
        } catch (error) {
            console.error('Error during sending POST query', error);
        }
    }

   return <>
       <Header/>
    <form className={Styles.registerForm}>
        <div className={Styles.registerFormTitle}>
            REGISTRATION
        </div>
        <label className={Styles.registerFormItem}>
            <div className={Styles.registerFormTextContainer}>
                Email
            </div>
            <input
            className={Styles.registerFormText}
            type="text"
            placeholder="enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
        </label>
       <label className={Styles.registerFormInput}>
           <div className={Styles.registerFormTextContainer}>
               Username
           </div>
           <input
           className={Styles.registerFormText}
           type="text"
           placeholder="enter your nickname"
           value={username}
           onChange={(event) => setUsername(event.target.value)}
       />
       </label>
       <label className={Styles.registerFormInput}>
           <div className={Styles.registerFormTextContainer}>
               Password
           </div>
           <input
           className={Styles.registerFormText}
           type="password"
           placeholder="at least 6 characters"
           value={password}
           onChange={(event) => setPassword(event.target.value)}
       />
       </label>
        <div className={isRegistrationSuccessful ? Styles.successMessage : Styles.errorMessage}>
            {registrationMessage}
        </div>
       <button
           type="submit"
           className={Styles.registerFormSubmit}
           onClick={(event) => handleClick(event)}>
           SIGN UP
       </button>
        <div className={Styles.registerFormIsAlreadyRegistered}>
            <div className={Styles.registerFormIsAlreadyRegisteredText}>
                Are you already registered? You can sign in
            </div>
            <Link
                to="/sign-in"
                className={Styles.registerFormSignIn}>
                SIGN IN
            </Link>
        </div>
    </form>
       <Footer/>
   </>
}