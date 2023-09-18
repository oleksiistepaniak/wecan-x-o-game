import Styles from './Registration.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING REGISTRATION PAGE
export const Registration = () => {

   return <>
       <Header/>
    <form className={Styles.registerForm}>
       <label className={Styles.registerFormInput}>
           Username:  <input
           type="text"
           placeholder="enter your nickname"
       />
       </label>
       <label className={Styles.registerFormInput}>
           Password: <input
           type="password"
           placeholder="at least 6 characters"
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