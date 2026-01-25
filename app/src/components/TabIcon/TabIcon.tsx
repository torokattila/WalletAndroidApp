import React, { FC } from 'react';
import { Icon, IconType } from '@components/shared';
import { theme } from '@styles/theme';
import { useDarkMode } from '@hooks/useDarkMode';

type TabIconProps = {
  icon: IconType;
  isHighlighted: boolean;
};

export const TabIcon: FC<TabIconProps> = ({ icon, isHighlighted }) => {
  const { isDarkMode } = useDarkMode();

  const iconColor = isHighlighted
    ? isDarkMode
      ? theme.colors.magenta[100]
      : theme.colors.magenta[100]
    : isDarkMode
    ? theme.colors.grey[950]
    : theme.colors.grey[100];

  return <Icon type={icon} iconColor={iconColor} />;
};
