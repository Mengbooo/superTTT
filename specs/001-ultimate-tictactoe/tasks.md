# Tasks: 超级井字棋 (Ultimate Tic-Tac-Toe)

**Input**: Design documents from `/specs/001-ultimate-tictactoe/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/game-engine.md  

**Tests**: Test tasks are INCLUDED - follow test-first approach (Red-Green-Refactor)  

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Single-page application with source code at repository root:
- `src/` - Main source code
- `tests/` - Test files
- `public/` - Static assets

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Initialize TypeScript + React project with Vite
- [x] T002 Install React 18+ and Tailwind CSS 3.x dependencies
- [x] T003 [P] Configure ESLint and Prettier for TypeScript + React
- [x] T004 [P] Setup Vitest + React Testing Library for testing
- [x] T005 [P] Configure Tailwind CSS with responsive breakpoints (320px, 768px, 1024px)
- [x] T006 Create basic project structure (src/, tests/, public/)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T007 [P] Define TypeScript types in src/engine/types.ts (PlayerId, Position, GameMode, GameStatus)
- [x] T008 [P] Implement Board, MicroBoard, MacroBoard interfaces in src/engine/types.ts
- [x] T009 [P] Implement GameState and Move interfaces in src/engine/types.ts
- [x] T010 [P] Define WIN_PATTERNS constants in src/engine/constants.ts
- [x] T011 Create utility functions: getSquare, isMicroBoardFull in src/engine/utils.ts
- [x] T012 Setup CSS globals with Tailwind directives in src/styles/globals.css
- [x] T013 Create App.tsx with basic router/container structure

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 开始新游戏并选择模式 (Priority: P1) 🎯 MVP

**Goal**: Users can start a new game and select mode (PvP or PvAI), see initialized 9x9 board

**Independent Test**: User can open app, select mode, see initialized board, and identify current player

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T014 [P] [US1] Contract test for createInitialGameState in tests/unit/engine/createInitialGameState.test.ts
- [x] T015 [P] [US1] Component test for Board rendering in tests/components/Board.test.tsx
- [ ] T016 [US1] Integration test for game initialization flow in tests/integration/gameInit.test.tsx

### Implementation for User Story 1

- [x] T017 [P] [US1] Implement createInitialGameState(mode: GameMode): GameState in src/engine/gameEngine.ts
- [x] T018 [P] [US1] Create Square component in src/components/Square/Square.tsx
- [x] T019 [P] [US1] Create MicroBoard component in src/components/MacroBoard/MacroBoard.tsx
- [x] T020 [US1] Create Board component in src/components/Board/Board.tsx
- [x] T021 [US1] Create GameInfo component showing current player in src/components/GameInfo/GameInfo.tsx
- [x] T022 [US1] Create NewGameButton component in src/components/NewGameButton/NewGameButton.tsx
- [x] T023 [US1] Create ModeSelector component (PvP/PvAI) in src/components/ModeSelector/ModeSelector.tsx
- [x] T024 [US1] Implement useGameLogic hook with useReducer in src/hooks/useGameLogic.ts
- [x] T025 [US1] Integrate components in App.tsx with game state management
- [x] T026 [US1] Add visual indicator for current player (color/symbol)
- [x] T027 [US1] Add logging for game initialization events

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
- User can click "New Game" → select mode → see 9x9 board → know whose turn it is

---

## Phase 4: User Story 2 - 执行落子与规则验证 (Priority: P2)

**Goal**: Players can make moves in legal areas, system calculates next move area based on 联动 rules

**Independent Test**: Player can complete full move flow, system correctly highlights legal areas and calculates opponent's next area

### Tests for User Story 2 ⚠️

- [ ] T028 [P] [US2] Contract test for makeMove() in tests/unit/engine/makeMove.test.ts
- [ ] T029 [P] [US2] Contract test for getLegalMoves() in tests/unit/engine/getLegalMoves.test.ts
- [ ] T030 [P] [US2] Contract test for validateMove() in tests/unit/engine/validateMove.test.ts
- [x] T031 [US2] Component test for Square click handling in tests/components/Square.test.tsx
- [ ] T032 [US2] Integration test for move flow in tests/integration/moveFlow.test.tsx

### Implementation for User Story 2

- [x] T033 [P] [US2] Implement validateMove(state, position) in src/engine/validation.ts
- [x] T034 [P] [US2] Implement makeMove(state, position): GameActionResult in src/engine/gameEngine.ts
- [x] T035 [P] [US2] Implement getLegalMoves(state): Position[] in src/engine/gameEngine.ts
- [x] T036 [P] [US2] Implement getNextMacroBoard(position) helper in src/engine/utils.ts
- [x] T037 [P] [US2] Implement isFreeMoveAllowed(state, nextMacro) in src/engine/utils.ts
- [x] T038 [US2] Update Square component with click handler and disabled state
- [x] T039 [US2] Add visual highlighting for legal macro board in src/components/Board/Board.tsx
- [x] T040 [US2] Add visual feedback for invalid clicks (shake animation) in src/styles/globals.css
- [x] T041 [US2] Update useGameLogic hook to handle move execution
- [x] T042 [US2] Add cursor styles for clickable vs non-clickable squares
- [x] T043 [US2] Add logging for move validation events

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently
- Complete playable 2-player game with move validation and 联动 rules (no win detection yet)

---

## Phase 5: User Story 3 - 胜负判定与游戏结束 (Priority: P3)

**Goal**: System automatically detects win conditions and declares game results

**Independent Test**: When micro/macro board achieves 3-in-a-row, system correctly marks winner and ends game

### Tests for User Story 3 ⚠️

- [ ] T044 [P] [US3] Contract test for checkMicroBoardWin() in tests/unit/engine/checkMicroBoardWin.test.ts
- [ ] T045 [P] [US3] Contract test for checkWin() in tests/unit/engine/checkWin.test.ts
- [ ] T046 [US3] Integration test for micro board win scenario in tests/integration/microWin.test.tsx
- [ ] T047 [US3] Integration test for macro board win scenario in tests/integration/macroWin.test.tsx
- [ ] T048 [US3] E2E test for complete game flow in tests/e2e/completeGame.test.tsx

### Implementation for User Story 3

- [x] T049 [P] [US3] Implement checkMicroBoardWin(microBoard) in src/engine/winDetector.ts
- [x] T050 [P] [US3] Implement checkWin(board): WinResult | null in src/engine/winDetector.ts
- [x] T051 [US3] Update makeMove() to call win detection after each move
- [x] T052 [US3] Add visual marker for won micro boards (background color/overlay) in src/components/MacroBoard/MacroBoard.tsx
- [x] T053 [US3] Create GameOverModal component in src/components/GameOverModal/GameOverModal.tsx
- [ ] T054 [US3] Add winning line highlight effect in src/components/Board/Board.tsx
- [x] T055 [US3] Add celebration animation for game winner in src/styles/globals.css
- [x] T056 [US3] Handle draw condition (board full, no winner)
- [x] T057 [US3] Prevent moves after game over in useGameLogic hook
- [x] T058 [US3] Add logging for win detection events

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently
- Complete playable game with win detection and game over handling

---

## Phase 6: User Story 4 - 游戏历史与悔棋功能 (Priority: P4)

**Goal**: Users can view move history and undo/redo moves

**Independent Test**: User can undo to previous state, redo undone moves, view history panel

### Tests for User Story 4 ⚠️

- [ ] T059 [P] [US4] Contract test for undo() in tests/unit/engine/undo.test.ts
- [ ] T060 [P] [US4] Contract test for redo() in tests/unit/engine/redo.test.ts
- [ ] T061 [US4] Component test for HistoryPanel in tests/components/HistoryPanel.test.tsx
- [ ] T062 [US4] Integration test for undo/redo flow in tests/integration/undoRedo.test.tsx

### Implementation for User Story 4

- [x] T063 [P] [US4] Implement undo(state): GameState | null in src/engine/gameEngine.ts
- [x] T064 [P] [US4] Implement redo(state): GameState | null in src/engine/gameEngine.ts
- [x] T065 [US4] Update useGameLogic hook with undo/redo actions
- [x] T066 [US4] Create HistoryPanel component in src/components/HistoryPanel/HistoryPanel.tsx
- [x] T067 [US4] Create UndoButton component in src/components/UndoButton/UndoButton.tsx
- [x] T068 [US4] Create RedoButton component in src/components/RedoButton/RedoButton.tsx
- [x] T069 [US4] Add move history display (position, time, macro ownership) in HistoryPanel
- [x] T070 [US4] Disable undo button when no history available
- [x] T071 [US4] Disable redo button when at latest state or after new move
- [x] T072 [US4] Clear future history after new move (prevents redo)
- [ ] T073 [US4] Add keyboard shortcuts for undo (Ctrl+Z) and redo (Ctrl+Shift+Z/Ctrl+Y)
- [x] T074 [US4] Add logging for undo/redo events

**Checkpoint**: All user stories should now be independently functional
- Complete game with full history management and undo/redo capability

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T075 [P] Implement AI move logic in src/engine/ai.ts (random + weighted strategy)
- [x] T076 [P] Create useAI hook for AI move timing in src/hooks/useAI.ts
- [x] T077 [US2] Add AI thinking indicator (spinner/loading state)
- [x] T078 [P] Implement localStorage persistence in src/utils/storage.ts
- [x] T079 Add auto-save game state on move
- [x] T080 Add load saved game on app start
- [x] T081 [P] Optimize responsive design for mobile (320px-768px)
- [x] T082 Ensure all touch targets meet 44x44px minimum
- [x] T083 [P] Add accessibility (ARIA labels, keyboard navigation)
- [ ] T084 Run Lighthouse accessibility audit (target: 100 score)
- [ ] T085 [P] Performance optimization (memoization, prevent re-renders)
- [ ] T086 Verify performance meets success criteria (SC-002, SC-003, SC-005, SC-007)
- [ ] T087 Code cleanup and refactoring
- [ ] T088 Remove console logs from production build
- [x] T089 [P] Write comprehensive README.md with setup instructions
- [ ] T090 Run quickstart.md validation (new developer onboarding test)
- [ ] T091 Run full test suite and fix any failures
- [ ] T092 Run quality checklist validation before merge

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - **BLOCKS all user stories**
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent but integrates with US1
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US2 for move mechanics
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - Enhancement feature, depends on US2/US3

### Within Each User Story

- Tests MUST be written and FAIL before implementation (Red-Green-Refactor)
- Models/types before services
- Services before components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

**High Parallel Potential Identified:**

1. **Phase 1 (Setup)**: All tasks marked [P] can run in parallel
   - T003, T004, T005 can run simultaneously

2. **Phase 2 (Foundational)**: All tasks marked [P] can run in parallel
   - T007, T008, T009, T010, T011 can run simultaneously

3. **After Foundational Complete**: All user stories can start in parallel
   - Developer A: User Story 1 (T017-T027)
   - Developer B: User Story 2 (T033-T043)
   - Developer C: User Story 3 (T049-T058)
   - Developer D: User Story 4 (T063-T074)

4. **Within Each User Story**:
   - All test tasks marked [P] can run in parallel
   - All model/type tasks marked [P] can run in parallel
   - Components can be developed in parallel once hooks are ready

5. **Phase 7 (Polish)**: Many tasks can run in parallel
   - T075, T076, T078, T081, T083, T085, T089 can all run simultaneously

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Contract test for createInitialGameState in tests/unit/engine/createInitialGameState.test.ts"
Task: "Component test for Board rendering in tests/components/Board.test.tsx"
Task: "Integration test for game initialization flow in tests/integration/gameInit.test.tsx"

# Launch all components for User Story 1 together:
Task: "Create Square component in src/components/Square/Square.tsx"
Task: "Create MicroBoard component in src/components/MacroBoard/MacroBoard.tsx"
Task: "Create GameInfo component in src/components/GameInfo/GameInfo.tsx"
Task: "Create NewGameButton component in src/components/NewGameButton/NewGameButton.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T006)
2. Complete Phase 2: Foundational (T007-T013) - **CRITICAL BLOCKER**
3. Complete Phase 3: User Story 1 (T014-T027)
4. **STOP and VALIDATE**: 
   - Can user start new game? ✓
   - Can user select mode (PvP/PvAI)? ✓
   - Does 9x9 board render correctly? ✓
   - Is current player clearly indicated? ✓
5. Deploy/demo MVP if ready

### Incremental Delivery

1. **Foundation**: Setup + Foundational → Ready for development
2. **MVP**: Add User Story 1 → Test independently → Deploy/Demo
   - Playable game with board initialization and mode selection
3. **Core Gameplay**: Add User Story 2 → Test independently → Deploy/Demo
   - Full move mechanics with 联动 rules
4. **Win Detection**: Add User Story 3 → Test independently → Deploy/Demo
   - Complete game with victory conditions
5. **Quality of Life**: Add User Story 4 → Test independently → Deploy/Demo
   - Undo/redo and history panel

### Parallel Team Strategy

With multiple developers:

1. **Team completes Setup + Foundational together** (Phases 1-2)
2. **Once Foundational is done**, split into parallel streams:
   - Developer A: User Story 1 (P1) - Game initialization
   - Developer B: User Story 2 (P2) - Move mechanics
   - Developer C: User Story 3 (P3) - Win detection
   - Developer D: User Story 4 (P4) - History features
3. **Stories complete and integrate independently**
4. **Reunite for Polish phase** (Phase 7) - divide tasks by expertise

### Task Count Summary

| Phase | Description | Task Count |
|-------|-------------|------------|
| Phase 1 | Setup | 6 tasks |
| Phase 2 | Foundational | 7 tasks |
| Phase 3 | User Story 1 (P1) | 14 tasks (3 tests + 11 implementation) |
| Phase 4 | User Story 2 (P2) | 16 tasks (5 tests + 11 implementation) |
| Phase 5 | User Story 3 (P3) | 15 tasks (5 tests + 10 implementation) |
| Phase 6 | User Story 4 (P4) | 16 tasks (4 tests + 12 implementation) |
| Phase 7 | Polish | 18 tasks |
| **Total** | **All phases** | **92 tasks** |

### Suggested MVP Scope

**Minimum Viable Product** (fastest path to value):
- Phase 1: Setup (all 6 tasks)
- Phase 2: Foundational (all 7 tasks)
- Phase 3: User Story 1 (all 14 tasks)
- **Subset of Phase 4**: Basic move mechanics without full validation (T033, T034, T038, T039, T041)

This delivers a playable 2-player game where users can:
- Start a new game and select mode
- See the 9x9 board
- Make moves (without 联动 rule enforcement)
- Know whose turn it is

**Total MVP tasks**: ~32 tasks

---

## Notes

- [P] tasks = different files, no dependencies, can run in parallel
- [Story] label maps task to specific user story for traceability (e.g., [US1], [US2])
- Each user story should be independently completable and testable
- Verify tests fail before implementing (Red-Green-Refactor cycle)
- Commit after each task or logical group of related tasks
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Test-first approach**: Always write tests before implementation when test tasks are included
