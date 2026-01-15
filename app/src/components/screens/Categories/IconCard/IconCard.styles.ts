import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const IconContainer = styled(TouchableOpacity)<{
  isDarkMode: boolean;
  color?: string;
  isSelected?: boolean;
}>`
  background-color: ${({ theme, isDarkMode }) => {
    return isDarkMode ? theme.colors.grey[900] : theme.colors.white[100];
  }};
  padding: 12px;
  border-radius: 10px;
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 10px;
  border-width: ${({ isSelected }) => (isSelected ? '3px' : '0px')};
  border-color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.magenta[100] : 'transparent'};
`;
