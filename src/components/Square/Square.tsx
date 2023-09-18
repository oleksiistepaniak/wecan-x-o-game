import Styles from './Square.module.scss';

// A COMPONENT WHICH IS RESPONSIBLE FOR RENDERING THE SQUARES FOR THE BOARDS PAGE
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