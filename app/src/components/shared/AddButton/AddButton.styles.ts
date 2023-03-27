import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Icon } from '../Icon';

export const StyledButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  position: absolute;
  padding: 12px;
  border-radius: 30px;
  bottom: 12%;
  right: 50px;
`;

export const StyledIcon = styled(Icon)``;
