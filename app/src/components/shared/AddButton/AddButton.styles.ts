import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from '../Icon';

export const StyledButton = styled(TouchableOpacity)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  position: absolute;
  padding: 12px;
  border-radius: 30px;
  bottom: 12%;
  right: 50px;
`;

export const StyledIcon = styled(Icon)``;
