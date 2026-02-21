import { useState, useCallback } from 'react';
import { useGameLogic } from './hooks/useGameLogic';
import { useAI } from './hooks/useAI';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { GeistProvider, useGeistContext } from './components/GeistProvider';
import { ThemeToggle } from './components/ui/ThemeToggle';
import { Board } from './components/Board/Board';
import { GameInfo } from './components/GameInfo/GameInfo';
import { NewGameButton } from './components/NewGameButton/NewGameButton';
import { ModeSelector } from './components/ModeSelector/ModeSelector';
import { GameOverModal } from './components/GameOverModal/GameOverModal';
import { UndoButton } from './components/UndoButton/UndoButton';
import { RedoButton } from './components/RedoButton/RedoButton';
import { HistoryPanel } from './components/HistoryPanel/HistoryPanel';
import type { GameMode, Position } from './engine/types';

function AppContent() {
  const { theme, toggleTheme } = useGeistContext();
  const { gameState, isGameStarted, canUndo, canRedo, startGame, makeMove, undo, redo, resetGame } = useGameLogic();
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);
  const [isAIThinking, setIsAIThinking] = useState(false);

  // AI integration
  const handleAIMoveReady = useCallback((position: Position) => {
    if (gameState?.status === 'IN_PROGRESS') {
      makeMove(position);
      setIsAIThinking(false);
    }
  }, [makeMove, gameState]);

  useAI(gameState, handleAIMoveReady, 'medium');

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onUndo: undo,
    onRedo: redo,
    canUndo,
    canRedo,
  });

  const handleSelectMode = useCallback((mode: GameMode) => {
    setSelectedMode(mode);
  }, []);

  const handleStartGame = useCallback(() => {
    if (selectedMode) {
      startGame(selectedMode);
      setIsAIThinking(false);
    }
  }, [selectedMode, startGame]);

  const handleMove = useCallback((position: Position) => {
    console.log('[Game] Move attempted:', {
      macro: position.macro,
      micro: position.micro,
      currentPlayer: gameState?.currentPlayer,
      legalMacroBoard: gameState?.legalMacroBoard,
      status: gameState?.status,
    });
    
    // Prevent moves during AI thinking
    if (isAIThinking) {
      console.log('[Game] Ignoring move - AI is thinking');
      return;
    }
    
    makeMove(position);
  }, [makeMove, gameState, isAIThinking]);

  const handleNewGame = useCallback(() => {
    resetGame();
    setSelectedMode(null);
    setIsAIThinking(false);
  }, [resetGame]);

  const handleUndo = useCallback(() => {
    console.log('[Game] Undo (keyboard shortcut available: Ctrl+Z)');
    undo();
  }, [undo]);

  const handleRedo = useCallback(() => {
    console.log('[Game] Redo (keyboard shortcut available: Ctrl+Shift+Z or Ctrl+Y)');
    redo();
  }, [redo]);

  // Geist styling inline styles
  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--geist-background)',
    color: 'var(--geist-foreground)',
    minHeight: '100vh',
    padding: 'var(--space-6)',
    transition: 'background-color var(--transition-fast) var(--ease-in-out), color var(--transition-fast) var(--ease-in-out)',
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'var(--geist-background)',
    border: '1px solid var(--neutral-200)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow)',
    padding: 'var(--space-6)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'var(--text-h1)',
    lineHeight: 'var(--line-height-h1)',
    fontWeight: '600',
    fontFamily: 'var(--font-sans)',
    textAlign: 'center' as const,
    marginBottom: 'var(--space-4)',
  };

  if (!gameState) {
    return (
      <div style={containerStyle} className="game-container" role="application" aria-label="Ultimate Tic-Tac-Toe">
        {/* Theme Toggle */}
        <div style={{ position: 'fixed', top: 'var(--space-4)', right: 'var(--space-4)', zIndex: 1000 }}>
          <ThemeToggle />
        </div>
        
        <h1 style={headingStyle}>
          超级井字棋 - Ultimate Tic-Tac-Toe
        </h1>

        <div style={cardStyle}>
          <ModeSelector
            selectedMode={selectedMode}
            onSelectMode={handleSelectMode}
          />
          
          <div style={{ textAlign: 'center', marginTop: 'var(--space-4)' }}>
            <NewGameButton onClick={handleStartGame} />
          </div>
        </div>
      </div>
    );
  }

  const hasAIPlayer = gameState.players.some(p => p.type === 'ai');
  const isAIsTurn = hasAIPlayer && gameState.currentPlayer === 'O';

  return (
    <div style={containerStyle} className="game-container" role="application" aria-label="Ultimate Tic-Tac-Toe">
      {/* Theme Toggle */}
      <div style={{ position: 'fixed', top: 'var(--space-4)', right: 'var(--space-4)', zIndex: 1000 }}>
        <ThemeToggle />
      </div>
      
      <h1 style={headingStyle}>
        超级井字棋 - Ultimate Tic-Tac-Toe
      </h1>

      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <GameInfo 
            currentPlayer={gameState.currentPlayer}
            status={gameState.status}
          />
          
          <div style={{ display: 'flex', gap: 'var(--space-2)' }} role="toolbar" aria-label="Game controls">
            <UndoButton 
              onClick={handleUndo} 
              disabled={!canUndo || isAIThinking} 
              aria-describedby="undo-shortcut"
            />
            <RedoButton 
              onClick={handleRedo} 
              disabled={!canRedo || isAIThinking}
              aria-describedby="redo-shortcut"
            />
          </div>
        </div>
        
        {/* Hidden ARIA live regions for announcements */}
        <div className="sr-only" role="status" aria-live="polite">
          {isAIThinking ? "AI is thinking" : ""}
          {!canUndo ? "No moves to undo" : ""}
          {!canRedo ? "No moves to redo" : ""}
        </div>
        
        {/* Keyboard shortcut hints */}
        <div id="undo-shortcut" className="sr-only">Press Ctrl+Z to undo</div>
        <div id="redo-shortcut" className="sr-only">Press Ctrl+Shift+Z or Ctrl+Y to redo</div>
        
        {isAIThinking && (
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 'var(--space-2)', 
            color: 'var(--geist-primary)',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          }} aria-live="polite">
            AI is thinking...
          </div>
        )}
        
        <Board
          board={gameState.board}
          currentPlayer={gameState.currentPlayer}
          legalMacroBoard={gameState.legalMacroBoard}
          onMove={handleMove}
          disabled={isAIThinking}
          aria-label="Game board"
        />
        
        <HistoryPanel
          history={gameState.history}
          currentMoveIndex={gameState.historyIndex}
        />
        
        <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
          <NewGameButton onClick={handleNewGame} />
        </div>

        {gameState.status === 'COMPLETED' && gameState.result && (
          <GameOverModal
            result={gameState.result}
            onNewGame={handleNewGame}
          />
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <GeistProvider>
      <AppContent />
    </GeistProvider>
  );
}

export default App;
