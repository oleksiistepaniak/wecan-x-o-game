import Styles from './HistoryGame.module.scss';
import {Header} from "../../Header/Header.tsx";
import {Footer} from "../../Footer/Footer.tsx";
import {useSearchParams} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../../../main.tsx";
import {Game} from "../../../types/Game.ts";
import {Square} from "../../Square/Square.tsx";

export const HistoryGame = () => {
    const {historyService} = useContext(AppContext);
    const [searchParams] = useSearchParams();
    const gameId: number = parseInt(searchParams.get('id') || '0');
    const game: Game | undefined = historyService.getGameById(gameId);
    let board: (string | null)[][] = [];

    if (typeof game !== 'undefined') {
        board = game.board;
    }

    return <>
        <Header/>
        <div className={Styles.historyWinner}>
            A winner was {game!.winner}!
        </div>
        <div className={Styles.historyBoard}>
            {board.map((row: (string | null)[], rowIndex: number) => {
                return <div
                    className={Styles.historyRow}
                    key={rowIndex}>
                    {row.map((value: string | null, columnIndex: number) => {
                        return <Square
                            key={columnIndex}
                            value={value}
                        />
                    })}
                </div>
            })}
        </div>
        <Footer/>
    </>
};