import React from 'react';
import { Square } from '../Square/Square';
import type { MacroBoard as MacroBoardType, PlayerId, Position } from '../../types';

export interface MacroBoardProps {
  macroBoard: MacroBoardType;
  isLegalMove: boolean;
  onMove: (position: Position) => void;
}

export const MacroBoard: React.FC<MacroBoardProps> = ({
  macroBoard,
  isLegalMove,
  onMove,
}) => {
  const winnerClass = macroBoard.winner
    ? `won-by-${macroBoard.winner.toLowerCase()}`
    : '';

  return (
    <div
      data-testid={`macro-board-${macroBoard.index}`}
      className={`micro-board ${winnerClass} ${isLegalMove ? 'legal-move' : ''}`}
    >
      {macroBoard.microBoard.squares.map((square) => (
        <Square
          key={square.index}
          player={square.player}
          index={square.index}
          disabled={!isLegalMove || macroBoard.owner !== null}
          isLegalMove={isLegalMove && macroBoard.owner === null}
          onClick={() =>
            onMove({ macro: macroBoard.index, micro: square.index })
          }
        />
      ))}
    </div>
  );
};

MacroBoard.displayName = 'MacroBoard';
