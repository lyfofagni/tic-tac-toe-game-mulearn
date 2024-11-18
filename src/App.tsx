import React, { useState } from 'react';
import Board from './components/Board';
import { RotateCcw, Trophy } from 'lucide-react';

function calculateWinner(squares: (string | null)[]): { winner: string | null; line: number[] | null } {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

function App() {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { winner, line } = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;
    
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const getStatus = () => {
    if (winner) {
      return (
        <div className="flex items-center gap-2 text-emerald-600">
          <Trophy className="w-6 h-6" />
          <span>Winner: {winner}</span>
        </div>
      );
    } else if (isDraw) {
      return "It's a draw!";
    } else {
      return (
        <div className={`flex items-center gap-2 ${xIsNext ? 'text-blue-600' : 'text-rose-600'}`}>
          Next player: {xIsNext ? 'X' : 'O'}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Tic Tac Toe</h1>
        
        <div className="mb-6 text-xl font-semibold text-center">
          {getStatus()}
        </div>

        <Board
          squares={squares}
          onClick={handleClick}
          winningLine={line}
        />

        <button
          onClick={resetGame}
          className="mt-6 w-full py-2 px-4 bg-gray-800 text-white rounded-lg
            hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Restart Game
        </button>
      </div>
    </div>
  );
}

export default App;