import styled from 'styled-components/native';
import { Dimensions, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { Button } from '@components/shared';
import { theme as Theme } from '@styles/theme';

const screenWidth = Dimensions.get('screen').width;

export type StyledTextInputProps = TextInputProps & {
  hasError: boolean;
};

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white[100]};
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

export const FormContainer = styled(View)`
  margin-top: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const InputContainer = styled(View)`
  flex-direction: column;
`;

export const Label = styled(Text)`
  margin: 15px 0px 10px 15px;
  font-family: 'NunitoSans-Bold';
`;

export const StyledTextInput = styled(TextInput)<StyledTextInputProps>`
  border-width: 2px;
  border-color: ${({ hasError, theme }) =>
    hasError ? theme.colors.red : theme.colors.purple[100]};
  width: ${() => screenWidth - 100}px;
  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
  color: ${({ theme }) => theme.colors.purple[100]};
  font-family: 'NunitoSans-Bold';
`;

export const StyledIconButton = styled(TouchableOpacity)`
  position: absolute;
  padding: 10px 20px;
  right: 0px;
  bottom: 5px;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 18%;
  padding: 18px;
  width: 90%;
  align-self: center;
`;

export const shadow = {
  elevation: 8,
  shadowColor: Theme.colors.black,
  shadowOffset: { width: -8, height: 20 },
  shadowOpacity: 0.6,
  shadowRadius: 35,
};

export const buttonShadow = {
  elevation: 10,
  shadowColor: Theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};
