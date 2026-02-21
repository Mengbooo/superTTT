import React from 'react';
import { GeistButton } from '../ui/GeistButton';

export interface NewGameButtonProps {
  onClick: () => void;
}

export const NewGameButton: React.FC<NewGameButtonProps> = ({ onClick }) => {
  return (
    <GeistButton variant="primary" size="medium" onClick={onClick}>
      New Game
    </GeistButton>
  );
};

NewGameButton.displayName = 'NewGameButton';
