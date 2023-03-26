import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';

export const SignOutButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 25px;
`;

export const SignOutButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white};
`;
