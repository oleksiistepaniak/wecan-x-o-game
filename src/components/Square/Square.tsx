import Styles from './Square.module.scss';


export function Square(
    {
        value,
        onSquareClick
    }: {
        value: number,
        onSquareClick: () => void
    }
) {
    return <div
        className={Styles.square}
        onClick={onSquareClick}
    >
        {value}
    </div>;
}