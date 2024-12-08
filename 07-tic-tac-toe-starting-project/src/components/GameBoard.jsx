

export default function GameBoard({onSelectSquare, gameboard}) {
console.log('emitted'+gameboard);
  

    return (
        <ol id="game-board">
            {gameboard.map((row, rowIndex) =>
                <li key={rowIndex}><ol>

                    {row.map((col, colIndex) => (
                        <li key={colIndex}>
                            <button onClick={() => onSelectSquare(rowIndex,colIndex)} disabled= {col ? true : false}>{col}</button>
                        </li>

                    ))}
                </ol> </li>
            )}

        </ol>
    );
}