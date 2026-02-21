import React from 'react';
import { GeistButton } from '../ui/GeistButton';
import type { GameMode } from '../../types';

export interface ModeSelectorProps {
  selectedMode: GameMode | null;
  onSelectMode: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  selectedMode,
  onSelectMode,
}) => {
  return (
    <div style={{ marginBottom: 'var(--space-6)', textAlign: 'center' }}>
      <h3 
        style={{
          fontSize: 'var(--text-h3)',
          lineHeight: 'var(--line-height-h3)',
          fontWeight: '500',
          marginBottom: 'var(--space-4)',
          color: 'var(--geist-foreground)',
        }}
      >
        Select Game Mode
      </h3>
      <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
        <GeistButton
          variant={selectedMode === 'pvp' ? 'primary' : 'secondary'}
          onClick={() => onSelectMode('pvp')}
        >
          Player vs Player
        </GeistButton>
        <GeistButton
          variant={selectedMode === 'pvai' ? 'primary' : 'secondary'}
          onClick={() => onSelectMode('pvai')}
        >
          Player vs AI
        </GeistButton>
      </div>
    </div>
  );
};

ModeSelector.displayName = 'ModeSelector';
