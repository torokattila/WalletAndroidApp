import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const Background = styled(View)`
  background-color: #00000070;
  height: 100%;
  width: 100%;
`;

export const ContentContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const Content = styled(View)`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white[100]};
  align-items: center;
  justify-content: space-around;
  width: 90%;
  padding: 20px 10px;
`;

export const TextContainer = styled(View)`
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Title = styled(Text)`
  text-align: left;
  margin-bottom: 10px;
  font-size: 20px;
  font-family: 'NunitoSans-SemiBold';
`;

export const Description = styled(Text)`
  font-size: 15px;
`;

export const PrimaryButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.red};
  width: 70%;
  border-radius: 25px;
  padding: 10px;
  margin-top: 50px;
`;

export const PrimaryButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  text-align: center;
  font-size: 17px;
`;

export const SecondaryButton = styled(TouchableOpacity)`
  padding: 8px;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.black};
  width: 70%;
  border-radius: 25px;
  margin-top: 15px;
`;

export const SecondaryButtonText = styled(Text)`
  text-align: center;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.black};
`;
