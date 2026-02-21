import { useEffect, useRef } from 'react';
import { getAIMove } from '../engine/ai';
import type { GameState, Position, AIDifficulty } from '../types';

export interface UseAIReturn {
  isAIThinking: boolean;
  aiMove: Position | null;
}

export function useAI(
  gameState: GameState | null,
  onAIMoveReady: (position: Position) => void,
  difficulty: AIDifficulty = 'medium'
): UseAIReturn {
  const isProcessingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!gameState || isProcessingRef.current) {
      return;
    }

    // Check if it's AI's turn
    const aiPlayer = gameState.players.find((p) => p.type === 'ai');
    if (!aiPlayer || gameState.currentPlayer !== aiPlayer.id) {
      return;
    }

    // Game should be in progress
    if (gameState.status !== 'IN_PROGRESS') {
      return;
    }

    isProcessingRef.current = true;

    // Add a small delay to make it feel more natural (and not instant)
    timeoutRef.current = setTimeout(() => {
      try {
        const aiMove = getAIMove(gameState, difficulty);
        console.log('[AI] Move selected:', aiMove);
        onAIMoveReady(aiMove);
      } catch (error) {
        console.error('[AI] Error selecting move:', error);
      } finally {
        isProcessingRef.current = false;
      }
    }, 500); // 500ms delay for AI thinking
  }, [gameState, onAIMoveReady, difficulty]);

  const isAIThinking = isProcessingRef.current;
  const aiMove = null; // Move is passed directly via callback

  return {
    isAIThinking,
    aiMove,
  };
}
