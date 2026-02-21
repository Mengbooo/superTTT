# Quickstart Guide: 超级井字棋 (Ultimate Tic-Tac-Toe)

**Feature**: 001-ultimate-tictactoe  
**Date**: 2026-02-21  
**Purpose**: Enable new developers to set up, run, and test the feature in <10 minutes

---

## Prerequisites

Ensure you have the following installed:

- **Node.js**: v18.x or v20.x (LTS versions)
- **npm**: v9.x or later (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended IDE (with ESLint + Prettier extensions)

**Verify Installation**:
```bash
node --version  # Should output: v18.x.x or v20.x.x
npm --version   # Should output: 9.x.x or later
git --version   # Should output: git version 2.x.x
```

---

## Step 1: Clone Repository

```bash
# Navigate to project directory
cd D:\.Code2026\superTTT

# Verify you're on the feature branch
git branch  # Should show: * 001-ultimate-tictactoe
```

---

## Step 2: Install Dependencies

```bash
# Install all project dependencies
npm install

# Expected output: ~50-80 packages installed
# Time: 30-60 seconds (depending on internet speed)
```

**Troubleshooting**:
- If you see `ERR_LOCKFILE_VERSION` mismatch: Delete `package-lock.json` and run `npm install` again
- If installation fails on Windows: Run terminal as Administrator

---

## Step 3: Start Development Server

```bash
# Start Vite dev server
npm run dev

# Expected output:
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
# ➜  press h + enter to show help
```

**Open Browser**: Navigate to http://localhost:5173/

You should see:
- Empty 9x9 game board
- "New Game" button
- Mode selection (PvP or PvAI)

---

## Step 4: Test Basic Functionality

### Manual Testing Checklist

1. **Start New Game**:
   - Click "New Game" button
   - Select "Player vs AI" mode
   - Board initializes with all squares empty
   - First move indicator shows (Player X's turn)

2. **Make First Move**:
   - Click any square on the board
   - Your symbol (X) appears
   - One macro board highlights (showing where AI must play)

3. **AI Response**:
   - AI makes a move within 500ms
   - AI's symbol (O) appears in highlighted macro board
   - Next legal area updates

4. **Continue Playing**:
   - Alternate turns with AI
   - Legal areas highlight correctly
   - Invalid clicks are rejected

5. **Win Detection**:
   - Complete a micro board (3 in a row)
   - Macro board shows ownership (color change or marker)
   - Win entire game (3 macro boards in a row)
   - Victory message displays

6. **Undo/Redo**:
   - Make 3-4 moves
   - Click "Undo" - last move reverts
   - Click "Redo" - move restores
   - History panel updates

7. **Responsive Design**:
   - Resize browser window
   - Board scales appropriately
   - All squares remain clickable
   - Test mobile view (DevTools → Device Toolbar)

---

## Step 5: Run Automated Tests

```bash
# Run all tests
npm test

# Expected output:
#  ✓ src/engine/gameEngine.test.ts (15 tests) 45ms
#  ✓ src/hooks/useGameLogic.test.ts (8 tests) 32ms
#  ✓ src/components/Board/Board.test.tsx (6 tests) 78ms
#  ...
# Test Suites: 8 passed, 8 total
# Tests:       42 passed, 42 total
```

**Run Specific Test Suite**:
```bash
# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# Coverage report
npm run test:coverage
```

---

## Step 6: Build for Production

```bash
# Create production build
npm run build

# Expected output:
# dist/index.html                 0.45 kB │ gzip:  0.30 kB
# dist/assets/index-abc123.css   12.34 kB │ gzip:  3.45 kB
# dist/assets/index-xyz789.js   145.67 kB │ gzip: 45.23 kB
# ✓ built in 2.34s
```

**Preview Production Build**:
```bash
npm run preview

# Opens: http://localhost:4173/
```

---

## Project Structure Overview

```
D:\.Code2026\superTTT\
├── specs/001-ultimate-tictactoe/    # Feature documentation
│   ├── spec.md                      # Feature specification
│   ├── plan.md                      # Implementation plan
│   ├── research.md                  # Technical decisions
│   ├── data-model.md                # Type definitions
│   ├── quickstart.md                # This file
│   └── contracts/
│       └── game-engine.md           # API contracts
├── src/
│   ├── engine/                      # Pure game logic
│   │   ├── gameEngine.ts
│   │   ├── winDetector.ts
│   │   └── types.ts
│   ├── hooks/                       # React hooks
│   │   ├── useGameLogic.ts
│   │   └── useAI.ts
│   ├── components/                  # UI components
│   │   ├── Board/
│   │   ├── Square/
│   │   └── MacroBoard/
│   └── App.tsx
├── tests/
│   ├── unit/                        # Unit tests
│   └── integration/                 # Integration tests
└── package.json
```

---

## Common Development Tasks

### Add a New Component

```bash
# Create component directory
mkdir -p src/components/YourComponent

# Create files
touch src/components/YourComponent/YourComponent.tsx
touch src/components/YourComponent/YourComponent.test.tsx
touch src/components/YourComponent/index.ts
```

**Template**:
```tsx
// src/components/YourComponent/YourComponent.tsx
import React from 'react';

interface YourComponentProps {
  // Define props
}

export const YourComponent: React.FC<YourComponentProps> = (props) => {
  return (
    <div className="your-component">
      {/* Component content */}
    </div>
  );
};
```

---

### Debug Game State

Add debug logging in `useGameLogic` hook:

```typescript
useEffect(() => {
  console.log('Game State:', JSON.stringify(gameState, null, 2));
}, [gameState]);
```

Or use React DevTools:
1. Install React DevTools extension
2. Open DevTools → Components tab
3. Find `App` component
4. Inspect `gameState` in hooks panel

---

### Test AI Behavior

Temporarily add AI debugging:

```typescript
// In useAI.ts
const aiMove = getAIMove(gameState, difficulty);
console.log('AI chose:', aiMove, 'Legal moves:', getLegalMoves(gameState).length);
```

---

## Troubleshooting

### Issue: Port 5173 Already in Use

**Solution**: Change port in `vite.config.ts`:
```typescript
export default defineConfig({
  server: {
    port: 3000, // Or any available port
  },
});
```

---

### Issue: TypeScript Errors

**Solution**: 
```bash
# Check TypeScript compilation
npm run typecheck

# Fix errors based on output
# Common issues: missing types, unused imports
```

---

### Issue: Tests Fail Randomly

**Likely Cause**: Async timing issues or non-deterministic AI

**Solution**: Mock random number generator in tests:
```typescript
beforeEach(() => {
  vi.spyOn(Math, 'random').mockReturnValue(0.5); // Fixed value
});
```

---

### Issue: Mobile View Not Working

**Check**: Tailwind responsive classes applied correctly

**Debug**:
1. Open DevTools → Device Toolbar
2. Select iPhone SE (375px width)
3. Inspect board container
4. Verify `min-h-[44px]` and responsive grid classes

---

## Performance Benchmarks

Expected performance on mid-range laptop (2023+):

| Metric | Target | How to Measure |
|--------|--------|----------------|
| Initial Load | < 1s | Chrome DevTools → Network tab |
| First Paint | < 500ms | Chrome DevTools → Performance tab |
| Move Response | < 100ms | Console.time() around makeMove |
| AI Decision | < 500ms | Console.time() around getAIMove |
| Undo/Redo | < 150ms | Console.time() around undo/redo |
| Bundle Size | < 200KB gzipped | `npm run build` output |

---

## Next Steps After Quickstart

1. **Read Full Documentation**:
   - [`spec.md`](./spec.md) - Feature requirements
   - [`plan.md`](./plan.md) - Implementation strategy
   - [`data-model.md`](./data-model.md) - Type definitions
   - [`contracts/game-engine.md`](./contracts/game-engine.md) - API details

2. **Start Implementing**:
   - Run `/speckit.tasks` to generate task list
   - Follow test-first approach (Red-Green-Refactor)
   - Reference constitution principles

3. **Contribute**:
   - Create feature branch from `001-ultimate-tictactoe`
   - Make changes with tests
   - Submit PR for review

---

## Support

For questions or issues:
1. Check existing documentation in `specs/001-ultimate-tictactoe/`
2. Review `.qoder/commands/` for speckit workflow guidance
3. Consult `.specify/memory/constitution.md` for development principles

**Happy Coding!** 🎮
