import {
  createEmptyBoard,
  getNextMacroBoard,
  isFreeMoveAllowed,
  isMicroBoardFull,
} from './utils';
import { validateMove } from './validation';
import { checkMicroBoardWin, checkWin } from './winDetector';
import type {
  GameState,
  GameMode,
  Player,
  Position,
  GameActionResult,
  GameResult,
} from './types';

/**
 * Creates a new game state with initialized board and default values
 */
export function createInitialGameState(mode: GameMode): GameState {
  // Create players based on game mode
  const players: [Player, Player] = [
    { id: 'X', type: 'human', symbol: 'X' },
    {
      id: 'O',
      type: mode === 'pvai' ? 'ai' : 'human',
      symbol: 'O',
    },
  ];

  return {
    board: createEmptyBoard(),
    players,
    currentPlayer: 'X', // Player X always starts first
    legalMacroBoard: null, // First move is free (can play anywhere)
    status: 'IN_PROGRESS',
    result: null,
    mode,
    history: [],
    historyIndex: -1, // No moves made yet
  };
}

/**
 * Executes a move at the specified position and returns the new game state
 */
export function makeMove(
  state: GameState,
  position: Position
): GameActionResult {
  // Validate the move
  const error = validateMove(state, position);
  if (error) {
    return { success: false, error };
  }

  // Create a deep copy of the board
  const newBoard = JSON.parse(JSON.stringify(state.board));
  
  // Update the square with current player's symbol
  const square = newBoard.macroBoards[position.macro].microBoard.squares[position.micro];
  square.player = state.currentPlayer;

  // Check if this move wins the micro board
  const microBoard = newBoard.macroBoards[position.macro].microBoard;
  const microWinner = checkMicroBoardWin(microBoard);
  
  if (microWinner) {
    microBoard.winner = microWinner;
    newBoard.macroBoards[position.macro].owner = microWinner;
  } else if (isMicroBoardFull(microBoard)) {
    // Micro board is full but no winner - it's a draw
    microBoard.winner = 'draw';
    newBoard.macroBoards[position.macro].owner = 'draw';
  }

  // Check if this move wins the macro board (overall game)
  const gameWinResult = checkWin(newBoard);
  
  let gameStatus: GameState['status'] = 'IN_PROGRESS';
  let gameResult: GameState['result'] = null;
  
  if (gameWinResult) {
    gameStatus = 'COMPLETED';
    gameResult = {
      winner: gameWinResult.winner,
      winningPattern: gameWinResult.pattern,
      totalMoves: state.history.length + 1,
      duration: 0, // Will be calculated from first move timestamp
    };
  }

  // Calculate next macro board based on move position
  const nextMacro = getNextMacroBoard(position);
  
  // Determine if next player gets a free move
  const isFreeMove = isFreeMoveAllowed(newBoard, nextMacro);
  const newLegalMacroBoard = isFreeMove ? null : nextMacro;

  // Create the move record
  const move = {
    position,
    player: state.currentPlayer,
    timestamp: Date.now(),
    nextMacroBoard: nextMacro,
    wasFreeMove: isFreeMove,
  };

  // Switch current player (unless game is over)
  const nextPlayer = gameStatus === 'COMPLETED' ? state.currentPlayer : (state.currentPlayer === 'X' ? 'O' : 'X');

  // Return new game state
  return {
    success: true,
    newState: {
      ...state,
      board: newBoard,
      currentPlayer: nextPlayer,
      legalMacroBoard: newLegalMacroBoard,
      history: [...state.history, move],
      historyIndex: state.historyIndex + 1,
      status: gameStatus,
      result: gameResult,
    },
  };
}

/**
 * Reverts the game state to the previous move
 */
export function undo(state: GameState): GameState | null {
  // Cannot undo if no moves made
  if (state.historyIndex < 0 || state.history.length === 0) {
    return null;
  }

  const newIndex = state.historyIndex - 1;
  
  // If undoing to before first move, return null (reset)
  if (newIndex < 0) {
    return null;
  }

  // Recreate state from history up to newIndex
  let board = createEmptyBoard();
  let currentPlayer: PlayerId = 'X';
  let legalMacroBoard: number | null = null;

  for (let i = 0; i <= newIndex; i++) {
    const move = state.history[i];
    const square = board.macroBoards[move.position.macro].microBoard.squares[move.position.micro];
    square.player = move.player;
    
    // Recalculate micro/macro board winners
    const microBoard = board.macroBoards[move.position.macro].microBoard;
    const microWinner = checkMicroBoardWin(microBoard);
    if (microWinner && !microBoard.winner) {
      microBoard.winner = microWinner;
      board.macroBoards[move.position.macro].owner = microWinner;
    } else if (isMicroBoardFull(microBoard) && !microBoard.winner) {
      microBoard.winner = 'draw';
      board.macroBoards[move.position.macro].owner = 'draw';
    }
    
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    legalMacroBoard = move.nextMacroBoard;
    
    // Check if free move should be allowed
    if (legalMacroBoard !== null && isFreeMoveAllowed(board, legalMacroBoard)) {
      legalMacroBoard = null;
    }
  }

  return {
    ...state,
    board,
    currentPlayer,
    legalMacroBoard,
    historyIndex: newIndex,
    status: 'IN_PROGRESS',
    result: null,
  };
}

/**
 * Re-applies a previously undone move
 */
export function redo(state: GameState): GameState | null {
  // Cannot redo if at latest state
  if (state.historyIndex >= state.history.length - 1) {
    return null;
  }

  const newIndex = state.historyIndex + 1;
  
  // Recreate state from history up to newIndex
  let board = createEmptyBoard();
  let currentPlayer: PlayerId = 'X';
  let legalMacroBoard: number | null = null;
  let gameResult: GameResult | null = null;
  let gameStatus: GameState['status'] = 'IN_PROGRESS';

  for (let i = 0; i <= newIndex; i++) {
    const move = state.history[i];
    const square = board.macroBoards[move.position.macro].microBoard.squares[move.position.micro];
    square.player = move.player;
    
    // Recalculate micro/macro board winners
    const microBoard = board.macroBoards[move.position.macro].microBoard;
    const microWinner = checkMicroBoardWin(microBoard);
    if (microWinner && !microBoard.winner) {
      microBoard.winner = microWinner;
      board.macroBoards[move.position.macro].owner = microWinner;
    } else if (isMicroBoardFull(microBoard) && !microBoard.winner) {
      microBoard.winner = 'draw';
      board.macroBoards[move.position.macro].owner = 'draw';
    }
    
    // Check for game win at this move
    const winResult = checkWin(board);
    if (winResult && i === newIndex) {
      gameStatus = 'COMPLETED';
      gameResult = {
        winner: winResult.winner,
        winningPattern: winResult.pattern,
        totalMoves: i + 1,
        duration: 0,
      };
    }
    
    if (gameStatus === 'IN_PROGRESS') {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      legalMacroBoard = move.nextMacroBoard;
      
      // Check if free move should be allowed
      if (legalMacroBoard !== null && isFreeMoveAllowed(board, legalMacroBoard)) {
        legalMacroBoard = null;
      }
    }
  }

  return {
    ...state,
    board,
    currentPlayer: gameStatus === 'COMPLETED' ? currentPlayer : currentPlayer,
    legalMacroBoard,
    historyIndex: newIndex,
    status: gameStatus,
    result: gameResult,
  };
}

/**
 * Returns all positions where the current player can legally move
 */
export function getLegalMoves(state: GameState): Position[] {
  const moves: Position[] = [];
  
  // If game is over, no legal moves
  if (state.status === 'COMPLETED') {
    return moves;
  }
  
  // Determine which macro boards are legal
  const legalMacroIndices = state.legalMacroBoard !== null
    ? [state.legalMacroBoard]
    : state.board.macroBoards
        .filter(mb => mb.owner === null) // Not yet won
        .map(mb => mb.index);
  
  // Collect all empty squares in legal macro boards
  for (const macroIdx of legalMacroIndices) {
    const macroBoard = state.board.macroBoards[macroIdx];
    const microBoard = macroBoard.microBoard;
    
    for (let microIdx = 0; microIdx < 9; microIdx++) {
      if (microBoard.squares[microIdx].player === null) {
        moves.push({ macro: macroIdx, micro: microIdx });
      }
    }
  }
  
  return moves;
}
