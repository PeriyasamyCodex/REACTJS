import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

const initalPlayers = {
  X: "Player 1",
  O: "Player 2"
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
let currPlayerSymbol = 'X';
let gameOverFlag = false;
let winner = '';
let boxCounter = 0;
function App() {
  //console.log('App executing ...');
  const [logData, setLogData] = useState([]);
  const [players, setPlayers] = useState(initalPlayers);

  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  //console.log(gameBoard);

  WINNING_COMBINATIONS.forEach((combinations) => {
    const firstBoxValue = gameBoard[combinations[0].row][combinations[0].column];
    const secondBoxValue = gameBoard[combinations[1].row][combinations[1].column];
    const thirdBoxValue = gameBoard[combinations[2].row][combinations[2].column];
    //console.log(' '+firstBoxValue+ ' ' + secondBoxValue + ' '+ thirdBoxValue);
    if (firstBoxValue &&
      firstBoxValue === secondBoxValue &&
      firstBoxValue === thirdBoxValue
    ) {
      console.log('PLayer '+firstBoxValue+ ' Won');
      winner=players[firstBoxValue];
      gameOverFlag = true;
    }
    console.log('boxCounter '+boxCounter);
    if (boxCounter == 9 && !winner) {
      gameOverFlag = true;
    }
  });

  function handleSelectSquare(rowIndex, colIndex) {
    boxCounter++;
    currPlayerSymbol = (currPlayerSymbol === 'X') ? 'O' : 'X';
    //console.log('handleSelectSquare executing ...'+currPlayerSymbol);
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
      updatedGameBoard[rowIndex][colIndex] = currPlayerSymbol;     
      return updatedGameBoard;

    });
    setLogData((prevLogData) => {
      const playerName =  players[currPlayerSymbol];
      const updatedLogData = [...prevLogData];
      updatedLogData.push({playerName: playerName , playerSymbol: currPlayerSymbol, playerSelRowIndex: rowIndex, playerSelectedColIndex: colIndex});
      //console.log('logData ...'+JSON.stringify(updatedLogData));
      return updatedLogData;
     });
    //console.log('handleSelectSquare executing ...'+gameBoard);

  }

  function updatePlayerName(playerName,symbol) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: playerName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player name={players.X} onPlayerNameChange={updatePlayerName} symbol="X" />
          <Player name={players.O} onPlayerNameChange={updatePlayerName} symbol="O" />
        </ol>
        {gameOverFlag  && ( <GameOver winner={winner}/> ) }
        <GameBoard onSelectSquare={handleSelectSquare} gameboard={gameBoard} />
        <Log logData={logData}/>
      </div>

    </main>
  )
}

export default App
