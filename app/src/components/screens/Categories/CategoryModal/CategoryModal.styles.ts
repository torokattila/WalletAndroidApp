import { Button } from '@components/shared';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const UpperLine = styled(View)`
  background-color: silver;
  margin-top: 5px;
  height: 3px;
  width: 50px;
  align-self: center;
`;

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  flex: 1;
  height: 90%;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: absolute;
  bottom: 0;
  padding: 20px;
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
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const DeleteIconContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 30px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const StyledTextInput = styled(TextInput)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[700] : theme.colors.grey[200]};
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  margin: 7% 15px 0px 15px;
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[100] : theme.colors.grey[500]};
`;

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 17%;
  padding: 18px;
  width: 90%;
  align-self: center;
`;

export const ColorPickerContainer = styled(View)`
  display: flex;
  margin-top: 0%;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100px;
  margin-left: 15px;
`;

export const ColorPickerButton = styled(Button)`
  padding: 12px 16px;
  width: 55%;
  align-self: center;
`;
