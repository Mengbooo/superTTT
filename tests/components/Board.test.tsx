import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Board } from '../../src/components/Board/Board';
import { createEmptyBoard } from '../../src/engine/utils';
import type { PlayerId } from '../../src/engine/types';

describe('Board Component', () => {
  const mockOnMove = vi.fn();
  
  it('should render 9x9 grid correctly', () => {
    const board = createEmptyBoard();
    
    render(
      <Board
        board={board}
        currentPlayer="X"
        legalMacroBoard={null}
        onMove={mockOnMove}
      />
    );
    
    // Should have 9 macro boards
    const macroBoards = screen.getAllByRole('grid');
    expect(macroBoards).toHaveLength(9);
    
    // Each macro board should have 9 squares (81 total)
    const squares = screen.getAllByRole('button');
    expect(squares).toHaveLength(81);
  });

  it('should display empty squares initially', () => {
    const board = createEmptyBoard();
    
    render(
      <Board
        board={board}
        currentPlayer="X"
        legalMacroBoard={null}
        onMove={mockOnMove}
      />
    );
    
    const squares = screen.getAllByRole('button');
    squares.forEach(square => {
      expect(square).toBeEnabled();
      expect(square.textContent).toBe('');
    });
  });

  it('should highlight legal macro board when specified', () => {
    const board = createEmptyBoard();
    
    render(
      <Board
        board={board}
        currentPlayer="X"
        legalMacroBoard={4}
        onMove={mockOnMove}
      />
    );
    
    // Macro board at index 4 should be highlighted
    const highlightedBoard = screen.getByTestId('macro-board-4');
    expect(highlightedBoard).toHaveClass('legal-move');
  });

  it('should call onMove when square is clicked', () => {
    const board = createEmptyBoard();
    
    render(
      <Board
        board={board}
        currentPlayer="X"
        legalMacroBoard={null}
        onMove={mockOnMove}
      />
    );
    
    const firstSquare = screen.getAllByRole('button')[0];
    firstSquare.click();
    
    expect(mockOnMove).toHaveBeenCalledWith({ macro: 0, micro: 0 });
    expect(mockOnMove).toHaveBeenCalledTimes(1);
  });
});
