import {useContext, useEffect, useState} from "react";
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
    const gameId: number = parseInt(searchParams.get('id') || '1');
    const game = gameService.getGameById(gameId);
    const [squares, setSquares]
            = useState<(string | null)[][]>(game!.board);
    const [winner, setWinner]
        = useState<string | null>(null);
    const [firstUserWins, setFirstUserWins]
        = useState<number>(game!.firstUser.numberOfVictories);
    const [secondUserWins, setSecondUserWins]
        = useState<number>(game!.secondUser.numberOfVictories);
    const status: string = gameService.printStatusInfo(squares, game!.firstUser, game!.secondUser, winner);

    useEffect(() => {
        const newWinner = gameService.estimateWinner(
            squares,
            game!.firstUser,
            game!.secondUser
        );
        if (newWinner === game!.firstUser.username) {
            setWinner(game!.firstUser.username);
            setFirstUserWins((prevWins) => prevWins + 1);
            game!.firstUser.numberOfVictories = firstUserWins + 1;
            game!.winner = newWinner;
        }
        if (newWinner === game!.secondUser.username) {
            setWinner(game!.secondUser.username);
            setSecondUserWins((prevWins) => prevWins + 1);
            game!.secondUser.numberOfVictories = secondUserWins + 1;
            game!.winner = newWinner;
        }
        if (status === 'Draw!') {
            game!.winner = 'draw';
        }
    }, [squares, game]);

    function handleClick(mainIndex: number, secondIndex: number) {
        if (squares[mainIndex][secondIndex] || winner) {
            return;
        }
        const nextSquares: (string | null)[][] = [...squares];
        if (game?.firstUser.isNextTurn) {
            nextSquares[mainIndex][secondIndex] = 'X';
            game.firstUser.isNextTurn = false;
            game.secondUser.isNextTurn = true;
        } else {
            nextSquares[mainIndex][secondIndex] = 'O';
            game!.secondUser.isNextTurn = false;
            game!.firstUser.isNextTurn = true;
        }
        setSquares(nextSquares);
        game!.board = nextSquares;
        console.log(squares);
        console.log(game);
    }

    return (
        <>
            <Header/>
            <Link
                to="/sign-in"
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