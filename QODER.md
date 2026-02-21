# SuperTTT Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-21

## Active Technologies
- TypeScript 5.3.3, React 18.2 + Vite 5.1, Tailwind CSS 3.4.1 (for utility-first styling) (002-vercel-geist-ui)
- N/A (frontend-only feature, no persistent storage) (002-vercel-geist-ui)

- TypeScript 5.x + React 18+ + Tailwind CSS 3.x (001-ultimate-tictactoe)

## Project Structure

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
│   └── winDetector.test.ts
├── styles/
│   └── globals.css
└── App.tsx

tests/
├── integration/
│   └── gameFlow.test.tsx
└── e2e/
    └── completeGame.test.tsx

specs/001-ultimate-tictactoe/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    └── game-engine.md
```

## Commands

```bash
npm test              # Run all tests
npm run lint          # Run ESLint
npm run typecheck     # Run TypeScript type checking
npm run dev           # Start development server
npm run build         # Create production build
npm run preview       # Preview production build
```

## Code Style

TypeScript 5.x + React 18+: Follow standard conventions

- Use functional components with TypeScript interfaces for props
- Prefer `const` over `let`, avoid `var`
- Use arrow functions for component definitions and hooks
- Implement strict TypeScript types (no `any`)
- Follow React Hooks rules (only call in top-level or custom hooks)
- Use ES modules (`import`/`export`) exclusively
- Format with Prettier (2-space indentation, single quotes)
- Test with Vitest + React Testing Library
- Use Tailwind CSS for styling (utility-first approach)

## Recent Changes
- 002-vercel-geist-ui: Added TypeScript 5.3.3, React 18.2 + Vite 5.1, Tailwind CSS 3.4.1 (for utility-first styling)

- 001-ultimate-tictactoe: Added TypeScript + React 18+ + Tailwind CSS 3.x for Ultimate Tic-Tac-Toe web application

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
