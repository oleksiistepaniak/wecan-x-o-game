import Styles from './BoardMaker.module.scss';
import {Link} from "react-router-dom";
import {useState} from "react";
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";

// A COMPONENT WHICH ALLOWS TO CHOOSE HOW MANY COLUMNS AND ROWS IN THE BOARD WILL BE CREATED
export const BoardMaker = () => {
    const [numberOfRows, setNumberOfRows] = useState(3);
    const [numberOfColumns, setNumberOfColumns] = useState(3);

    return <>
        <Header />
        <form className={Styles.boardMakerForm}>
                Enter number of columns:
                <input
                    type="text"
                    value={numberOfColumns}
                    className={Styles.boardMakerInputText}
                    onChange={(event) => setNumberOfColumns(parseInt(event.target.value))}
                />
                Enter number of rows:
                <input
                    type="text"
                    value={numberOfRows}
                    className={Styles.boardMakerInputText}
                    onChange={(event) => setNumberOfRows(+event.target.value)}
                />
            <Link
                to={`/game?rows=${numberOfRows}&cols=${numberOfColumns}`}
                className={Styles.boardMakerSubmit}>
                START NEW GAME
            </Link>
        </form>
        <Footer/>
        </>
};