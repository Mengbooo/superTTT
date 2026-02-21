/**
 * Win patterns for 3x3 boards
 * Indices represent positions in a 3x3 grid:
 * 0 | 1 | 2
 * ---------
 * 3 | 4 | 5
 * ---------
 * 6 | 7 | 8
 */
export const WIN_PATTERNS = [
  // Rows (horizontal)
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  
  // Columns (vertical)
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  
  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
] as const;

/**
 * Pattern type mapping for win detection
 */
export const PATTERN_TYPES = {
  0: 'row',
  1: 'row',
  2: 'row',
  3: 'column',
  4: 'column',
  5: 'column',
  6: 'diagonal',
  7: 'diagonal',
} as const;

/**
 * Corner positions for AI strategy
 */
export const CORNER_POSITIONS = [0, 2, 6, 8] as const;

/**
 * Center position
 */
export const CENTER_POSITION = 4;

/**
 * Total number of squares in the complete board
 */
export const TOTAL_SQUARES = 81;

/**
 * Total number of macro boards
 */
export const TOTAL_MACRO_BOARDS = 9;

/**
 * Total number of squares per micro board
 */
export const SQUARES_PER_BOARD = 9;
