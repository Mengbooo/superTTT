import React from 'react';
import { GeistButton } from '../ui/GeistButton';

export interface RedoButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const RedoButton: React.FC<RedoButtonProps> = ({ onClick, disabled }) => {
  return (
    <GeistButton
      variant="secondary"
      size="small"
      onClick={onClick}
      disabled={disabled}
      aria-label="Redo last move"
    >
      ↷ Redo
    </GeistButton>
  );
};

RedoButton.displayName = 'RedoButton';
