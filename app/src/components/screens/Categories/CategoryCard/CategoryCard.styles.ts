import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';

export const Container = styled(TouchableOpacity)<{ isDarkMode: boolean }>`
  width: 95%;
  padding: 15px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[900] : theme.colors.white[100]};
  border-radius: 14px;
  margin-top: 15px;
  margin-left: 5px;
  flex-direction: row;
  align-items: center;
  position: relative;
`;

export const IconContainer = styled(View)<{ isDarkMode: boolean; color?: string }>`
  background-color: ${({ theme, isDarkMode, color }) => {
    if (color) {
      return color;
    }
    return isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100];
  }};
  padding: 10px;
  border-radius: 10px;
`;

export const TitleAndAmountContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

export const Title = styled(Text)<{ isDarkMode: boolean }>`
  font-family: 'NunitoSans-Bold';
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[600]};
`;
