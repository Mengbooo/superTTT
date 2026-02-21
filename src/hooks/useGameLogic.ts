import { useReducer, useCallback, useEffect } from 'react';
import {
  createInitialGameState,
  makeMove as executeMove,
  undo as executeUndo,
  redo as executeRedo,
} from '../engine/gameEngine';
import { saveGame, loadGame, clearSave } from '../utils/storage';
import type { GameState, GameMode, Position } from '../engine/types';

// Action types for the reducer
type GameAction =
  | { type: 'START_GAME'; payload: GameMode }
  | { type: 'MAKE_MOVE'; payload: Position }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'RESET' }
  | { type: 'LOAD'; payload: GameState };

// Reducer function
function gameReducer(state: GameState | null, action: GameAction): GameState | null {
  switch (action.type) {
    case 'START_GAME': {
      return createInitialGameState(action.payload);
    }
    
    case 'RESET': {
      return null;
    }
    
    case 'MAKE_MOVE': {
      if (!state) return state;
      
      const result = executeMove(state, action.payload);
      return result.success ? result.newState! : state;
    }
    
    case 'UNDO': {
      if (!state) return state;
      
      const newState = executeUndo(state);
      return newState !== null ? newState : null;
    }
    
    case 'REDO': {
      if (!state) return state;
      
      const newState = executeRedo(state);
      return newState !== null ? newState : state;
    }
    
    case 'LOAD': {
      return action.payload;
    }
    
    default:
      return state;
  }
}

export interface UseGameLogicReturn {
  gameState: GameState | null;
  isGameStarted: boolean;
  canUndo: boolean;
  canRedo: boolean;
  startGame: (mode: GameMode) => void;
  makeMove: (position: Position) => void;
  undo: () => void;
  redo: () => void;
  resetGame: () => void;
  loadSavedGame: () => void;
}

export function useGameLogic(): UseGameLogicReturn {
  const [gameState, dispatch] = useReducer(gameReducer, null);

  // Auto-load saved game on mount
  useEffect(() => {
    const saved = loadGame();
    if (saved) {
      console.log('[Hook] Auto-loaded saved game');
      dispatch({ type: 'LOAD', payload: saved });
    }
  }, []);

  // Auto-save on game state change
  useEffect(() => {
    if (gameState && gameState.isGameStarted) {
      saveGame(gameState);
    } else if (!gameState) {
      clearSave();
    }
  }, [gameState]);

  const startGame = useCallback((mode: GameMode) => {
    dispatch({ type: 'START_GAME', payload: mode });
  }, []);

  const makeMove = useCallback((position: Position) => {
    dispatch({ type: 'MAKE_MOVE', payload: position });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: 'UNDO' });
  }, []);

  const redo = useCallback(() => {
    dispatch({ type: 'REDO' });
  }, []);

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const loadSavedGame = useCallback(() => {
    const saved = loadGame();
    if (saved) {
      dispatch({ type: 'LOAD', payload: saved });
    }
  }, []);

  const canUndo = gameState !== null && gameState.historyIndex >= 0;
  const canRedo = gameState !== null && gameState.historyIndex < gameState.history.length - 1;

  return {
    gameState,
    isGameStarted: gameState !== null,
    canUndo,
    canRedo,
    startGame,
    makeMove,
    undo,
    redo,
    resetGame,
    loadSavedGame,
  };
}
