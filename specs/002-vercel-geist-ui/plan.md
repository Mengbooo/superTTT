# Implementation Plan: Vercel Geist Design System Integration

**Branch**: `002-vercel-geist-ui` | **Date**: 2026-02-21 | **Spec**: [specs/002-vercel-geist-ui/spec.md](spec.md)
**Input**: Feature specification from `/specs/002-vercel-geist-ui/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Implement Vercel Geist Design System across the Ultimate Tic-Tac-Toe application to achieve visual consistency, professional aesthetics, and modern user experience. The implementation will use CSS custom properties (design tokens) for Geist colors, typography, spacing, and component styles, integrated into the existing React + TypeScript + Tailwind CSS stack without adding external UI component libraries.

## Technical Context

**Language/Version**: TypeScript 5.3.3, React 18.2  
**Primary Dependencies**: Vite 5.1, Tailwind CSS 3.4.1 (for utility-first styling)  
**Storage**: N/A (frontend-only feature, no persistent storage)  
**Testing**: Vitest 1.2.2 + Testing Library (React Testing Library)  
**Target Platform**: Modern web browsers (Chrome, Firefox, Safari, Edge - latest 2 versions)
**Project Type**: Single-page web application (React + Vite)  
**Performance Goals**: <100ms style recalculation, maintain 60fps during theme transitions, <50KB additional CSS payload  
**Constraints**: Zero external UI component dependencies (implement Geist tokens natively), support light/dark modes, WCAG AA compliance  
**Scale/Scope**: ~10 screens (game board, settings, about), ~20 reusable components (buttons, inputs, cards, modals)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle I: Spec-Driven Development
**Status**: PASS  
**Justification**: Feature originates from formal specification document (`spec.md`) created on 2026-02-21 with user stories, requirements, and success criteria defined in technology-agnostic terms.

### Principle II: User Story Independence (MVP-First)
**Status**: PASS  
**Justification**: All three user stories are independently implementable:
- Story 1 (Visual Consistency): Can be delivered as standalone MVP with color/typography tokens
- Story 2 (Component Styling): Builds on Story 1 but adds independent value through reusable patterns
- Story 3 (Responsive Layout): Enhances existing foundation without dependencies on Stories 1-2 for core functionality

Prioritization: P1 → P2 → P3 enables incremental delivery.

### Principle III: Test-First Implementation
**Status**: PASS  
**Justification**: Plan includes test creation tasks before implementation tasks. Visual regression tests and accessibility tests will be written first using Vitest + Testing Library.

### Principle IV: Parallel Execution Design
**Status**: PASS  
**Justification**: Tasks will be marked with [P] when operating on different files:
- Color tokens implementation (parallel with Typography tokens)
- Component styling (buttons parallel with inputs)
- Screen updates (independent screens can be updated concurrently)

### Principle V: Documentation Co-Location
**Status**: PASS  
**Justification**: All documentation lives in `specs/002-vercel-geist-ui/`:
- spec.md (feature specification)
- plan.md (this file)
- research.md (Phase 0 output)
- data-model.md (Phase 1 output)
- contracts/ (Phase 1 output)
- quickstart.md (Phase 1 output)

**Overall Gate Result**: PASS - All 5 principles validated. Proceeding to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-vercel-geist-ui/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── styles/
│   ├── geist-tokens.css     # Geist design tokens (CSS custom properties)
│   └── index.css            # Main stylesheet with token imports
├── components/
│   ├── ui/
│   │   ├── GeistButton.tsx  # Reusable button component
│   │   ├── GeistInput.tsx   # Reusable input component
│   │   ├── GeistCard.tsx    # Reusable card component
│   │   └── GeistModal.tsx   # Reusable modal component
│   └── [existing components updated with Geist styles]
├── hooks/
│   └── useGeistTheme.ts     # Theme management hook (light/dark mode)
├── utils/
│   └── geist-constants.ts   # Geist design constants and types
├── App.tsx                  # Root component with theme provider
└── main.tsx                 # Entry point with global styles

tests/
├── contract/
│   └── geist-api.test.ts    # Component API contract tests
├── integration/
│   └── theme-switching.test.ts  # End-to-end theme switching tests
└── unit/
    ├── components/          # Unit tests for each UI component
    └── hooks/
        └── useGeistTheme.test.ts  # Hook behavior tests
```

**Structure Decision**: Single-page web application structure (Option 1 from template). The existing src/ directory will be extended with Geist-specific styles, components, and utilities. No backend or mobile platforms required.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| N/A - No violations | Design adheres to all 5 principles without complexity debt | N/A |

---

## Post-Design Constitution Check (Re-evaluation)

*Completed after Phase 1 design artifacts generated*

### Principle I: Spec-Driven Development
**Status**: PASS ✅  
**Post-Design Validation**: All design documents (`research.md`, `data-model.md`, `contracts/`) directly trace back to requirements in `spec.md`. No scope creep detected.

### Principle II: User Story Independence (MVP-First)
**Status**: PASS ✅  
**Post-Design Validation**: Component contracts designed for independent deployment:
- Color/typography tokens can ship without components
- Individual components (Button, Input, Card, Modal) are self-contained
- Theme switching works independently of component implementation

### Principle III: Test-First Implementation
**Status**: PASS ✅  
**Post-Design Validation**: Contract tests defined in `contracts/component-api.md` provide clear test specifications before implementation. Test structure includes:
- Prop acceptance tests
- Default value verification
- Event handling validation
- Accessibility compliance checks
- Styling guarantees verification

### Principle IV: Parallel Execution Design
**Status**: PASS ✅  
**Post-Design Validation**: Clear parallel work streams identified:
- [P] CSS tokens file creation (independent)
- [P] Font integration (independent)
- [P] Theme hook implementation (independent)
- [P] Component implementations (Button ∥ Input ∥ Card ∥ Modal)
- [ ] Screen updates (depend on components, but screens can be parallel)

### Principle V: Documentation Co-Location
**Status**: PASS ✅  
**Post-Design Validation**: All documentation successfully created in `specs/002-vercel-geist-ui/`:
- ✅ spec.md (input)
- ✅ plan.md (this file)
- ✅ research.md (Phase 0 complete)
- ✅ data-model.md (Phase 1 complete)
- ✅ contracts/component-api.md (Phase 1 complete)
- ✅ quickstart.md (Phase 1 complete)
- ⏳ tasks.md (Phase 2 - not created by /speckit.plan)

**Overall Gate Result**: PASS ✅ - All 5 principles validated post-design. Ready for Phase 2 (task generation via `/speckit.tasks`).

---

## Phase Summary

### Phase 0: Research ✅ COMPLETE
- Resolved all technical unknowns
- Documented 8 key decisions with rationale and alternatives
- Established best practices for performance, accessibility, and testing

### Phase 1: Design & Contracts ✅ COMPLETE
- **data-model.md**: Defined 5 core entities (ColorToken, SpacingToken, TypographyScale, ComponentStyle, ThemeState)
- **contracts/component-api.md**: Specified APIs for 4 components (GeistButton, GeistInput, GeistCard, GeistModal)
- **quickstart.md**: Step-by-step integration guide with troubleshooting
- **Agent Context**: Updated Qoder CLI context with new technology stack

### Phase 2: Next Steps
Run `/speckit.tasks` to generate granular task list for implementation following the test-first approach.
