import { ActivityIndicator, Animated, Image, Text, View } from 'react-native';
import styled from 'styled-components/native';

export const AppContainer = styled(View)`
  flex: 1;
`;

export const SplashContainer = styled(Animated.View)`
  width: 100%;
  height: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.white[100]};
`;

export const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

export const StyledTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.purple[100]};
  font-size: 30px;
  text-align: center;
  font-family: 'NunitoSans-Bold';
`;

export const Loader = styled(ActivityIndicator)`
  margin-top: 10px;
`;
