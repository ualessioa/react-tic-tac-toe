import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"
import Log from "./components/Log"
import GameOver from "./components/GameOver"

import { WINNING_COMBOS } from "./winning-combinations"

const PLAYERS ={
  X: 'Player 1',
  O: 'Player 2'
}

function deriveActivePlayer(gameTurns){
  let currentPlayer = 'X'

  if (gameTurns.length > 0 && gameTurns[0].player === "X"){
    currentPlayer = "O"
  }
  
  return currentPlayer
}

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]


function deriveWinner(gameBoard, players){
  let winner

  for (const combo of WINNING_COMBOS) {
    const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column]
    const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column]
    const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol == thirdSquareSymbol) {
      winner = players[firstSquareSymbol]
    }

 }

 return winner
}

function derivedGameBoard(gameTurns){
let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])]
    for (const turn of gameTurns) {
        const {square, player} = turn
        const {row, col} = square
        gameBoard[row][col] = player
    }

    return gameBoard
}


function App() {
  const [players, setPlayers] = useState(PLAYERS)

  const [gameTurns, setGameTurns] = useState([])

  let activePlayer = deriveActivePlayer(gameTurns)

  const gameBoard = derivedGameBoard(gameTurns)

  const winner = deriveWinner(gameBoard, players)

 const isDraw = gameTurns.length === 9 && !winner

  function handleSelectSquare(rowIndex, colIndex, ) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns)
      
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer},...prevTurns]
      
      return updatedTurns
    })
  }

  function handleRestart(){
    setGameTurns([])
  }

  function handlePlayerChange(symbol, newName){
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div  id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerChange}/>
        </ol>
        { (winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>

      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
