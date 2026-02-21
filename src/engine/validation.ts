import type { GameState, Position, MoveError } from './types';
import { getSquare } from './utils';

/**
 * Validates if a move is legal according to game rules
 */
export function validateMove(
  state: GameState,
  position: Position
): MoveError | null {
  // 1. Game must be in progress
  if (state.status !== 'IN_PROGRESS') {
    return 'GAME_NOT_IN_PROGRESS';
  }

  // 2. Check square is empty (not occupied)
  const square = getSquare(state.board, position);
  if (square.player !== null) {
    return 'SQUARE_OCCUPIED';
  }

  // 3. Macro board must not be already won
  const macroBoard = state.board.macroBoards[position.macro];
  if (macroBoard.owner !== null) {
    return 'MACRO_BOARD_WON';
  }

  // 4. Check if move is in legal macro board
  const legalBoard = state.legalMacroBoard;
  if (legalBoard !== null && position.macro !== legalBoard) {
    return 'ILLEGAL_MACRO_BOARD';
  }

  // Note: We don't check currentPlayer here because that's handled by the UI
  // The UI should only allow clicks from the current player

  return null; // Valid move
}
