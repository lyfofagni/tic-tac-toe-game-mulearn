import React from 'react';
import { X, Circle } from 'lucide-react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-full flex items-center justify-center text-4xl font-bold transition-all duration-200 
        ${isWinningSquare ? 'bg-emerald-100' : 'hover:bg-gray-50'} 
        border border-gray-200`}
    >
      {value === 'X' && <X className="w-12 h-12 text-blue-600 transition-transform duration-200 transform hover:scale-105" />}
      {value === 'O' && <Circle className="w-12 h-12 text-rose-600 transition-transform duration-200 transform hover:scale-105" />}
    </button>
  );
};

export default Square;