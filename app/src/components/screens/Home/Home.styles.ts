import styled from 'styled-components/native';
import { ScrollView, ScrollViewProps, StyleProp, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(ScrollView)<ScrollViewProps>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const scrollViewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  justifyContent: 'center',
};

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WelcomeText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 25px;
  align-self: flex-start;
  padding-top: 7%;
  padding-left: 5%;
  padding-bottom: 20%;
  font-family: 'NunitoSans-Light';
`;

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  align-self: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  margin-top: 10%;
  height: 10%;
  padding: 20px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: relative;
`;
