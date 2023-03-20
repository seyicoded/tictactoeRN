import * as React from 'react';
import { useTheme } from 'styled-components/native';

import { StatusText } from '@app/components';

import { StyledGameStatusBarContainer } from './Game.styled';
import { GameStatusBarProps } from './Game.types';

const GameStatusBar: React.FC<GameStatusBarProps> = ({
  status,
  hasComputer = false,
  currentPlayer,
  ...props
}) => {
  const { colors } = useTheme();

  return (
    <StyledGameStatusBarContainer {...props}>
      <StatusText
        title={hasComputer ? 'YOU' : 'PLAYER X'}
        value={status.playerX}
        color={colors.primary}
        isCurrentPlayer={currentPlayer === 'X'}
        playerColor={colors.primary}
      />
      <StatusText title="ROUND" value={status.round} color={colors.subtitle} />
      <StatusText
        title={hasComputer ? 'COMPUTER' : 'PLAYER O'}
        value={status.playerO}
        color={colors.secondary}
        isCurrentPlayer={currentPlayer === 'O'}
        playerColor={colors.secondary}
      />
    </StyledGameStatusBarContainer>
  );
};

export default GameStatusBar;
