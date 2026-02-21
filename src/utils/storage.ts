import type { GameState } from '../types';

const STORAGE_KEY = 'ultimate-tictactoe-save';

/**
 * Saves game state to localStorage
 */
export function saveGame(state: GameState): void {
  try {
    const serialized = JSON.stringify({
      savedAt: Date.now(),
      state,
    });
    localStorage.setItem(STORAGE_KEY, serialized);
    console.log('[Storage] Game saved');
  } catch (error) {
    console.error('[Storage] Failed to save game:', error);
  }
}

/**
 * Loads game state from localStorage
 */
export function loadGame(): GameState | null {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) {
      console.log('[Storage] No saved game found');
      return null;
    }

    const data = JSON.parse(serialized);
    const state = data.state as GameState;

    // Validate the loaded state
    if (!isValidGameState(state)) {
      console.warn('[Storage] Invalid saved game state');
      return null;
    }

    console.log('[Storage] Game loaded from', new Date(data.savedAt));
    return state;
  } catch (error) {
    console.error('[Storage] Failed to load game:', error);
    return null;
  }
}

/**
 * Clears saved game from localStorage
 */
export function clearSave(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
    console.log('[Storage] Save cleared');
  } catch (error) {
    console.error('[Storage] Failed to clear save:', error);
  }
}

/**
 * Basic validation of game state structure
 */
function isValidGameState(state: any): boolean {
  return (
    state &&
    typeof state === 'object' &&
    state.board &&
    Array.isArray(state.board.macroBoards) &&
    state.players &&
    Array.isArray(state.players) &&
    state.currentPlayer &&
    typeof state.status === 'string' &&
    Array.isArray(state.history)
  );
}
