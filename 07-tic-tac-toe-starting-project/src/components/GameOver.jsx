export default function GameOver({winner}) {
    return (
        <div id="game-over">
            <h2>Game Over</h2>
            {winner ? <h3>Player {winner} Won !!!</h3> : <h3>Match Draw !!!</h3>}
            
        </div>
    );
}