import {useContext, useState} from "react";
import {Square} from '../Square/Square';
import {Link, useSearchParams} from "react-router-dom";
import Styles from "./Board.module.scss"
import {Header} from "../Header/Header.tsx";
import {Footer} from "../Footer/Footer.tsx";
import {AppContext} from "../../main.tsx";

// THE MAIN COMPONENT IN THE GAME. IT IS INCLUDED THE GAME BOARD AND THE LOGICS HOW TO PROCESS A CLICK
// AND SO FORTH
export default function Board() {
    const {gameService} = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const quantityOfRows = parseInt(searchParams.get("rows") || "3");
    const quantityOfColumns = parseInt(searchParams.get("cols") || "3");
    const [xIsNextTurn, setXIsNextTurn]
        = useState(true);
    const [squares, setSquares]
        = useState<(string | null)[][]>(gameService.createBoard(quantityOfRows, quantityOfColumns));
    const winner: string | null = gameService.estimateWinner(squares);
    const status: string = gameService.printStatusInfo(squares, xIsNextTurn, winner);

    function handleClick(mainIndex: number, secondIndex: number) {
        if (squares[mainIndex][secondIndex] || gameService.estimateWinner(squares)) {
            return;
        }
        const nextSquares: (string | null)[][] = [...squares];
        if (xIsNextTurn) {
            nextSquares[mainIndex][secondIndex] = 'X';
        } else {
            nextSquares[mainIndex][secondIndex] = 'O';
        }
        setSquares(nextSquares);
        setXIsNextTurn(!xIsNextTurn);
        console.log(squares);
    }

    return (
        <>
            <Header/>
            <Link
                to="/start-game"
                className={Styles.boardMenuItem}>
                START NEW GAME
            </Link>
            <div className={Styles.status}>{status}</div>
            <div className={Styles.gameBoard}>
                {squares.map((row: (string | null)[], rowIndex: number)=>
                {
                    return <div
                        className={Styles.row}
                        key={rowIndex}>
                        {row.map((value: string | null, columnIndex: number)=>{
                            return <Square
                                key={columnIndex}
                                value={value}
                                onSquareClick={() => handleClick(rowIndex, columnIndex)}
                            />
                        })}
                    </div>
                })}
            </div>
            <Footer/>
        </>
    )
}