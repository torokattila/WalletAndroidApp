import styled from 'styled-components/native';
import { Dimensions, StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native';

export const Container = styled(View)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding-top: 0px;
  width: ${0.95 * Dimensions.get('screen').width}px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const TextContainer = styled(View)`
  flex-direction: column;
  flex: 3;
  max-width: ${() => (Dimensions.get('screen').width <= 320 ? 230 : 249)}px;
`;

export const StyledText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
`;

export const SubtitleContainer = styled(View)`
  margin-top: 2px;
`;

export const toastContainerStyle: StyleProp<ViewStyle> = {
  width: '95%',
  flex: 1,
  borderRadius: 16,
};
