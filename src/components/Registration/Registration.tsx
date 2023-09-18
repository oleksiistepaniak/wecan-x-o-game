import Styles from './Registration.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useState} from "react";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE REGISTRATION PAGE
export const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
           minLength={6}
           maxLength={20}
           value={password}
           onChange={(event) => setPassword(event.target.value)}
       />
       </label>
       <button
           type="submit"
           className={Styles.registerFormSubmit}>
           SIGN UP
       </button>
    </form>
       <Footer/>
   </>
}