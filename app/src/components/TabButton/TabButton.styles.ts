import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { View } from 'react-native';

export const Container = styled(View)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const TabButtonHighlight = styled(Animated.View)<{ active: boolean }>`
  position: absolute;
  width: 54px;
  height: 54px;
  border-radius: 20px;
`;
