import Styles from './BoardMaker.module.scss';
import {Link} from "react-router-dom";
import {useState} from "react";
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {useServices} from "../../context/ServicesContext.tsx";

// A COMPONENT WHICH ALLOWS TO CHOOSE HOW MANY COLUMNS AND ROWS IN THE BOARD WILL BE CREATED
export const BoardMaker = () => {
    const { boardMakerService } = useServices();
    const [numberOfRows, setNumberOfRows] = useState(3);
    const [numberOfColumns, setNumberOfColumns] = useState(3);
    const [message, setMessage] = useState('');
    const [rowsAndColumnsAreEqual, setRowsAndColumnsAreEqual]
        = useState(false);

    function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
        event.preventDefault();
        const result: string | boolean =
            boardMakerService.checkForEqualityNumberOfRowsAndNumberOfColumns(numberOfRows, numberOfColumns);
        if (typeof result === 'string') {
            setRowsAndColumnsAreEqual(false);
            setMessage(result);
        } else {
            setRowsAndColumnsAreEqual(true);
            setMessage('');
            window.location.href = `/game?rows=${numberOfRows}&cols=${numberOfColumns}`;
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
                to={`/game?rows=${numberOfRows}&cols=${numberOfColumns}`}
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