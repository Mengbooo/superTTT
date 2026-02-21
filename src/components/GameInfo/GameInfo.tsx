import React from 'react';
import type { PlayerId, GameStatus } from '../../types';

export interface GameInfoProps {
  currentPlayer: PlayerId;
  status?: GameStatus;
}

export const GameInfo: React.FC<GameInfoProps> = ({ currentPlayer, status }) => {
  if (status === 'COMPLETED') {
    return null; // Don't show current player when game is over
  }

  return (
    <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
      <h2 
        style={{
          fontSize: 'var(--text-h2)',
          lineHeight: 'var(--line-height-h2)',
          fontWeight: '600',
          color: 'var(--geist-foreground)',
          margin: '0',
        }}
      >
        Current Turn:{' '}
        <span style={{ color: currentPlayer === 'X' ? 'var(--geist-error)' : 'var(--geist-primary)' }}>
          Player {currentPlayer}
        </span>
      </h2>
    </div>
  );
};

GameInfo.displayName = 'GameInfo';
