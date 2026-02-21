# API Contracts: Game Engine

**Feature**: 001-ultimate-tictactoe  
**Date**: 2026-02-21  
**Purpose**: Define the public API for game logic operations

---

## Overview

The Game Engine is a pure functional core that handles all game logic independent of React or UI framework. It provides deterministic state transitions for the Ultimate Tic-Tac-Toe game.

**Design Principles**:
- Pure functions (no side effects)
- Immutable data structures
- Type-safe interfaces
- Synchronous operations (no async needed)

---

## Core API

### 1. `createInitialGameState(mode: GameMode): GameState`

Creates a new game state with initialized board and default values.

**Parameters**:
- `mode`: Game mode ('pvp' | 'pvai')

**Returns**: `GameState` - Initial game state

**Side Effects**: None

**Example**:
```typescript
const initialState = createInitialGameState('pvai');
// Returns:
// {
//   board: { macroBoards: [...] }, // All squares empty
//   players: [{ id: 'X', type: 'human' }, { id: 'O', type: 'ai' }],
//   currentPlayer: 'X',
//   legalMacroBoard: null, // First move is free
//   status: 'IN_PROGRESS',
//   result: null,
//   mode: 'pvai',
//   history: [],
//   historyIndex: -1
// }
```

**Validation**:
- Mode must be valid GameMode
- Board must be fully initialized with empty squares
- Player X always starts first

---

### 2. `makeMove(state: GameState, position: Position): GameActionResult`

Executes a move at the specified position and returns the new game state.

**Parameters**:
- `state`: Current game state
- `position`: Target position {macro, micro}

**Returns**: `GameActionResult`
```typescript
interface GameActionResult {
  success: boolean;
  newState?: GameState;
  error?: MoveError;
}

type MoveError = 
  | 'GAME_NOT_IN_PROGRESS'
  | 'WRONG_PLAYER'
  | 'ILLEGAL_MACRO_BOARD'
  | 'SQUARE_OCCUPIED'
  | 'MACRO_BOARD_WON';
```

**Side Effects**: None (returns new state, doesn't mutate input)

**Example**:
```typescript
const result = makeMove(currentState, { macro: 4, micro: 4 });
if (result.success && result.newState) {
  const newState = result.newState;
  // newState.currentPlayer will be opposite of currentState.currentPlayer
  // newState.history will have one additional entry
}
```

**Business Logic**:
1. Validate move (see validation rules below)
2. Update square with current player's symbol
3. Check micro board win condition
4. Update macro board owner if micro board won
5. Check macro board win condition (game over)
6. Calculate next legal macro board based on move position
7. Record move in history
8. Switch current player

**Validation Rules**:
```typescript
function validateMove(state: GameState, position: Position): MoveError | null {
  // 1. Game must be in progress
  if (state.status !== 'IN_PROGRESS') {
    return 'GAME_NOT_IN_PROGRESS';
  }
  
  // 2. Must be correct player's turn
  const expectedPlayer = state.currentPlayer;
  const actualPlayer = getSquare(state.board, position).player;
  if (actualPlayer !== null) {
    return 'WRONG_PLAYER'; // Square already occupied
  }
  
  // 3. Macro board must be legal
  const legalBoard = state.legalMacroBoard;
  if (legalBoard !== null && position.macro !== legalBoard) {
    return 'ILLEGAL_MACRO_BOARD';
  }
  
  // 4. Square must be empty
  if (getSquare(state.board, position).player !== null) {
    return 'SQUARE_OCCUPIED';
  }
  
  // 5. Macro board must not be already won
  const macroBoard = state.board.macroBoards[position.macro];
  if (macroBoard.owner !== null) {
    return 'MACRO_BOARD_WON';
  }
  
  return null; // Valid
}
```

---

### 3. `getLegalMoves(state: GameState): Position[]`

Returns all positions where the current player can legally move.

**Parameters**:
- `state`: Current game state

**Returns**: `Position[]` - Array of legal positions

**Side Effects**: None

**Example**:
```typescript
const legalMoves = getLegalMoves(gameState);
// Returns: [{ macro: 0, micro: 0 }, { macro: 0, micro: 1 }, ...]
// If free move: all empty squares across all non-won macro boards
// If restricted: only empty squares in the legal macro board
```

**Algorithm**:
```typescript
function getLegalMoves(state: GameState): Position[] {
  const moves: Position[] = [];
  
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
```

---

### 4. `undo(state: GameState): GameState | null`

Reverts the game state to the previous move.

**Parameters**:
- `state`: Current game state

**Returns**: `GameState | null` - Previous state, or null if cannot undo

**Side Effects**: None

**Example**:
```typescript
const previousState = undo(currentState);
if (previousState) {
  // Successfully reverted one move
  // currentPlayer is now opposite
  // historyIndex decremented
} else {
  // Cannot undo (at start of game)
}
```

**Business Logic**:
1. Check if historyIndex >= 0
2. If yes, decrement historyIndex
3. Restore board state from history[historyIndex]
4. Restore currentPlayer from previous state
5. Clear result if game was completed
6. Return new state

**Edge Cases**:
- Cannot undo if no moves made (historyIndex = -1)
- Can undo multiple times (repeated calls)
- After undo, redo becomes available

---

### 5. `redo(state: GameState): GameState | null`

Re-applies a previously undone move.

**Parameters**:
- `state`: Current game state (after undo)

**Returns**: `GameState | null` - Next state, or null if cannot redo

**Side Effects**: None

**Example**:
```typescript
const nextState = redo(previousState);
if (nextState) {
  // Successfully re-applied move
  // historyIndex incremented
  // Board restored to post-move state
}
```

**Business Logic**:
1. Check if historyIndex < history.length - 1
2. If yes, increment historyIndex
3. Restore board state to history[historyIndex + 1]
4. Update currentPlayer accordingly
5. Return new state

**Edge Cases**:
- Cannot redo if at latest state (historyIndex = history.length - 1)
- Cannot redo after making a new move (future history cleared)

---

### 6. `resetGame(mode?: GameMode): GameState`

Resets the game to initial state, optionally changing the mode.

**Parameters**:
- `mode`: Optional new game mode (defaults to current mode)

**Returns**: `GameState` - Fresh initial state

**Side Effects**: None

**Example**:
```typescript
const freshState = resetGame(currentState);
// Or change mode:
const pvpState = resetGame({ ...currentState, mode: 'pvp' });
```

---

### 7. `checkWin(board: Board): WinResult | null`

Checks if there's a winner on the macro board.

**Parameters**:
- `board`: Current board state

**Returns**: `WinResult | null`
```typescript
interface WinResult {
  winner: PlayerId;
  pattern: number[]; // Indices of winning macro boards
  type: 'row' | 'column' | 'diagonal';
}
```

**Side Effects**: None

**Example**:
```typescript
const winResult = checkWin(board);
if (winResult) {
  console.log(`Player ${winResult.winner} wins with ${winResult.type}!`);
  console.log(`Winning macro boards: ${winResult.pattern}`);
}
```

**Algorithm**:
```typescript
function checkWin(board: Board): WinResult | null {
  const owners = board.macroBoards.map(mb => mb.owner);
  
  for (const pattern of MACRO_WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (
      owners[a] !== null &&
      owners[a] === owners[b] &&
      owners[a] === owners[c]
    ) {
      return {
        winner: owners[a] as PlayerId,
        pattern: pattern,
        type: getPatternType(pattern)
      };
    }
  }
  
  // Check for draw (all squares filled, no winner)
  const totalSquares = board.macroBoards.reduce(
    (sum, mb) => sum + mb.microBoard.squares.filter(s => s.player !== null).length,
    0
  );
  
  if (totalSquares === 81) {
    return {
      winner: 'draw',
      pattern: [],
      type: 'full'
    };
  }
  
  return null;
}
```

---

### 8. `getAIMove(state: GameState, difficulty: AIDifficulty): Position`

Selects a move for the AI player.

**Parameters**:
- `state`: Current game state
- `difficulty`: AI difficulty level ('easy' | 'medium' | 'hard')

**Returns**: `Position` - Selected move position

**Side Effects**: None

**Example**:
```typescript
const aiMove = getAIMove(gameState, 'medium');
const result = makeMove(gameState, aiMove);
```

**AI Strategies by Difficulty**:

```typescript
type AIDifficulty = 'easy' | 'medium' | 'hard';

function getAIMove(state: GameState, difficulty: AIDifficulty): Position {
  const legalMoves = getLegalMoves(state);
  
  if (legalMoves.length === 0) {
    throw new Error('No legal moves available');
  }
  
  switch (difficulty) {
    case 'easy':
      // Pure random
      return randomChoice(legalMoves);
      
    case 'medium':
      // 50% smart, 50% random
      if (Math.random() < 0.5) {
        return getSmartMove(legalMoves, state);
      }
      return randomChoice(legalMoves);
      
    case 'hard':
      // Always smart
      return getSmartMove(legalMoves, state);
  }
}

function getSmartMove(legalMoves: Position[], state: GameState): Position {
  // Priority 1: Win if possible
  const winningMove = findWinningMove(legalMoves, state, state.currentPlayer);
  if (winningMove) return winningMove;
  
  // Priority 2: Block opponent win
  const opponent = state.currentPlayer === 'X' ? 'O' : 'X';
  const blockingMove = findWinningMove(legalMoves, state, opponent);
  if (blockingMove) return blockingMove;
  
  // Priority 3: Take center if available
  const centerMove = legalMoves.find(m => m.micro === 4);
  if (centerMove && isLegalMove(centerMove, state)) {
    return centerMove;
  }
  
  // Priority 4: Take corners
  const corners = [0, 2, 6, 8];
  const cornerMoves = legalMoves.filter(m => corners.includes(m.micro));
  if (cornerMoves.length > 0) {
    return randomChoice(cornerMoves);
  }
  
  // Fallback: Random
  return randomChoice(legalMoves);
}
```

---

## Helper Functions

### `getSquare(board: Board, position: Position): Square`

Retrieves a specific square from the board.

```typescript
function getSquare(board: Board, position: Position): Square {
  return board.macroBoards[position.macro]
    .microBoard
    .squares[position.micro];
}
```

---

### `checkMicroBoardWin(microBoard: MicroBoard): PlayerId | null`

Checks if a micro board has a winner.

```typescript
function checkMicroBoardWin(microBoard: MicroBoard): PlayerId | null {
  const squares = microBoard.squares;
  
  for (const pattern of MICRO_WIN_PATTERNS) {
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
```

---

### `getNextMacroBoard(position: Position): number`

Calculates which macro board the next move must be in based on the current move's micro position.

```typescript
function getNextMacroBoard(position: Position): number {
  return position.micro; // The micro index becomes the next macro index
}
```

---

### `isFreeMoveAllowed(state: GameState, nextMacro: number): boolean`

Determines if the next player gets a free move (can play anywhere).

```typescript
function isFreeMoveAllowed(state: GameState, nextMacro: number): boolean {
  const targetMacro = state.board.macroBoards[nextMacro];
  
  // Free move if target macro is already won or full
  return targetMacro.owner !== null || isMicroBoardFull(targetMacro.microBoard);
}
```

---

## Error Handling

All functions follow these error handling patterns:

1. **Return Result Objects**: Functions that can fail return `{ success, newState?, error? }`
2. **No Exceptions**: Pure functions don't throw; errors are returned as values
3. **Type Safety**: TypeScript ensures all cases are handled
4. **Descriptive Errors**: Error types explain what went wrong

**Error Types**:
```typescript
type GameEngineError =
  | { type: 'INVALID_MOVE'; details: MoveError }
  | { type: 'GAME_OVER'; reason: 'WIN' | 'DRAW' }
  | { type: 'CANNOT_UNDO'; reason: 'NO_HISTORY' }
  | { type: 'CANNOT_REDO'; reason: 'AT_LATEST' }
  | { type: 'INVALID_STATE'; reason: string };
```

---

## Testing Strategy

### Contract Tests

Each API function must have contract tests verifying:

1. **Input Validation**: Invalid inputs produce appropriate errors
2. **State Transitions**: State changes match specification
3. **Immutability**: Input state is not mutated
4. **Determinism**: Same input → same output (except AI)

**Example Test**:
```typescript
describe('makeMove', () => {
  it('should accept a valid move in legal macro board', () => {
    const state = createInitialGameState('pvp');
    const result = makeMove(state, { macro: 4, micro: 4 });
    
    expect(result.success).toBe(true);
    expect(result.newState).toBeDefined();
    expect(result.newState?.currentPlayer).toBe('O');
    expect(result.newState?.history).toHaveLength(1);
  });
  
  it('should reject move in illegal macro board', () => {
    const state = createInitialGameState('pvp');
    const stateAfterMove = makeMove(state, { macro: 4, micro: 4 });
    const nextLegalMacro = 4; // Based on micro position
    
    // Try to move in wrong macro
    const result = makeMove(stateAfterMove.newState!, { macro: 0, micro: 0 });
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('ILLEGAL_MACRO_BOARD');
  });
});
```

---

## Performance Requirements

Based on spec success criteria:

| Function | Max Response Time | Notes |
|----------|------------------|-------|
| `makeMove` | < 100ms | SC-002 |
| `checkWin` | < 200ms | SC-003 |
| `getLegalMoves` | < 50ms | Part of SC-002 |
| `undo/redo` | < 150ms | SC-005 |
| `getAIMove` | < 500ms | SC-007 |

**Implementation Notes**:
- All operations are O(1) or O(n) where n ≤ 81
- No async needed; all synchronous computation
- Memory: Maintain ~10-20 states in history (configurable)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-02-21 | Initial contract definition |

---

## Next Steps

1. Implement game engine following these contracts
2. Write contract tests for each function
3. Integrate with React via `useGameLogic` hook
4. Document any deviations from this contract during implementation
