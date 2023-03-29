import styled from 'styled-components/native';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  height: 75%;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

export const UpperLine = styled(View)`
  background-color: silver;
  margin-top: 5px;
  height: 3px;
  width: 50px;
  align-self: center;
`;

export const Content = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  position: relative;
`;

export const Title = styled(Text)`
  text-align: center;
  font-size: 17px;
  font-family: 'NunitoSans-ExtraBold';
`;

export const InputNumberText = styled(Text)`
  font-size: 50px;
  margin: 20px;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'NunitoSans-Light';
`;

export const StyledTextInput = styled(TextInput)`
  background-color: ${({ theme }) => theme.colors.grey[200]};
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  margin-right: 15px;
  margin-left: 15px;
`;

export const NumbersContainer = styled(View)`
  margin-top: 25px;
  flex-direction: column;
`;

export const NumberRow = styled(View)`
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 5px;
`;

export const NumberButton = styled(TouchableOpacity)`
  padding: 10px;
`;

export const Number = styled(Text)`
  font-size: 25px;
`;

export const StyledButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 18%;
  border-radius: 30px;
  padding: 18px;
  width: 90%;
  align-self: center;
  background-color: ${({ theme }) => theme.colors.purple[100]};
`;

export const StyledButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
  font-size: 17px;
  text-align: center;
`;
