import styled from 'styled-components/native';
import { Dimensions, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const WIDTH = Dimensions.get('screen').width;

export const Container = styled(LinearGradient)`
  width: ${() => 0.9 * WIDTH}px;
  border-radius: 15px;
  height: 200px;
  background-color: ${({ theme }) => theme.colors.purple[100]};
  position: absolute;
  z-index: 10;
  top: -90px;
  padding: 15px;
`;

export const VisaLogoContainer = styled(View)`
  position: absolute;
  right: 6.5%;
  top: 12%;
`;

export const Balance = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  top: 12%;
  margin-left: 6.5%;
  font-size: 30px;
  position: absolute;
`;

export const CardNumber = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  position: absolute;
  bottom: 45%;
  margin-left: 6.5%;
  letter-spacing: 2px;
  font-weight: bold;
`;

export const CardDate = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  margin-left: 7%;
  position: absolute;
  font-weight: bold;
  font-size: 15px;
  bottom: 30%;
`;

export const CardName = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  position: absolute;
  margin-left: 7%;
  font-size: 15px;
  bottom: 16%;
  text-transform: uppercase;
`;
