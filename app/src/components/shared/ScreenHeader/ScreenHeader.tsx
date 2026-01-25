/**
 * Shared Screen Header Component
 * Eliminates duplicate header logic across all screens
 */

import React, { FC, ReactNode } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  rightAction?: ReactNode;
  leftAction?: ReactNode;
  onRightActionPress?: () => void;
  onLeftActionPress?: () => void;
}

const HeaderContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 15%;
  padding-left: 5%;
  padding-right: 5%;
  padding-bottom: 16%;
`;

const TitleContainer = styled(View)`
  flex: 1;
  flex-direction: column;
`;

const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 25px;
  font-family: 'NunitoSans-Light';
`;

const Subtitle = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 14px;
  font-family: 'NunitoSans-Regular';
  margin-top: 5px;
`;

const ActionButton = styled(TouchableOpacity)`
  padding: 8px;
`;

/**
 * Consistent screen header component
 * Used in gradient sections across the app
 */
export const ScreenHeader: FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  rightAction,
  leftAction,
  onRightActionPress,
  onLeftActionPress,
}) => {
  return (
    <HeaderContainer>
      {leftAction && <ActionButton onPress={onLeftActionPress}>{leftAction}</ActionButton>}

      <TitleContainer>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </TitleContainer>

      {rightAction && <ActionButton onPress={onRightActionPress}>{rightAction}</ActionButton>}
    </HeaderContainer>
  );
};
