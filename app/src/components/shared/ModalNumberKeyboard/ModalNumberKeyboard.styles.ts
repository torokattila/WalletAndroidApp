import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';

export const NumbersContainer = styled(View)`
  margin-top: 15px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-start;
`;

export const NumberColumn = styled(View)`
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const NumberButton = styled(TouchableOpacity)<{ isEmpty?: boolean; isDarkMode: boolean }>`
  padding: 10px 18px;
  border-width: ${({ isEmpty }) => (isEmpty ? '0' : '3')}px;
  border-radius: 25px;
  border-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[600]};
`;

export const Number = styled(Text)<{ isDarkMode: boolean }>`
  font-size: 25px;
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[600]};
  font-family: 'NunitoSans-SemiBold';
`;
