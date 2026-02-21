# Data Model: 超级井字棋 (Ultimate Tic-Tac-Toe)

**Feature**: 001-ultimate-tictactoe  
**Date**: 2026-02-21  
**Source**: Based on spec.md Key Entities and research.md decisions

---

## Core Entities

### 1. Player (玩家)

Represents a participant in the game.

**Fields**:
- `id`: Unique identifier ('X' or 'O')
- `type`: Player type ('human' | 'ai')
- `symbol`: Display symbol ('X' | 'O')

**Validation Rules**:
- Exactly two players per game
- Player X always moves first
- AI player can only be player O (configurable)

```typescript
type PlayerId = 'X' | 'O';
type PlayerType = 'human' | 'ai';

interface Player {
  id: PlayerId;
  type: PlayerType;
  symbol: PlayerId;
}
```

---

### 2. Position (位置)

Represents a specific location on the board.

**Fields**:
- `macro`: Index of the macro board (0-8)
- `micro`: Index within that micro board (0-8)

**Validation Rules**:
- Both indices must be 0-8
- Position must correspond to an empty square

```typescript
interface Position {
  macro: number; // 0-8
  micro: number; // 0-8
}
```

---

### 3. Square (小格)

The smallest unit of the board - an individual cell.

**Fields**:
- `player`: Current occupant (null if empty)
- `index`: Position within micro board (0-8)

**State Transitions**:
- Empty → Occupied (when move is made)
- Cannot change once occupied (immutable per game)

```typescript
interface Square {
  player: PlayerId | null;
  index: number; // 0-8
}
```

---

### 4. MicroBoard (小棋盘)

A 3x3 grid of squares within a macro board position.

**Fields**:
- `squares`: Array of 9 squares
- `index`: Position within macro board (0-8)
- `winner`: Winner of this micro board (null if undecided)
- `isFull`: Whether all squares are occupied

**Derived Properties**:
- `winner`: Computed from square patterns (3 in a row)
- `isFull`: All 9 squares have players
- `legalMoves`: Indices of empty squares

**Validation Rules**:
- Must have exactly 9 squares
- Winner can only be set if 3 squares align
- Once winner is determined, no more moves allowed

```typescript
interface MicroBoard {
  squares: Square[];
  index: number; // 0-8
  winner: PlayerId | 'draw' | null;
}

// Helper
function isMicroBoardFull(board: MicroBoard): boolean {
  return board.squares.every(s => s.player !== null);
}
```

---

### 5. MacroBoard (大格)

Represents one of the 9 positions in the overall 3x3 macro board.

**Fields**:
- `microBoard`: The embedded micro board
- `index`: Position in macro board (0-8)
- `owner`: Player who won this macro position (null if not won)

**State Transitions**:
- Unowned → Owned by X (when X wins micro board)
- Unowned → Owned by O (when O wins micro board)
- Unowned → Draw (when micro board fills without winner)

**Validation Rules**:
- Owner can only be set when micro board has winner
- Once owned, cannot change ownership
- Draw state is permanent

```typescript
interface MacroBoard {
  microBoard: MicroBoard;
  index: number; // 0-8
  owner: PlayerId | 'draw' | null;
}
```

---

### 6. Board (完整棋盘)

The complete 9x9 game board containing all macro and micro boards.

**Fields**:
- `macroBoards`: Array of 9 macro boards
- `totalSquares`: 81 (constant)

**Derived Properties**:
- `winner`: Overall game winner (computed from macro board owners)
- `isFull`: All 81 squares occupied
- `legalMacroBoards`: Which macro boards accept moves

```typescript
interface Board {
  macroBoards: MacroBoard[];
}

// Derived
function getBoardWinner(board: Board): PlayerId | 'draw' | null {
  const owners = board.macroBoards.map(mb => mb.owner);
  return checkWinPattern(owners);
}
```

---

### 7. Move (落子记录)

A single action in the game history.

**Fields**:
- `position`: Where the move was placed
- `player`: Who made the move
- `timestamp`: When the move occurred
- `nextMacroBoard`: Which macro board this move points to
- `wasFreeMove`: Whether this was a "free move" (illegal target)

```typescript
interface Move {
  position: Position;
  player: PlayerId;
  timestamp: number; // Unix timestamp
  nextMacroBoard: number; // 0-8
  wasFreeMove: boolean;
}
```

---

### 8. GameMode (游戏模式)

Configuration for how the game is played.

**Values**:
- `'pvp'`: Player vs Player (local)
- `'pvai'`: Player vs AI

```typescript
type GameMode = 'pvp' | 'pvai';
```

---

### 9. GameResult (游戏结果)

Outcome of a completed game.

**Fields**:
- `winner`: Winning player (null for draw)
- `winningPattern`: Which macro boards formed the winning line
- `totalMoves`: Number of moves made
- `duration`: Game length in seconds

```typescript
interface GameResult {
  winner: PlayerId | 'draw' | null;
  winningPattern: number[]; // Indices of winning macro boards
  totalMoves: number;
  duration: number; // seconds
}
```

---

## State Machines

### Game State Machine

```
[NOT_STARTED] 
    ↓ (startGame)
[IN_PROGRESS] 
    ↺ (makeMove, undo, redo)
    ↓ (win detected OR board full)
[COMPLETED]
    ↓ (resetGame)
[NOT_STARTED]
```

**States**:
- `NOT_STARTED`: Initial state, no moves made
- `IN_PROGRESS`: Game active, moves being made
- `COMPLETED`: Winner determined or draw

**Transitions**:
- `startGame(mode)`: NOT_STARTED → IN_PROGRESS
- `makeMove(pos)`: IN_PROGRESS → IN_PROGRESS (or COMPLETED if winning move)
- `undo()`: IN_PROGRESS → IN_PROGRESS (or NOT_STARTED if undoing first move)
- `redo()`: IN_PROGRESS → IN_PROGRESS
- `resetGame()`: Any → NOT_STARTED
- `winDetected()`: IN_PROGRESS → COMPLETED
- `boardFull()`: IN_PROGRESS → COMPLETED

---

### Turn Order State Machine

```
Player X's Turn
    ↓ (X makes valid move)
Player O's Turn
    ↓ (O makes valid move)
Player X's Turn
```

**Rules**:
- X always starts
- Turns alternate strictly
- Invalid moves don't change turn
- AI moves count as O's turn

---

## Win Detection Logic

### Micro Board Win Patterns

```typescript
const MICRO_WIN_PATTERNS = [
  // Rows
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  // Columns  
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  // Diagonals
  [0, 4, 8], [2, 4, 6]
]; // Total: 8 patterns
```

### Macro Board Win Patterns

Same structure as micro board (indices 0-8 represent macro positions):

```typescript
const MACRO_WIN_PATTERNS = [
  // Rows
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  // Columns
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  // Diagonals
  [0, 4, 8], [2, 4, 6]
];
```

---

## Validation Rules Summary

### Global Invariants

1. **Exactly 81 Squares**: 9 macro × 9 micro = 81 total
2. **No Overwriting**: Once a square has a player, it cannot change
3. **Turn Alternation**: Players must alternate turns (X → O → X → ...)
4. **Legal Moves Only**: Moves only allowed in legal macro boards
5. **One Winner Maximum**: Only one player can win the game
6. **Game Ends on Win**: No moves allowed after win detected

### Move Validation

```typescript
function validateMove(
  position: Position,
  gameState: GameState
): ValidationResult {
  // 1. Check game is in progress
  if (gameState.status !== 'IN_PROGRESS') {
    return { valid: false, reason: 'GAME_NOT_IN_PROGRESS' };
  }
  
  // 2. Check correct player's turn
  if (position.player !== gameState.currentPlayer) {
    return { valid: false, reason: 'WRONG_PLAYER' };
  }
  
  // 3. Check macro board is legal
  const legalBoards = getLegalMacroBoards(gameState);
  if (!legalBoards.includes(position.macro)) {
    return { valid: false, reason: 'ILLEGAL_MACRO_BOARD' };
  }
  
  // 4. Check square is empty
  const square = getSquare(gameState.board, position);
  if (square.player !== null) {
    return { valid: false, reason: 'SQUARE_OCCUPIED' };
  }
  
  // 5. Check macro board not already won
  const macroBoard = gameState.board.macroBoards[position.macro];
  if (macroBoard.owner !== null) {
    return { valid: false, reason: 'MACRO_BOARD_WON' };
  }
  
  return { valid: true };
}
```

---

## Type Definitions (Complete)

```typescript
// Core Types
type PlayerId = 'X' | 'O';
type PlayerType = 'human' | 'ai';
type GameMode = 'pvp' | 'pvai';
type GameStatus = 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';

// Entities
interface Player {
  id: PlayerId;
  type: PlayerType;
  symbol: PlayerId;
}

interface Position {
  macro: number; // 0-8
  micro: number; // 0-8
}

interface Square {
  player: PlayerId | null;
  index: number;
}

interface MicroBoard {
  squares: Square[];
  index: number;
  winner: PlayerId | 'draw' | null;
}

interface MacroBoard {
  microBoard: MicroBoard;
  index: number;
  owner: PlayerId | 'draw' | null;
}

interface Board {
  macroBoards: MacroBoard[];
}

interface Move {
  position: Position;
  player: PlayerId;
  timestamp: number;
  nextMacroBoard: number;
  wasFreeMove: boolean;
}

interface GameResult {
  winner: PlayerId | 'draw' | null;
  winningPattern: number[];
  totalMoves: number;
  duration: number;
}

interface GameState {
  board: Board;
  players: [Player, Player]; // [X, O]
  currentPlayer: PlayerId;
  legalMacroBoard: number | null; // null = free move anywhere
  status: GameStatus;
  result: GameResult | null;
  mode: GameMode;
  history: Move[];
  historyIndex: number;
}
```

---

## Relationships Diagram

```
GameState
├── board: Board
│   └── macroBoards: MacroBoard[9]
│       ├── microBoard: MicroBoard
│       │   └── squares: Square[9]
│       └── owner: PlayerId | null
├── players: Player[2]
├── currentPlayer: PlayerId
├── history: Move[]
│   └── position: Position
└── result: GameResult | null
```

---

## Next Steps

1. Use these types in `contracts/game-engine.md` API definitions
2. Implement type-safe game engine based on these entities
3. Create React components with proper TypeScript typing
4. Write unit tests validating entity constraints
