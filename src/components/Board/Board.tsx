import {useState} from "react";
import {Square} from '../Square/Square';
import {Link, useSearchParams} from "react-router-dom";
import {GameService} from "../../services/GameService.ts";
import Styles from "./Board.module.scss"
import {Header} from "../Header/Header.tsx";

let data: string | null[][] = [];

export default function Board() {
    const [searchParams] = useSearchParams();
    const quantityOfRows = parseInt(searchParams.get("rows") || "3");
    const quantityOfColumns = parseInt(searchParams.get("cols") || "3");
    const board:number[][] = [];

    for (let i = 0; i < quantityOfRows; i++)
    {
        let row = [];
        for (let j = 0; j < quantityOfColumns; j++) {
            row.push(i * quantityOfColumns + j);
        }
        board.push(row)
    }

    const [xIsNextTurn, setXIsNextTurn]
        = useState(true);
    const [squares, setSquares]
        = useState<string | null[][]>(initData);
    const gameService: GameService = new GameService();
    const winner: string | null = gameService.estimateWinner(squares);
    let status: string = gameService.printStatusInfo(squares, xIsNextTurn, winner);

    function initData(): string | null [][] {
        data = [];
        for (let i = 0; i < quantityOfRows; i++) {
            let row = [];
            for (let j = 0; j < quantityOfColumns; j++) {
                row.push(null);
            }
            data.push(row);
        }
        return data;
    }


    function startNewGame() {
        setXIsNextTurn(true);
        setSquares(initData);
        data = initData();
    }

    function handleClick(i: number) {
        if (squares[i] || gameService.estimateWinner(squares)) {
            return;
        }
    }

    return (
        <>
            <Header/>
            <Link to="/game" className={Styles.boardMenuItem} onClick={startNewGame}>START NEW GAME</Link>
            <div className={Styles.status}>{status}</div>
            <div className={Styles.gameBoard}>
                {board.map((it)=>
                {
                    return <div className={Styles.row}>
                        {it.map((c)=>{
                            return <Square value={c} onSquareClick={() => handleClick(c)}/>
                        })}
                    </div>
                })}
            </div>
        </>
    )
}