/**
 * Empty State Component
 * Reusable component for showing "no data" states across all list screens
 */

import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import { useDarkMode } from '@hooks/useDarkMode';
import { Icon, IconType } from '../Icon';

interface EmptyStateProps {
  icon?: IconType;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
`;

const IconContainer = styled(View)`
  margin-bottom: 20px;
`;

const Title = styled(Text)<{ isDarkMode: boolean }>`
  font-size: 18px;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[800]};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled(Text)<{ isDarkMode: boolean }>`
  font-size: 14px;
  font-family: 'NunitoSans-Regular';
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.grey[600]};
  text-align: center;
  margin-bottom: 20px;
`;

const ActionContainer = styled(View)`
  margin-top: 10px;
`;

/**
 * Consistent empty state component
 * Shows when lists have no data
 */
export const EmptyState: FC<EmptyStateProps> = ({
  icon = 'other-purchase',
  title,
  subtitle,
  action,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <Container>
      {icon && (
        <IconContainer>
          <Icon type={icon} iconColor={isDarkMode ? '#9CA3AF' : '#6B7280'} />
        </IconContainer>
      )}

      <Title isDarkMode={isDarkMode}>{title}</Title>

      {subtitle && <Subtitle isDarkMode={isDarkMode}>{subtitle}</Subtitle>}

      {action && <ActionContainer>{action}</ActionContainer>}
    </Container>
  );
};
