/**
 * Shared Screen Container Component
 * Eliminates duplicate container/gradient logic across all screens
 */

import React, { FC, PropsWithChildren, ReactNode } from 'react';
import { StyleProp, ViewStyle, ScrollViewProps } from 'react-native';
import { View, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useDarkMode } from '@hooks/useDarkMode';
import { theme } from '@styles/theme';

interface ScreenContainerProps extends PropsWithChildren {
  withGradient?: boolean;
  gradientContent?: ReactNode;
  scrollable?: boolean;
  scrollViewProps?: ScrollViewProps;
  contentContainerStyle?: StyleProp<ViewStyle>;
  isDarkMode?: boolean;
}

const Container = styled(View)<{ isDarkMode: boolean }>`
  flex: 1;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[900] : theme.colors.white[100]};
`;

const StyledLinearGradient = styled(LinearGradient)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[800] : theme.colors.white[100]};
  flex: 1;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

const StyledScrollView = styled(ScrollView)`
  flex: 1;
`;

/**
 * Standard screen container that handles:
 * - Dark mode theming
 * - Gradient header sections
 * - Scrollable content
 * - Consistent styling across screens
 */
export const ScreenContainer: FC<ScreenContainerProps> = ({
  children,
  withGradient = false,
  gradientContent,
  scrollable = false,
  scrollViewProps,
  contentContainerStyle,
  isDarkMode: isDarkModeProp,
}) => {
  const { isDarkMode: isDarkModeContext } = useDarkMode();
  const isDarkMode = isDarkModeProp ?? isDarkModeContext;

  if (withGradient) {
    return (
      <Container isDarkMode={isDarkMode}>
        <StyledLinearGradient
          colors={[theme.colors.magenta[100], theme.colors.magenta[100]]}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {gradientContent}

          <ContentContainer isDarkMode={isDarkMode} style={contentContainerStyle}>
            {scrollable ? (
              <StyledScrollView showsVerticalScrollIndicator={false} {...scrollViewProps}>
                {children}
              </StyledScrollView>
            ) : (
              children
            )}
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
    );
  }

  return (
    <Container isDarkMode={isDarkMode} style={contentContainerStyle}>
      {scrollable ? (
        <StyledScrollView showsVerticalScrollIndicator={false} {...scrollViewProps}>
          {children}
        </StyledScrollView>
      ) : (
        children
      )}
    </Container>
  );
};
