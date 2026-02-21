# Research & Discovery: 超级井字棋 (Ultimate Tic-Tac-Toe)

**Feature**: 001-ultimate-tictactoe  
**Date**: 2026-02-21  
**Purpose**: Resolve all NEEDS CLARIFICATION items and establish technical best practices

---

## Research Question 1: React State Management for Game History

### Decision: useReducer + Custom Hook Pattern

**What was chosen**: 
- `useReducer` for game state management with immutable updates
- Custom hook `useGameLogic` to encapsulate game engine integration
- Time-travel debugging built into state history array

**Rationale**:
- **Undo/Redo Simplicity**: useReducer naturally supports time-travel by maintaining history array of past states
- **Predictable Updates**: Reducer pattern enforces pure functions for state transitions (critical for game logic)
- **No External Dependencies**: Avoids adding Zustand/Redux for a single-feature app
- **React DevTools Integration**: Action types visible in DevTools for debugging
- **Testability**: Reducer can be tested independently of React

**Alternatives Considered**:

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| useState | Simple, built-in | Complex undo logic, scattered state updates | Too manual for history management |
| Zustand | Lightweight, external store | Adds dependency, overkill for single feature | Principle violation (unnecessary complexity) |
| Redux Toolkit | Powerful devtools, middleware | Heavy bundle size (~17kb), boilerplate | Over-engineering for 81 squares + history |
| Immutable.js | True immutability, structural sharing | Learning curve, bundle size (~13kb) | Native spread operators sufficient for this scale |

**Implementation Pattern**:
```typescript
interface GameState {
  board: BoardState;
  macroBoard: MacroBoardState;
  currentPlayer: Player;
  legalMacroBoard: number | null; // null = free move
  winner: Winner | null;
  history: Move[];
  historyIndex: number; // For undo/redo
}

type GameAction = 
  | { type: 'MAKE_MOVE'; payload: Position }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET'; payload: GameMode };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  // Pure function - critical for testability
};
```

**Best Practices**:
- Keep game engine pure (no React dependencies)
- Use reducer only for React integration
- Store history as immutable snapshots
- Implement `canUndo`/`canRedo` as derived state

---

## Research Question 2: Win Detection Algorithm

### Decision: Precomputed Win Patterns + Incremental Checking

**What was chosen**:
- Precompute all 8 winning patterns (3 rows + 3 cols + 2 diagonals) for each board
- Check only affected patterns after each move (incremental)
- Two-level detection: micro board → macro board

**Rationale**:
- **Performance**: O(1) per move vs O(n²) full board scan
- **Simplicity**: Only check patterns that include the last moved position
- **Scalability**: Works efficiently even with 9x9 = 81 positions
- **Maintainability**: Clear separation between micro and macro win detection

**Win Pattern Structure**:
```typescript
const WIN_PATTERNS = [
  // Rows
  [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
  // Columns
  [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
  // Diagonals
  [[0, 4, 8], [2, 4, 6]]
];

// Total: 8 patterns per board (3 rows + 3 cols + 2 diagonals)
```

**Incremental Check Algorithm**:
```typescript
function checkMicroWin(board: MicroBoard[], position: number): Player | null {
  const row = Math.floor(position / 3);
  const col = position % 3;
  const player = board[position].player;
  
  if (!player) return null;
  
  // Get patterns that include this position
  const relevantPatterns = getRelevantPatterns(row, col);
  
  // Check only those patterns
  for (const pattern of relevantPatterns) {
    if (pattern.every(pos => board[pos].player === player)) {
      return player;
    }
  }
  
  return null;
}
```

**Alternatives Considered**:

| Alternative | Performance | Complexity | Why Rejected |
|-------------|-------------|------------|--------------|
| Full board scan every move | O(81) per move | Low | Unnecessary computation |
| Bitboard representation | O(1) bitwise ops | High | Over-engineering, hard to maintain |
| Memoization with cache | O(1) average | Medium | Cache invalidation complexity |

**Performance Estimate**:
- Average case: Check 2-4 patterns per move (row + col + maybe diagonal)
- Each pattern: 3 position checks
- Total operations per move: ~12 comparisons
- Well under 100ms target (SC-002)

---

## Research Question 3: Responsive Grid Layout with Tailwind CSS

### Decision: CSS Grid + Aspect Ratio Containers

**What was chosen**:
- CSS Grid for both macro (3x3) and micro (3x3) boards
- `aspect-square` utility for maintaining square cells
- Container queries or max-width constraints for responsiveness
- Mobile-first breakpoints (sm, md, lg, xl)

**Rationale**:
- **Native Tailwind**: No custom CSS required
- **Aspect Ratio Preservation**: Squares remain square at all sizes
- **Responsive Scaling**: Single source of truth via container width
- **Touch Target Compliance**: Minimum size enforced via min-w/min-h utilities

**Layout Structure**:
```tsx
<div className="grid grid-cols-3 gap-2 max-w-[min(90vw,600px)] mx-auto">
  {macroBoards.map((macro, macroIdx) => (
    <div 
      key={macroIdx}
      className={`
        aspect-square 
        grid grid-cols-3 gap-0.5
        ${isLegalMacroBoard(macroIdx) ? 'ring-4 ring-blue-500' : ''}
        ${macro.winner ? 'bg-green-200' : 'bg-gray-100'}
      `}
    >
      {microBoards[macroIdx].map((square, microIdx) => (
        <button
          className="aspect-square w-full min-h-[44px] ..."
          onClick={() => handleMove(macroIdx, microIdx)}
        />
      ))}
    </div>
  ))}
</div>
```

**Responsive Breakpoints**:
```css
/* Mobile: 320px - 640px */
gap-0.5, text-xs, min-h-[44px]

/* Tablet: 640px - 1024px */  
sm:gap-1, sm:text-base

/* Desktop: 1024px+ */
lg:max-w-[600px], lg:gap-2, lg:text-lg
```

**Alternatives Considered**:

| Alternative | Pros | Cons | Why Rejected |
|-------------|------|------|--------------|
| Flexbox | Good browser support | Complex for 2D grids | Grid is purpose-built |
| Fixed pixel sizes | Simple | Not responsive | Violates SC-006 |
| SVG-based board | Perfect scaling | Overkill for simple grid | Unnecessary complexity |
| Canvas rendering | High performance | Poor accessibility | WCAG compliance issues |

**Touch Target Enforcement**:
- `min-h-[44px]` on all clickable squares
- On mobile (<640px), ensure board fits within viewport while maintaining 44px minimum
- Use `touch-action: manipulation` to prevent double-tap zoom delay

---

## Research Question 4: Mobile Touch Target Optimization

### Decision: Minimum Size Utilities + Hit Area Expansion

**What was chosen**:
- `min-h-[44px] min-w-[44px]` on all interactive elements
- Visual size can be smaller, but hit area expanded via padding
- `touch-action: manipulation` for instant feedback
- Hover states for desktop, active states for touch

**Rationale**:
- **WCAG Compliance**: 44x44px is WCAG AAA standard
- **iOS/Android Guidelines**: Matches platform HIG (44pt / 48dp)
- **User Experience**: Prevents mis-taps on small screens
- **Accessibility**: Works for users with motor impairments

**Implementation Pattern**:
```tsx
<button
  className={`
    aspect-square 
    w-full h-full
    min-h-[44px] min-w-[44px]
    p-2 /* Expands hit area visually */
    flex items-center justify-center
    touch-manipulation /* Disables double-tap zoom */
    hover:bg-blue-100 /* Desktop feedback */
    active:bg-blue-200 /* Touch feedback */
    focus:outline-none focus:ring-2 focus:ring-blue-500
  `}
  aria-label={`Row ${row + 1}, Column ${col + 1}`}
>
  {/* Visual content can be smaller */}
  <span className="text-2xl sm:text-3xl">{value}</span>
</button>
```

**Testing Strategy**:
- Manual testing on real devices (iPhone SE, Pixel, iPad)
- Chrome DevTools device mode for quick iteration
- Lighthouse accessibility audit (must score 100)

---

## Research Question 5: AI Move Selection Strategy

### Decision: Random Selection with Priority Weights

**What was chosen**:
- Base: Random selection from legal moves
- Enhancement: Simple priority system (win block > center > corner > random)
- Configurable difficulty levels (easy = pure random, medium = 50% smart, hard = 100% smart)

**Rationale**:
- **Spec Requirement**: FR-012 specifies "简单随机 AI"
- **Performance**: Instant decision (<10ms vs 500ms target SC-007)
- **Scalability**: Can upgrade to minim algorithm later without API changes
- **User Experience**: Provides challenge without being unbeatable

**AI Algorithm**:
```typescript
function selectAIMove(legalMoves: Position[], gameState: GameState): Position {
  // Priority 1: Check if AI can win immediately
  const winningMove = findWinningMove(legalMoves, gameState, AI_PLAYER);
  if (winningMove) return winningMove;
  
  // Priority 2: Block opponent's winning move
  const blockingMove = findWinningMove(legalMoves, gameState, OPPONENT);
  if (blockingMove) return blockingMove;
  
  // Priority 3: Prefer center (position 4)
  const centerMove = legalMoves.find(m => m.micro === 4);
  if (centerMove && isPositionLegal(centerMove, gameState)) {
    return centerMove;
  }
  
  // Priority 4: Prefer corners (0, 2, 6, 8)
  const corners = [0, 2, 6, 8];
  const cornerMoves = legalMoves.filter(m => corners.includes(m.micro));
  if (cornerMoves.length > 0) {
    return randomChoice(cornerMoves);
  }
  
  // Fallback: Random legal move
  return randomChoice(legalMoves);
}
```

**Performance Characteristics**:
- Easy level: O(1) - pure random
- Medium level: O(n) where n = legal moves (typically < 20)
- Hard level: O(n * 8) - check all win patterns for each move
- All well under 500ms target

**Alternatives Considered**:

| Alternative | Difficulty | Implementation | Why Rejected |
|-------------|------------|----------------|--------------|
| Minimax with alpha-beta | Expert | Complex (200+ LOC) | Overkill for casual game |
| Monte Carlo Tree Search | Strong | Very complex | Unnecessary for "simple AI" requirement |
| Rule-based expert system | Medium | Medium complexity | More complex than weighted random |
| Pure random | Trivial | Trivial | Too easy, no fun factor |

---

## Summary of Technical Decisions

| Decision Area | Choice | Impact |
|---------------|--------|--------|
| State Management | useReducer + custom hook | Clean undo/redo, testable logic |
| Win Detection | Precomputed patterns + incremental | O(1) per move, <100ms target met |
| Layout System | CSS Grid + aspect-square | Responsive, maintains proportions |
| Touch Targets | 44px minimum + hit expansion | WCAG compliant, mobile-friendly |
| AI Strategy | Weighted random | Fast (<500ms), scalable difficulty |

## Unresolved Questions

None. All research questions have been resolved with clear decisions and implementation patterns documented.

## Next Steps

1. Create `data-model.md` using these decisions
2. Define contracts in `contracts/game-engine.md`
3. Update agent context with technology stack
4. Proceed to `/speckit.tasks` phase
