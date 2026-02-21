import { describe, it, expect } from 'vitest';
import { createInitialGameState } from '../../../src/engine/gameEngine';
import type { GameMode } from '../../../src/engine/types';

describe('createInitialGameState', () => {
  it('should create initial game state for PvP mode', () => {
    const state = createInitialGameState('pvp');
    
    expect(state.mode).toBe('pvp');
    expect(state.status).toBe('IN_PROGRESS');
    expect(state.currentPlayer).toBe('X');
    expect(state.players).toHaveLength(2);
    expect(state.players[0].id).toBe('X');
    expect(state.players[0].type).toBe('human');
    expect(state.players[1].id).toBe('O');
    expect(state.players[1].type).toBe('human');
    expect(state.legalMacroBoard).toBeNull(); // First move is free
    expect(state.result).toBeNull();
    expect(state.history).toEqual([]);
    expect(state.historyIndex).toBe(-1);
  });

  it('should create initial game state for PvAI mode', () => {
    const state = createInitialGameState('pvai');
    
    expect(state.mode).toBe('pvai');
    expect(state.status).toBe('IN_PROGRESS');
    expect(state.currentPlayer).toBe('X');
    expect(state.players).toHaveLength(2);
    expect(state.players[0].id).toBe('X');
    expect(state.players[0].type).toBe('human');
    expect(state.players[1].id).toBe('O');
    expect(state.players[1].type).toBe('ai');
    expect(state.legalMacroBoard).toBeNull();
    expect(state.result).toBeNull();
    expect(state.history).toEqual([]);
    expect(state.historyIndex).toBe(-1);
  });

  it('should initialize board with all empty squares', () => {
    const state = createInitialGameState('pvp');
    
    expect(state.board.macroBoards).toHaveLength(9);
    
    state.board.macroBoards.forEach((macroBoard, macroIdx) => {
      expect(macroBoard.index).toBe(macroIdx);
      expect(macroBoard.owner).toBeNull();
      expect(macroBoard.microBoard.winner).toBeNull();
      expect(macroBoard.microBoard.squares).toHaveLength(9);
      
      macroBoard.microBoard.squares.forEach((square, microIdx) => {
        expect(square.index).toBe(microIdx);
        expect(square.player).toBeNull();
      });
    });
  });
});
