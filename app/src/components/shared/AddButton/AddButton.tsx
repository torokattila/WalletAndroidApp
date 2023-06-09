import React, { FC } from 'react';
import { theme } from '@styles/theme';
import { useDarkMode } from '@hooks/useDarkMode';
import { StyledButton, StyledIcon } from './AddButton.styles';

type AddButtonProps = {
  onPress: () => void;
};

const shadow = {
  elevation: 5,
  shadowColor: theme.colors.purple[100],
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.58,
  shadowRadius: 25,
};

export const AddButton: FC<AddButtonProps> = ({ onPress }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <StyledButton style={[shadow]} onPress={onPress} isDarkMode={isDarkMode}>
      <StyledIcon type="plus" iconColor={theme.colors.white[100]} />
    </StyledButton>
  );
};
