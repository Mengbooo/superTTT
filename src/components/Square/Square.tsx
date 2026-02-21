import React from 'react';
import type { PlayerId } from '../../types';

export interface SquareProps {
  player: PlayerId | null;
  index: number;
  disabled: boolean;
  isLegalMove: boolean;
  onClick: () => void;
}

export const Square: React.FC<SquareProps> = ({
  player,
  disabled,
  isLegalMove,
  onClick,
}) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <button
      className={`square ${player ? player.toLowerCase() : ''} ${isLegalMove ? 'legal-move' : ''} ${!isLegalMove && disabled ? 'opacity-50' : ''}`}
      onClick={handleClick}
      disabled={disabled || !!player}
      aria-label={player ? `Occupied by ${player}` : 'Empty square'}
    >
      {player === 'X' && '✕'}
      {player === 'O' && '◯'}
    </button>
  );
};

Square.displayName = 'Square';
