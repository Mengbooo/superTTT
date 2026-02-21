import React from 'react';
import { GeistButton } from '../ui/GeistButton';

export interface UndoButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const UndoButton: React.FC<UndoButtonProps> = ({ onClick, disabled }) => {
  return (
    <GeistButton
      variant="secondary"
      size="small"
      onClick={onClick}
      disabled={disabled}
      aria-label="Undo last move"
    >
      ↶ Undo
    </GeistButton>
  );
};

UndoButton.displayName = 'UndoButton';
