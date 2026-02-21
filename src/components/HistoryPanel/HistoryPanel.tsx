import React from 'react';
import { GeistCard } from '../ui/GeistCard';
import type { Move } from '../../types';

export interface HistoryPanelProps {
  history: Move[];
  currentMoveIndex: number;
}

export const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  currentMoveIndex,
}) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <GeistCard padding="small" style={{ marginTop: 'var(--space-4)', maxHeight: '192px', overflowY: 'auto' as const }}>
      <h3 
        style={{
          fontSize: 'var(--text-small)',
          fontWeight: '600',
          marginBottom: 'var(--space-2)',
          color: 'var(--geist-foreground)',
        }}
      >
        Move History
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        {history.map((move, index) => {
          const isCurrentMove = index === currentMoveIndex;
          const isFutureMove = index > currentMoveIndex;
          
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'var(--space-1)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--text-caption)',
                backgroundColor: isCurrentMove 
                  ? 'var(--neutral-100)' 
                  : isFutureMove 
                    ? 'transparent'
                    : 'var(--geist-background)',
                fontWeight: isCurrentMove ? '600' : '400',
                color: isFutureMove ? 'var(--neutral-400)' : 'var(--geist-foreground)',
                opacity: isFutureMove ? '0.6' : '1',
              }}
            >
              <span>
                {index + 1}. Player {move.player} → Macro {move.position.macro + 1}, Micro{' '}
                {move.position.micro + 1}
              </span>
              {move.wasFreeMove && (
                <span style={{ color: 'var(--neutral-500)', fontStyle: 'italic', fontSize: '11px' }}>
                  (free move)
                </span>
              )}
            </div>
          );
        })}
      </div>
    </GeistCard>
  );
};

HistoryPanel.displayName = 'HistoryPanel';
