import { CORNER_POSITIONS, CENTER_POSITION } from './constants';
import { checkMicroBoardWin } from './winDetector';
import type { GameState, Position, AIDifficulty } from './types';

/**
 * Selects a move for the AI player based on difficulty level
 */
export function getAIMove(
  state: GameState,
  difficulty: AIDifficulty = 'medium'
): Position {
  const legalMoves = getLegalMovesFromState(state);

  if (legalMoves.length === 0) {
    throw new Error('No legal moves available for AI');
  }

  switch (difficulty) {
    case 'easy':
      // Pure random - no strategy
      return getRandomMove(legalMoves);

    case 'medium':
      // 50% smart, 50% random
      if (Math.random() < 0.5) {
        return getSmartMove(legalMoves, state);
      }
      return getRandomMove(legalMoves);

    case 'hard':
      // Always smart - best move selection
      return getSmartMove(legalMoves, state);

    default:
      return getRandomMove(legalMoves);
  }
}

/**
 * Gets a random move from legal moves
 */
function getRandomMove(legalMoves: Position[]): Position {
  const randomIndex = Math.floor(Math.random() * legalMoves.length);
  return legalMoves[randomIndex];
}

/**
 * Gets a smart move with priority-based selection
 */
function getSmartMove(
  legalMoves: Position[],
  state: GameState
): Position {
  const currentPlayer = state.currentPlayer;
  const opponent = currentPlayer === 'X' ? 'O' : 'X';

  // Priority 1: Win if possible
  const winningMove = findWinningMove(legalMoves, state, currentPlayer);
  if (winningMove) {
    console.log('[AI] Found winning move:', winningMove);
    return winningMove;
  }

  // Priority 2: Block opponent's winning move
  const blockingMove = findWinningMove(legalMoves, state, opponent);
  if (blockingMove) {
    console.log('[AI] Blocking opponent at:', blockingMove);
    return blockingMove;
  }

  // Priority 3: Take center if available
  const centerMove = legalMoves.find((m) => m.micro === CENTER_POSITION);
  if (centerMove && isPositionLegal(centerMove, state)) {
    console.log('[AI] Taking center position');
    return centerMove;
  }

  // Priority 4: Take corners
  const cornerMoves = legalMoves.filter((m) =>
    CORNER_POSITIONS.includes(m.micro as any)
  );
  if (cornerMoves.length > 0) {
    console.log('[AI] Taking corner position');
    return getRandomMove(cornerMoves);
  }

  // Fallback: Random legal move
  console.log('[AI] Random fallback move');
  return getRandomMove(legalMoves);
}

/**
 * Finds a move that would result in an immediate win
 */
function findWinningMove(
  legalMoves: Position[],
  state: GameState,
  player: string
): Position | null {
  for (const move of legalMoves) {
    // Simulate the move
    const testBoard = JSON.parse(JSON.stringify(state.board));
    const square =
      testBoard.macroBoards[move.macro].microBoard.squares[move.micro];
    square.player = player;

    // Check if this wins the micro board
    const microBoard = testBoard.macroBoards[move.macro].microBoard;
    const winner = checkMicroBoardWin(microBoard);

    if (winner === player) {
      return move;
    }
  }

  return null;
}

/**
 * Checks if a position is legal in the current game state
 */
function isPositionLegal(position: Position, state: GameState): boolean {
  if (state.legalMacroBoard !== null && position.macro !== state.legalMacroBoard) {
    return false;
  }

  const macroBoard = state.board.macroBoards[position.macro];
  if (macroBoard.owner !== null) {
    return false;
  }

  const square = macroBoard.microBoard.squares[position.micro];
  return square.player === null;
}

/**
 * Gets all legal moves from game state (helper for AI)
 */
function getLegalMovesFromState(state: GameState): Position[] {
  const moves: Position[] = [];

  if (state.status === 'COMPLETED') {
    return moves;
  }

  const legalMacroIndices =
    state.legalMacroBoard !== null
      ? [state.legalMacroBoard]
      : state.board.macroBoards
          .filter((mb) => mb.owner === null)
          .map((mb) => mb.index);

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
