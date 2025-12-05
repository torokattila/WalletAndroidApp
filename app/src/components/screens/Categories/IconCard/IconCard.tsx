import { useDarkMode } from '@hooks/useDarkMode';
import { theme } from '@styles/theme';
import React, { FC } from 'react';
import { IconContainer } from './IconCard.styles';
import { Icon, IconType } from '@components/shared';

const cardShadow = {
  elevation: 8,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 14,
};

type Props = {
  icon: IconType;
  onPress?: () => void;
  isSelected?: boolean;
};

export const IconCard: FC<Props> = ({ icon, onPress, isSelected = false }: Props) => {
  const { isDarkMode } = useDarkMode();

  return (
    <IconContainer
      isDarkMode={isDarkMode}
      style={cardShadow}
      onPress={onPress}
      isSelected={isSelected}
    >
      <Icon
        type={icon}
        iconColor={isDarkMode ? theme.colors.white[100] : theme.colors.black[100]}
      />
    </IconContainer>
  );
};
