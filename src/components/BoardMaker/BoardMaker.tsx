import Styles from './BoardMaker.module.scss';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useState} from "react";
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {AppContext} from "../../main.tsx";

// A COMPONENT WHICH ALLOWS TO CHOOSE HOW MANY COLUMNS AND ROWS IN THE BOARD WILL BE CREATED
export const BoardMaker = () => {
    const { gameService, userService} = useContext(AppContext);
    const [numberOfRows, setNumberOfRows] = useState(3);
    const [numberOfColumns, setNumberOfColumns] = useState(3);
    const [numberToWin, setNumberToWin] = useState(3);
    const [message, setMessage] = useState('');
    const [numberToWinIsCorrect, setNumberToWinIsCorrect] = useState(false);
    const [searchParams] = useSearchParams();
    const firstUserId: string = searchParams.get('firstUserId') || '0';
    const secondUserId: string = searchParams.get('secondUserId') || '0';
    const navigate = useNavigate();

    async function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        event.preventDefault();
            try {
                const biggestValue = numberOfColumns < numberOfRows ? numberOfColumns : numberOfColumns === numberOfRows ? numberOfColumns : numberOfRows;
                if (numberToWin < 3 || numberToWin > biggestValue) {
                    setNumberToWinIsCorrect(false);
                    setMessage(`Min value for number to win is 3 and max value for number to win is ${biggestValue}`);
                }
                const firstUser = await userService.getUserById(firstUserId);
                const secondUser = await userService.getUserById(secondUserId);
                const dto: CreateGameDto = {
                    users: [firstUser, secondUser],
                    numberToWin: numberToWin.toString(),
                    numberOfRows: numberOfRows.toString(),
                    numberOfColumns: numberOfColumns.toString(),
                }
                const response = await gameService.createGame(dto);
                if (response.ok) {
                    const data = await response.json();
                    setMessage('');
                    navigate(`/game?id=${data._id}`);
                } else {
                    setMessage('Unsuccessfully attempt to create a game!');
                }
            } catch (error) {
                console.error('Could not create a game', error);
                throw error;
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
                    onChange={(event) => setNumberOfRows(parseInt(event.target.value))}
                />
                Enter number of matches for a win:
                <input
                type="number"
                min={3}
                max={10}
                value={numberToWin}
                className={Styles.boardMakerInputText}
                onChange={(event) => setNumberToWin(parseInt(event.target.value))}
            />
            <Link
                to={''}
                className={Styles.boardMakerSubmit}
                onClick={(event) => handleClick(event)}>
                START NEW GAME
            </Link>
        </form>
        <div className={numberToWinIsCorrect ? '' : Styles.isNotSuccessMessage}>
            {numberToWinIsCorrect ? message : message}
        </div>
        <Footer/>
        </>
};