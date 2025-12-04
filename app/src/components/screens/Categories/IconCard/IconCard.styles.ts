import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

export const IconContainer = styled(TouchableOpacity)<{ isDarkMode: boolean; color?: string }>`
  background-color: ${({ theme, isDarkMode }) => {
    return isDarkMode ? theme.colors.grey[700] : theme.colors.white[100];
  }};
  padding: 12px;
  border-radius: 10px;
`;
