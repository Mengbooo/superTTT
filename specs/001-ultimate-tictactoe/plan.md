# Implementation Plan: 超级井字棋 (Ultimate Tic-Tac-Toe)

**Branch**: `001-ultimate-tictactoe` | **Date**: 2026-02-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-ultimate-tictactoe/spec.md`

## Summary

实现一个单机单人版超级井字棋 Web 应用，包含完整的 9x9 嵌套棋盘、联动规则引擎、人机对战（随机 AI）、游戏历史管理和响应式 UI。核心挑战在于状态管理（81 个小格 + 9 个大格的状态追踪）和联动规则的实时计算。

## Technical Context

**Language/Version**: TypeScript 5.x, JavaScript ES2020  
**Primary Dependencies**: React 18+, Tailwind CSS 3.x  
**Storage**: Browser LocalStorage (可选的游戏状态持久化)  
**Testing**: Vitest + React Testing Library  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)  
**Project Type**: Single-page application (SPA)  
**Performance Goals**: 
- 首次渲染时间 < 1 秒
- 落子响应时间 < 100ms
- 胜负检测 < 200ms
- AI 决策时间 < 500ms
**Constraints**: 
- 支持最小 320px 屏幕宽度
- 触摸目标最小 44x44 像素
- 无后端依赖（纯前端应用）
**Scale/Scope**: 
- 单个页面应用
- 约 5-8 个 React 组件
- 游戏状态管理约 200-300 行逻辑代码

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Spec-Driven Development ✅

- **Status**: PASS
- **Evidence**: Complete specification exists at `specs/001-ultimate-tictactoe/spec.md` with:
  - 4 prioritized user stories (P1-P4)
  - 15 functional requirements (FR-001 to FR-015)
  - 8 measurable success criteria (SC-001 to SC-008)
  - Quality checklist completed and validated

### Principle II: User Story Independence (MVP-First) ✅

- **Status**: PASS
- **Analysis**:
  - **P1 (开始新游戏)**: Independently testable - users can select mode and see initialized board
  - **P2 (执行落子)**: Independently testable - core game mechanics work without history or win detection
  - **P3 (胜负判定)**: Depends on P2 for moves, but adds independent value (win detection)
  - **P4 (游戏历史)**: Enhancement feature, depends on P2/P3 but provides standalone undo/redo value
- **MVP Definition**: P1 + P2 deliver playable 2-player game without win detection (minimal but functional)

### Principle III: Test-First Implementation ✅

- **Status**: READY FOR ENFORCEMENT
- **Test Strategy**:
  - Contract tests: Game engine API (makeMove, getLegalMoves, checkWin)
  - Integration tests: User journey (start game → make moves → detect winner)
  - Unit tests: Individual components (Board, Square, GameLogic)
- **Red-Green-Refactor**: Will be enforced during `/speckit.tasks` phase

### Principle IV: Parallel Execution Design ✅

- **Status**: HIGH PARALLEL POTENTIAL
- **Parallel Tasks Identified**:
  - [P] Game engine logic (independent of UI)
  - [P] Component library (Board, Square - independent of game logic)
  - [P] State management setup (independent of components)
  - [P] Tailwind configuration (independent of all)
- **Sequential Dependencies**:
  - Game engine must complete before integration
  - Components need state management structure first

### Principle V: Documentation Co-Location ✅

- **Status**: COMPLIANT
- **Documentation Locations**:
  - Spec: `specs/001-ultimate-tictactoe/spec.md`
  - Plan: `specs/001-ultimate-tictactoe/plan.md` (this file)
  - Research: `specs/001-ultimate-tictactoe/research.md` (Phase 0)
  - Data Model: `specs/001-ultimate-tictactoe/data-model.md` (Phase 1)
  - Quickstart: `specs/001-ultimate-tictactoe/quickstart.md` (Phase 1)
  - Contracts: `specs/001-ultimate-tictactoe/contracts/` (Phase 1)

**Overall Gate Status**: ✅ ALL PRINCIPLES VALIDATED - Proceed to Phase 0

## Project Structure

### Documentation (this feature)

```text
specs/001-ultimate-tictactoe/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── game-engine.md   # Game logic API contracts
└── tasks.md             # Phase 2 output (NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── Board/
│   │   ├── Board.tsx
│   │   ├── Board.test.tsx
│   │   └── index.ts
│   ├── Square/
│   │   ├── Square.tsx
│   │   ├── Square.test.tsx
│   │   └── index.ts
│   ├── MacroBoard/
│   │   ├── MacroBoard.tsx
│   │   ├── MacroBoard.test.tsx
│   │   └── index.ts
│   ├── GameInfo/
│   │   ├── GameInfo.tsx
│   │   └── index.ts
│   └── HistoryPanel/
│       ├── HistoryPanel.tsx
│       └── index.ts
├── hooks/
│   ├── useGameLogic.ts
│   ├── useGameLogic.test.ts
│   ├── useAI.ts
│   └── useAI.test.ts
├── engine/
│   ├── gameEngine.ts
│   ├── gameEngine.test.ts
│   ├── winDetector.ts
│   ├── winDetector.test.ts
│   └── types.ts
├── styles/
│   └── globals.css
├── utils/
│   ├── storage.ts
│   └── constants.ts
└── App.tsx

tests/
├── integration/
│   └── gameFlow.test.tsx
└── e2e/
    └── completeGame.test.tsx

public/
└── index.html
```

**Structure Decision**: Single-page application structure with component-based organization. Game logic separated into `engine/` for pure functions and `hooks/` for React-specific state management. This enables:
- Parallel development of UI components and game engine
- Easy testing of business logic independent of React
- Clear separation between pure logic and framework code

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No complexity violations detected. All principles pass without requiring additional patterns or projects.

---

## Phase 0: Research & Discovery

### Research Questions

Based on Technical Context unknowns and feature requirements:

1. **React State Management Pattern**: What's the optimal state management approach for a turn-based game with history? (useState vs useReducer vs Zustand)
2. **Win Detection Algorithm**: Efficient algorithm for checking win conditions on nested boards (performance for 81 squares + 9 macro boards)
3. **Responsive Grid Layout**: Best practices for responsive 9x9 grid with Tailwind CSS (maintaining aspect ratio across screen sizes)
4. **Touch Optimization**: Techniques for ensuring 44x44px touch targets on small screens while maintaining visual design
5. **AI Move Selection**: Simple random AI implementation patterns for React games

### Research Tasks

- [ ] Research React state management patterns for game history (undo/redo)
- [ ] Research efficient win detection algorithms for nested tic-tac-toe
- [ ] Research Tailwind CSS responsive grid patterns for fixed-aspect-ratio boards
- [ ] Research mobile touch target best practices for React components
- [ ] Document findings in `research.md`

---

## Phase 1: Design & Contracts

### Deliverables

1. **Data Model** (`data-model.md`):
   - Game state structure
   - Move representation
   - Board state transitions
   - Win state enumeration

2. **API Contracts** (`contracts/game-engine.md`):
   - `makeMove(position: {macro: number, micro: number}): GameResult`
   - `getLegalMoves(): Position[]`
   - `checkWin(board: Board): WinResult | null`
   - `resetGame(mode: GameMode): void`
   - `undo(): GameState | null`
   - `redo(): GameState | null`

3. **Quickstart Guide** (`quickstart.md`):
   - Development environment setup
   - Running the game locally
   - Running tests
   - Build and deployment

4. **Agent Context Update**:
   - Run update-agent-context script
   - Add React, Tailwind CSS, Vitest to agent knowledge

### Success Criteria for Phase 1

- [ ] All NEEDS CLARIFICATION items resolved
- [ ] Game engine contracts defined and testable
- [ ] Data model covers all entities from spec
- [ ] Quickstart enables new developer onboarding in <10 minutes
- [ ] Constitution Check re-validated post-design

---

## Phase 1 Completion Status

### Completed Artifacts

✅ **research.md** - All technical decisions documented:
- React state management: useReducer + custom hook pattern
- Win detection: Precomputed patterns + incremental checking
- Responsive layout: CSS Grid + aspect-square containers
- Touch targets: 44px minimum with hit area expansion
- AI strategy: Weighted random selection

✅ **data-model.md** - Complete type definitions:
- 9 core entities (Player, Position, Square, MicroBoard, MacroBoard, Board, Move, GameMode, GameResult)
- State machine definitions
- Win detection logic
- Validation rules
- Complete TypeScript type definitions

✅ **contracts/game-engine.md** - Full API specification:
- 8 core functions with signatures, parameters, return types
- Helper functions for board operations
- Error handling patterns
- Performance requirements aligned with success criteria
- Testing strategy

✅ **quickstart.md** - Developer onboarding guide:
- Prerequisites and setup steps
- Development server instructions
- Manual testing checklist
- Automated test commands
- Build and deployment process
- Troubleshooting section

✅ **Agent Context Updated** - QODER.md created with:
- Active technologies (TypeScript + React + Tailwind CSS)
- Project structure matching plan
- Development commands
- Code style guidelines

---

## Constitution Check Re-Validation (Post-Phase 1)

### Principle I: Spec-Driven Development ✅ CONFIRMED

All implementation follows the approved specification. No scope creep detected.

### Principle II: User Story Independence ✅ CONFIRMED

Architecture supports independent delivery:
- P1: Game initialization + mode selection (standalone)
- P2: Move execution +联动 rules (depends on P1, but independently valuable)
- P3: Win detection (enhancement to P2)
- P4: Undo/redo + history (enhancement, standalone useful)

### Principle III: Test-First Implementation ✅ READY

Contract tests defined in `contracts/game-engine.md`. Test files planned in project structure:
- `engine/gameEngine.test.ts`
- `hooks/useGameLogic.test.ts`
- `components/Board/Board.test.tsx`
- `integration/gameFlow.test.tsx`

### Principle IV: Parallel Execution Design ✅ OPTIMIZED

Parallel opportunities identified:
- [P] Game engine implementation (pure functions, no React dependencies)
- [P] Component library (UI components, mock state)
- [P] Tailwind configuration (independent styling)
- [P] Test infrastructure (setup, utilities)

Sequential dependencies:
- Integration requires game engine + components complete
- E2E tests require full integration complete

### Principle V: Documentation Co-Location ✅ COMPLIANT

All documentation in `specs/001-ultimate-tictactoe/`:
- spec.md (feature requirements)
- plan.md (implementation strategy)
- research.md (technical decisions)
- data-model.md (type definitions)
- quickstart.md (developer onboarding)
- contracts/game-engine.md (API specification)
- checklists/requirements.md (quality validation)

**Overall Gate Status**: ✅ ALL PRINCIPLES VALIDATED POST-DESIGN - Ready for `/speckit.tasks`

---

## Next Steps

1. Run `/speckit.tasks` to generate granular task list
2. Follow test-first approach (Red-Green-Refactor) for each user story
3. Implement in priority order: P1 → P2 → P3 → P4
4. Validate against success criteria after each story
5. Run quality checklist before merge
