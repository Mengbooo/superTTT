/**
 * Ultimate Tic-Tac-Toe Type Definitions
 * 
 * Core types for game state management and board representation
 */

// Player identification and type
export type PlayerId = 'X' | 'O';
export type PlayerType = 'human' | 'ai';
export type GameMode = 'pvp' | 'pvai';
export type GameStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

/**
 * Represents a player in the game
 */
export interface Player {
  id: PlayerId;
  type: PlayerType;
  symbol: PlayerId;
}

/**
 * Represents a position on the board (macro + micro coordinates)
 */
export interface Position {
  macro: number; // 0-8: which macro board
  micro: number; // 0-8: which square within the micro board
}

/**
 * Represents a single square (the smallest unit)
 */
export interface Square {
  player: PlayerId | null; // null if empty
  index: number; // 0-8: position within micro board
}

/**
 * Represents a 3x3 micro board (small tic-tac-toe board)
 */
export interface MicroBoard {
  squares: Square[]; // Always 9 squares
  index: number; // 0-8: position within macro board
  winner: PlayerId | 'draw' | null; // null if not yet decided
}

/**
 * Represents a macro board position (one of the 9 large positions)
 */
export interface MacroBoard {
  microBoard: MicroBoard; // The embedded micro board
  index: number; // 0-8: position in macro board
  owner: PlayerId | 'draw' | null; // null if not yet won
}

/**
 * Represents the complete 9x9 game board
 */
export interface Board {
  macroBoards: MacroBoard[]; // Always 9 macro boards
}

/**
 * Represents a single move in the game history
 */
export interface Move {
  position: Position;
  player: PlayerId;
  timestamp: number; // Unix timestamp
  nextMacroBoard: number; // 0-8: which macro board this move points to
  wasFreeMove: boolean; // true if this was a "free move" (illegal target)
}

/**
 * Represents the result of a completed game
 */
export interface GameResult {
  winner: PlayerId | 'draw' | null;
  winningPattern: number[]; // Indices of winning macro boards
  totalMoves: number;
  duration: number; // seconds
}

/**
 * Represents the complete game state
 */
export interface GameState {
  board: Board;
  players: [Player, Player]; // [Player X, Player O]
  currentPlayer: PlayerId;
  legalMacroBoard: number | null; // null = free move anywhere
  status: GameStatus;
  result: GameResult | null;
  mode: GameMode;
  history: Move[];
  historyIndex: number; // For undo/redo (-1 means no moves made)
}

/**
 * Result of a makeMove operation
 */
export interface GameActionResult {
  success: boolean;
  newState?: GameState;
  error?: MoveError;
}

/**
 * Possible move errors
 */
export type MoveError = 
  | 'GAME_NOT_IN_PROGRESS'
  | 'WRONG_PLAYER'
  | 'ILLEGAL_MACRO_BOARD'
  | 'SQUARE_OCCUPIED'
  | 'MACRO_BOARD_WON';

/**
 * Result of a win check
 */
export interface WinResult {
  winner: PlayerId;
  pattern: number[]; // Indices of winning positions
  type: 'row' | 'column' | 'diagonal';
}

/**
 * AI difficulty levels
 */
export type AIDifficulty = 'easy' | 'medium' | 'hard';
