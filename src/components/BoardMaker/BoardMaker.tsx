import Styles from './BoardMaker.module.scss';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useState} from "react";
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {AppContext} from "../../main.tsx";
import {User} from "../../types/User.ts";
import {database} from "../../data/database.ts";

// A COMPONENT WHICH ALLOWS TO CHOOSE HOW MANY COLUMNS AND ROWS IN THE BOARD WILL BE CREATED
export const BoardMaker = () => {
    const {boardMakerService, gameService, userService} = useContext(AppContext);
    const [numberOfRows, setNumberOfRows] = useState(3);
    const [numberOfColumns, setNumberOfColumns] = useState(3);
    const [message, setMessage] = useState('');
    const [rowsAndColumnsAreEqual, setRowsAndColumnsAreEqual]
        = useState(false);
    const [searchParams] = useSearchParams();
    const firstUserId: number = parseInt(searchParams.get('firstUserId') || '0');
    const secondUserId: number = parseInt(searchParams.get('secondUserId') || '0');
    const navigate = useNavigate();

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault();
        const result: string | boolean =
            boardMakerService.checkForEqualityNumberOfRowsAndNumberOfColumns(numberOfRows, numberOfColumns);
        if (typeof result === 'string') {
            setRowsAndColumnsAreEqual(false);
            setMessage(result);
        } else {
            const firstUser: User | undefined = userService.getUserById(firstUserId);
            const secondUser: User | undefined = userService.getUserById(secondUserId);
            if (typeof firstUser !== 'undefined' && typeof secondUser !== 'undefined') {
                gameService.createGame(
                    firstUser,
                    secondUser,
                    gameService.createBoard(numberOfRows, numberOfColumns),
                    '');
            }
            setRowsAndColumnsAreEqual(true);
            setMessage('');
            navigate(`/game?id=${database.games.length}`);
            console.log(database.games[database.games.length - 1]);
        }
    }

    return <>
        <Header />
        <form className={Styles.boardMakerForm}>
                Enter number of columns:
                <input
                    type="number"
                    min={3}
                    max={10}
                    value={numberOfColumns}
                    className={Styles.boardMakerInputText}
                    onChange={(event) => setNumberOfColumns(parseInt(event.target.value))}
                />
                Enter number of rows:
                <input
                    type="number"
                    min={3}
                    max={10}
                    value={numberOfRows}
                    className={Styles.boardMakerInputText}
                    onChange={(event) => setNumberOfRows(+event.target.value)}
                />
            <Link
                to={`/game?id=${database.games.length}`}
                className={Styles.boardMakerSubmit}
                onClick={(event) => handleClick(event)}>
                START NEW GAME
            </Link>
        </form>
        <div className={rowsAndColumnsAreEqual ? '' : Styles.isNotSuccessMessage}>
            {rowsAndColumnsAreEqual ? message : message}
        </div>
        <Footer/>
        </>
};