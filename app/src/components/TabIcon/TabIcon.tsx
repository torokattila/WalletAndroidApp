import React, { FC } from 'react';
import { Icon, IconType } from '@components/shared';
import { theme } from '@styles/theme';

type TabIconProps = {
  icon: IconType;
  isHighlighted: boolean;
};

export const TabIcon: FC<TabIconProps> = ({ icon, isHighlighted }) => {
  const iconColor = isHighlighted ? theme.colors.purple[100] : theme.colors.grey[100];

  return <Icon type={icon} iconColor={iconColor} />;
};
