import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import Styles from './History.module.scss';
import {useContext, useState} from "react";
import {AppContext} from "../../main.tsx";
import {Game} from "../../types/Game.ts";
import {useNavigate} from "react-router-dom";

export const History = () => {
    const [enteredGameId, setEnteredGameId] = useState(0);
    const [gameNotFoundMessage, setGameNotFoundMessage] = useState('');
    const {historyService}  = useContext(AppContext);
    const navigate = useNavigate();
    const game: Game | undefined = historyService.getGameById(enteredGameId);

    function handleClick(event:  React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        if (game === undefined) {
            setGameNotFoundMessage(`There is no such game by ${enteredGameId} identifier!`);
        } else {
            navigate(`/history/games?id=${enteredGameId}`);
        }
    }

    return <>
        <Header/>
        <div className={Styles.historyForm}>
            Enter a game id: <input
            className={Styles.historyInput}
            type="number"
            value={enteredGameId}
            onChange={(event) => setEnteredGameId(+event.target.value)}/>
            <button
                className={Styles.historySubmit}
                type="submit"
                onClick={(event) => handleClick(event) }>
                SEARCH
            </button>
        </div>
        <div className={historyService.getGameById(enteredGameId) === undefined ? Styles.errorMessage : ''}>
            {gameNotFoundMessage}
        </div>
        <Footer/>
    </>
}