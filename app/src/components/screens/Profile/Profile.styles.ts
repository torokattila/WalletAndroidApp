import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white};
`;

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
  margin-bottom: 12%;
  align-self: flex-start;
`;

export const ScreenTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 25px;
  margin-right: 15px;
  font-family: 'NunitoSans-Light';
`;

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  margin-top: 5%;
  height: 10%;
  padding: 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: relative;
`;

export const ImageContainer = styled(View)`
  position: absolute;
  border-radius: 100px;
  width: 110px;
  height: 110px;
  background-color: ${({ theme }) => theme.colors.white};
  align-self: center;
  top: -8.5%;
  border-width: 6px;
  border-color: ${({ theme }) => theme.colors.white};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const SignOutButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 25px;
  top: 20%;
`;

export const SignOutButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`;
