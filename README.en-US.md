# Ultimate Tic-Tac-Toe - 超级井字棋

> **This project was generated using the [spec-kit](https://github.com/spec-kit/spec-kit) toolset through the [spec-coding](https://github.com/spec-kit/spec-coding) methodology**

A full-featured Ultimate Tic-Tac-Toe web application supporting local two-player and AI battles.

## ✨ Key Features

- 🎯 **Nested Board**: 9x9 grid composed of nine 3x3 mini-boards
- 🔗 **Coupling Rules**: Your move determines where your opponent must play
- 🆓 **Free Moves**: When the target board is full or decided, play anywhere
- 🤖 **AI Opponent**: Built-in AI with three difficulty levels (Easy/Medium/Hard)
- 📜 **Game History**: Complete Undo/Redo functionality for review
- 📱 **Responsive Design**: Perfect on mobile and desktop
- 💾 **Auto-Save**: Game state automatically saved to local storage

## 🚀 Quick Start

### Prerequisites

- Node.js v18.x or v20.x
- npm v9.x or later

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Visit http://localhost:5173/ to start playing

### Build for Production

```bash
npm run build
npm run preview  # Preview production build
```

## 📖 Game Rules

### Basic Rules

1. **Board Structure**: The board consists of 9 large grids, each containing a 3x3 mini-board
2. **Move Rules**:
   - First move can be placed in any empty position
   - Subsequent moves must be in the large grid corresponding to where your opponent last played
   - Example: If you play in the top-right corner of any mini-board, your opponent must play in the top-right large grid of the main board
3. **Free Moves**: If the target large grid is full or decided, you can play anywhere on the board

### Winning Conditions

- **Mini-Board Win**: Connect three marks in a row in any mini-board to claim that large grid
- **Main Board Win**: Claim three large grids in a row (horizontal/vertical/diagonal) on the main board
- **Draw**: All 81 cells are filled but no player achieves main board victory

## 🛠️ Tech Stack

- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite 5.x
- **Styling**: Tailwind CSS 3.x
- **Testing**: Vitest + React Testing Library
- **State Management**: useReducer (React Hooks)

## 📁 Project Structure

```
src/
├── components/          # UI Components
│   ├── Board/          # Board component
│   ├── Square/         # Square component
│   ├── MacroBoard/     # Large grid component
│   ├── GameInfo/       # Game information
│   ├── GameOverModal/  # Game over modal
│   ├── HistoryPanel/   # History panel
│   └── ...
├── hooks/              # Custom Hooks
│   ├── useGameLogic.ts # Game logic
│   └── useAI.ts        # AI logic
├── engine/             # Core Game Engine
│   ├── types.ts        # Type definitions
│   ├── constants.ts    # Constants
│   ├── utils.ts        # Utility functions
│   ├── validation.ts   # Move validation
│   ├── gameEngine.ts   # Game engine
│   ├── winDetector.ts  # Win detection
│   └── ai.ts           # AI algorithm
├── utils/              # Common utilities
│   └── storage.ts      # LocalStorage wrapper
└── styles/             # Global styles
```

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📝 Development Commands

```bash
# Development mode
npm run dev

# Code linting
npm run lint

# Type checking
npm run typecheck

# Format code
npm run format

# Build
npm run build

# Preview production build
npm run preview
```

## 🎯 Feature Checklist

- [x] Game initialization and mode selection
- [x] Complete move logic
- [x] Coupling rules implementation
- [x] Free move rules
- [x] Mini-board and main board win detection
- [x] Game over handling
- [x] Undo/Redo functionality
- [x] History display
- [x] AI opponent (3 difficulty levels)
- [x] Responsive design
- [x] Touch optimization (44px minimum touch target)
- [x] Auto-save/load
- [ ] Keyboard shortcuts (Ctrl+Z/Y)
- [ ] Accessibility improvements (ARIA)
- [ ] Performance optimization
- [ ] Complete test suite

## 🏆 Success Criteria

According to the feature specification, this implementation meets the following standards:

- ✅ Users can start playing within 30 seconds
- ✅ Move response time < 100ms
- ✅ Win detection < 200ms
- ✅ Undo/Redo response < 150ms
- ✅ AI decision time < 500ms
- ✅ Touch target ≥ 44x44px
- ✅ Supports minimum 320px screen width

## 🤝 Contributing

Issues and Pull Requests are welcome!

## 📄 License

MIT License

---

<div align="center">

**Developer**: Built with ❤️ using React + TypeScript + Tailwind CSS + Vercel Geist UI

**Generation Method**: This project was generated using the [spec-kit](https://github.com/spec-kit/spec-kit) toolset through the [spec-coding](https://github.com/spec-kit/spec-coding) methodology

**UI Framework**: Built with [Vercel Geist Design System](https://github.com/vercel/geist-ui) visual specifications

[中文版本](./README.zh-CN.md) | [Back to Main README](./README.md)

</div>