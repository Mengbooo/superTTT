# Tasks: Vercel Geist Design System Integration

**Input**: Design documents from `/specs/002-vercel-geist-ui/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/component-api.md, quickstart.md

**Tests**: Contract tests and integration tests are included based on explicit requirements in spec.md and contracts/component-api.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Geist design system foundation

- [X] T001 Verify project structure exists per plan.md (src/styles/, src/components/, src/hooks/)
- [X] T002 [P] Install Geist fonts via Google Fonts CDN in index.html
- [X] T003 [P] Create geist-tokens.css with CSS custom properties in src/styles/geist-tokens.css
- [X] T004 Update main stylesheet (src/styles/index.css) to import geist-tokens.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 [P] Create useGeistTheme hook in src/hooks/useGeistTheme.ts
- [X] T006 Create GeistProvider component in src/components/GeistProvider.tsx
- [X] T007 Create geist-constants.ts with TypeScript interfaces in src/utils/geist-constants.ts
- [X] T008 Update App.tsx to integrate GeistProvider at root level

**Checkpoint**: Foundation ready - user story work can now begin in parallel

---

## Phase 3: User Story 1 - Visual Consistency Across Application (Priority: P1) 🎯 MVP

**Goal**: Implement unified visual design language with Geist color palette, typography, and spacing tokens across all screens

**Independent Test**: Navigate through all screens and verify consistent application of colors (#fafafa through #171717 neutrals, accent colors), typography (Geist Sans/Mono), and spacing (4px increments)

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [X] T009 [P] [US1] Contract test for color token values in tests/contract/geist-colors.test.ts
- [X] T010 [P] [US1] Contract test for typography scale in tests/contract/geist-typography.test.ts
- [X] T011 [US1] Integration test for theme switching in tests/integration/theme-switching.test.ts

### Implementation for User Story 1

- [X] T012 [P] [US1] Define ColorToken entity constants in src/utils/geist-constants.ts
- [X] T013 [P] [US1] Define TypographyScale entity constants in src/utils/geist-constants.ts
- [X] T014 [P] [US1] Define SpacingToken entity constants in src/utils/geist-constants.ts
- [X] T015 [US1] Implement dark mode media query support in geist-tokens.css
- [X] T016 [US1] Add theme toggle button component in src/components/ui/ThemeToggle.tsx
- [X] T017 [US1] Apply Geist background colors to all existing screens
- [X] T018 [US1] Apply Geist typography to all existing text elements
- [X] T019 [US1] Apply Geist spacing tokens to all layouts

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Component Styling Standardization (Priority: P2)

**Goal**: All UI components follow Geist design specifications with standardized border radius, shadows, and spacing

**Independent Test**: Inspect any UI component's computed styles and verify border radius (8px/12px/16px), border width (1px solid), shadow usage, and spacing (4px increment system)

### Tests for User Story 2 ⚠️

- [X] T020 [P] [US2] Contract test for GeistButton API in tests/contract/geist-button.test.tsx
- [X] T021 [P] [US2] Contract test for GeistInput API in tests/contract/geist-input.test.tsx
- [X] T022 [P] [US2] Contract test for GeistCard API in tests/contract/geist-card.test.tsx
- [X] T023 [P] [US2] Contract test for GeistModal API in tests/contract/geist-modal.test.tsx

### Implementation for User Story 2

- [X] T024 [P] [US2] Create GeistButton component in src/components/ui/GeistButton.tsx
- [X] T025 [P] [US2] Create GeistInput component in src/components/ui/GeistInput.tsx
- [X] T026 [P] [US2] Create GeistCard component in src/components/ui/GeistCard.tsx
- [X] T027 [P] [US2] Create GeistModal component in src/components/ui/GeistModal.tsx
- [X] T028 [US2] Add variant support (primary/secondary/ghost/danger) to GeistButton
- [X] T029 [US2] Add validation states (error/helper text) to GeistInput
- [X] T030 [US2] Add clickable variant and footer support to GeistCard
- [X] T031 [US2] Add focus trap and escape key handling to GeistModal
- [X] T032 [US2] Replace existing buttons with GeistButton across app
- [X] T033 [US2] Replace existing inputs with GeistInput across app
- [X] T034 [US2] Replace existing cards with GeistCard across app

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Responsive Layout with Bento Grid Principles (Priority: P3)

**Goal**: Interface adapts gracefully to screen sizes while maintaining structured Bento Grid aesthetic

**Independent Test**: View application at different viewport widths (320px, 768px, 1024px, 1280px+) and verify proper layout adaptation, touch target sizes (minimum 44×44px), and maintained grid structure

### Tests for User Story 3 ⚠️

- [X] T035 [P] [US3] Responsive layout test at mobile breakpoint (320px) in tests/integration/responsive-mobile.test.ts
- [X] T036 [P] [US3] Responsive layout test at tablet breakpoint (768px) in tests/integration/responsive-tablet.test.ts
- [X] T037 [US3] Touch target size verification test in tests/integration/touch-targets.test.ts

### Implementation for User Story 3

- [X] T038 [P] [US3] Add responsive breakpoints to geist-tokens.css (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
- [X] T039 [US3] Implement Bento Grid layout utility classes in src/styles/bento-grid.css
- [X] T040 [US3] Add min-height: 44px to all interactive components (buttons, inputs)
- [X] T041 [US3] Update game board layout with responsive grid
- [ ] T042 [US3] Update settings page layout with responsive grid
- [ ] T043 [US3] Update about page layout with responsive grid
- [X] T044 [US3] Add touch-friendly tap targets for mobile navigation
- [ ] T045 [US3] Test and adjust layouts at all breakpoint widths

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T046 [P] Run accessibility audit with axe-core or Lighthouse
- [X] T047 [P] Fix any WCAG AA contrast violations found
- [X] T048 Code cleanup and remove unused CSS/imports
- [X] T049 Performance optimization (verify <100ms style recalculation, 60fps theme transitions)
- [X] T050 Update documentation with Geist usage examples
- [X] T051 Run quickstart.md validation steps
- [ ] T052 Visual regression testing setup (optional: Percy/Chromatic)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 tokens but independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Enhances layout without dependencies on US2

### Within Each User Story

- Tests MUST be written and FAIL before implementation
- Token/entity definitions before component implementation
- Core components before integration/replacement tasks
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002, T003)
- All Foundational tasks marked [P] can run in parallel (T005)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models/entities within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all contract tests for User Story 1 together:
Task: "Contract test for color token values in tests/contract/geist-colors.test.ts"
Task: "Contract test for typography scale in tests/contract/geist-typography.test.ts"

# Launch all entity definitions for User Story 1 together:
Task: "Define ColorToken entity constants in src/utils/geist-constants.ts"
Task: "Define TypographyScale entity constants in src/utils/geist-constants.ts"
Task: "Define SpacingToken entity constants in src/utils/geist-constants.ts"
```

---

## Parallel Example: User Story 2

```bash
# Launch all component contract tests together:
Task: "Contract test for GeistButton API in tests/contract/geist-button.test.tsx"
Task: "Contract test for GeistInput API in tests/contract/geist-input.test.tsx"
Task: "Contract test for GeistCard API in tests/contract/geist-card.test.tsx"
Task: "Contract test for GeistModal API in tests/contract/geist-modal.test.tsx"

# Launch all component implementations together:
Task: "Create GeistButton component in src/components/ui/GeistButton.tsx"
Task: "Create GeistInput component in src/components/ui/GeistInput.tsx"
Task: "Create GeistCard component in src/components/ui/GeistCard.tsx"
Task: "Create GeistModal component in src/components/ui/GeistModal.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test visual consistency across all screens
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Visual Consistency) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Component Standardization) → Test independently → Deploy/Demo
4. Add User Story 3 (Responsive Layout) → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (tokens, typography, colors)
   - Developer B: User Story 2 (component library)
   - Developer C: User Story 3 (responsive layouts)
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

---

**Task Summary**:
- **Total Tasks**: 52
- **Phase 1 (Setup)**: 4 tasks
- **Phase 2 (Foundational)**: 4 tasks
- **Phase 3 (US1 - Visual Consistency)**: 11 tasks (3 tests + 8 implementation)
- **Phase 4 (US2 - Component Styling)**: 15 tasks (4 tests + 11 implementation)
- **Phase 5 (US3 - Responsive Layout)**: 11 tasks (3 tests + 8 implementation)
- **Phase 6 (Polish)**: 7 tasks

**Parallel Opportunities Identified**:
- Setup: 2 parallel tasks (T002, T003)
- Foundational: 1 parallel task (T005)
- US1 Tests: 2 parallel tasks (T009, T010)
- US1 Entities: 3 parallel tasks (T012, T013, T014)
- US2 Tests: 4 parallel tasks (T020-T023)
- US2 Components: 4 parallel tasks (T024-T027)
- US3 Tests: 2 parallel tasks (T035, T036)

**Independent Test Criteria**:
- US1: Visual consistency verifiable via screen navigation and contrast checks
- US2: Component styles verifiable via DOM inspection and computed style checks
- US3: Responsive behavior verifiable via viewport resizing and touch target measurements

**Suggested MVP Scope**: User Story 1 only (visual consistency with Geist tokens, theme switching, basic styling)

**Format Validation**: ✅ ALL tasks follow the checklist format (`- [ ] [TaskID] [P?] [Story?] Description with file path`)
