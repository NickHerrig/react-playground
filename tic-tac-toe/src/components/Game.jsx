import React, {useState} from 'react'
import '../index.css'


function Square(props) {
  
  return (
    <button 
    className="square" 
    onClick={props.onClick}>
      {props.value}
    </button>
  )
}

function Board(props) {

  const renderSquare = (i) => {
    return <Square 
      value={props.squares[i]}
      onClick={() => props.onClick(i)}
    />
  }

  return (
    
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

export function Game(props) {
  const [history, setHistory] = useState([{"squares": Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const current = history[history.length - 1];

  const handleClick = (i) => {
    if (calculateWinner(current.squares) || current.squares[i]) {
      return
    }
    const squaresCopy = current.squares.slice();
    squaresCopy[i] = xIsNext ? 'X' : 'O';
    setHistory(history.concat([{"squares":squaresCopy}]))
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(current.squares);
  let status
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`; 
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}