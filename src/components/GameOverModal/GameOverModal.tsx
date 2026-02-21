import React from 'react';
import { GeistModal } from '../ui/GeistModal';
import { GeistButton } from '../ui/GeistButton';
import type { PlayerId, GameResult } from '../../types';

export interface GameOverModalProps {
  result: GameResult;
  onNewGame: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  result,
  onNewGame,
}) => {
  const isDraw = result.winner === 'draw';

  return (
    <GeistModal
      isOpen={true}
      onClose={onNewGame}
      title={isDraw ? "It's a Draw!" : `Player ${result.winner} Wins!`}
      subtitle={!isDraw ? `Victory with ${result.type} pattern` : undefined}
      size="small"
      closeOnOverlayClick={false}
      preventClose={true}
      footer={
        <GeistButton variant="primary" onClick={onNewGame} fullWidth>
          New Game
        </GeistButton>
      }
    >
      <div style={{ textAlign: 'center', padding: 'var(--space-4) 0' }}>
        {isDraw ? (
          <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🤝</div>
        ) : (
          <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🏆</div>
        )}
      </div>
    </GeistModal>
  );
};

GameOverModal.displayName = 'GameOverModal';
