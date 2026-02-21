import { WIN_PATTERNS, PATTERN_TYPES } from './constants';
import type {
  MicroBoard,
  Board,
  PlayerId,
  WinResult,
} from './types';

/**
 * Checks if a micro board has a winner
 */
export function checkMicroBoardWin(microBoard: MicroBoard): PlayerId | null {
  const squares = microBoard.squares;

  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (
      squares[a].player !== null &&
      squares[a].player === squares[b].player &&
      squares[a].player === squares[c].player
    ) {
      return squares[a].player;
    }
  }

  return null;
}

/**
 * Checks if there's a winner on the macro board
 */
export function checkWin(board: Board): WinResult | null {
  const owners = board.macroBoards.map(mb => mb.owner);

  for (let i = 0; i < WIN_PATTERNS.length; i++) {
    const pattern = WIN_PATTERNS[i];
    const [a, b, c] = pattern;

    if (
      owners[a] !== null &&
      owners[a] !== 'draw' &&
      owners[a] === owners[b] &&
      owners[a] === owners[c]
    ) {
      return {
        winner: owners[a] as PlayerId,
        pattern: pattern as number[],
        type: PATTERN_TYPES[i as keyof typeof PATTERN_TYPES],
      };
    }
  }

  // Check for draw (all squares filled, no winner)
  const totalSquares = board.macroBoards.reduce(
    (sum, mb) =>
      sum + mb.microBoard.squares.filter(s => s.player !== null).length,
    0
  );

  if (totalSquares === 81) {
    return {
      winner: 'draw',
      pattern: [],
      type: 'full',
    };
  }

  return null;
}

/**
 * Gets the indices of winning positions in a micro board
 */
export function getWinningMicroPattern(microBoard: MicroBoard): number[] | null {
  const squares = microBoard.squares;

  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (
      squares[a].player !== null &&
      squares[a].player === squares[b].player &&
      squares[a].player === squares[c].player
    ) {
      return pattern as number[];
    }
  }

  return null;
}
