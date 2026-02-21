import React from 'react';
import { MacroBoard } from '../MacroBoard/MacroBoard';
import type { Board as BoardType, PlayerId, Position } from '../../types';

export interface BoardProps {
  board: BoardType;
  currentPlayer: PlayerId;
  legalMacroBoard: number | null;
  onMove: (position: Position) => void;
  disabled?: boolean;
}

export const Board: React.FC<BoardProps> = ({
  board,
  currentPlayer,
  legalMacroBoard,
  onMove,
  disabled = false,
}) => {
  return (
    <div 
      className="macro-board"
      role="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-4)',
        
        // Responsive: smaller gap on mobile
        '@media (max-width: 767px)': {
          gap: 'var(--space-1)',
        },
      }}
    >
      {board.macroBoards.map((macroBoard) => {
        // Determine if this macro board is a legal move
        const isLegalMove =
          !disabled && (legalMacroBoard === null || legalMacroBoard === macroBoard.index);

        return (
          <MacroBoard
            key={macroBoard.index}
            macroBoard={macroBoard}
            isLegalMove={isLegalMove}
            onMove={onMove}
          />
        );
      })}
    </div>
  );
};

Board.displayName = 'Board';
