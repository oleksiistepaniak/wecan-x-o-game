import Styles from './Rules.module.scss';
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE RULES PAGE
export const Rules = () => {
    return <>
    <Header/>
        <h1 className={Styles.rulesTitle}>TIC TAC TOE GAME RULES</h1>
        <div className={Styles.rules}>
           <p className={Styles.rulesText}>
               Players choose the number of rows and columns for the game board.
               Your main objective is to place 'X' or 'O' in a single row, column,
               or diagonal without allowing your opponent to do the same.
               You can make a move in any cell on the game board.
               Moves are made in parallel: first, you make a move, and then your opponent does, or vice versa.
           </p>
        </div>
        <Footer/>
    </>
};