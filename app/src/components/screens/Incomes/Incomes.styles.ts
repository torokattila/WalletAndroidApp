import styled from 'styled-components/native';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(View)`
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

export const ScreenTitleContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-top: 7%;
  padding-left: 5%;
  align-self: flex-start;
`;

export const ScreenTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 25px;
  margin-right: 15px;
  font-family: 'NunitoSans-Light';
`;

export const BalanceContainer = styled(View)`
  align-self: flex-start;
  padding-left: 5%;
  margin-top: 25px;
`;

export const BalanceTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  opacity: 0.6;
  font-size: 15px;
`;

export const Balance = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 30px;
`;

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  align-self: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  margin-top: 5%;
  height: 10%;
  padding: 20px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: relative;
`;
