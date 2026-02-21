import type { Board, Position, Square, MicroBoard } from './types';

/**
 * Retrieves a specific square from the board
 */
export function getSquare(board: Board, position: Position): Square {
  return board.macroBoards[position.macro].microBoard.squares[position.micro];
}

/**
 * Checks if a micro board is full (all squares occupied)
 */
export function isMicroBoardFull(microBoard: MicroBoard): boolean {
  return microBoard.squares.every(square => square.player !== null);
}

/**
 * Calculates which macro board the next move must be in
 * based on the current move's micro position
 */
export function getNextMacroBoard(position: Position): number {
  return position.micro; // The micro index becomes the next macro index
}

/**
 * Determines if the next player gets a free move (can play anywhere)
 * Free move is allowed when target macro board is already won or full
 */
export function isFreeMoveAllowed(
  board: Board,
  nextMacro: number
): boolean {
  const targetMacro = board.macroBoards[nextMacro];
  
  // Free move if target macro is already won or full
  return targetMacro.owner !== null || isMicroBoardFull(targetMacro.microBoard);
}

/**
 * Creates an empty square
 */
export function createEmptySquare(index: number): Square {
  return {
    player: null,
    index,
  };
}

/**
 * Creates an empty micro board with all squares blank
 */
export function createEmptyMicroBoard(index: number): MicroBoard {
  return {
    squares: Array.from({ length: 9 }, (_, i) => createEmptySquare(i)),
    index,
    winner: null,
  };
}

/**
 * Creates an empty macro board
 */
export function createEmptyMacroBoard(index: number): MacroBoard {
  return {
    microBoard: createEmptyMicroBoard(index),
    index,
    owner: null,
  };
}

/**
 * Creates an empty complete board
 */
export function createEmptyBoard(): Board {
  return {
    macroBoards: Array.from({ length: 9 }, (_, i) => createEmptyMacroBoard(i)),
  };
}
