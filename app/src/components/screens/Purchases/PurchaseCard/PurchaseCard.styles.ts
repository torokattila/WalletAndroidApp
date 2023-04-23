import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 95%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.white[100]};
  border-radius: 14px;
  margin-top: 15px;
  margin-left: 5px;
  flex-direction: row;
  position: relative;
`;

export const IconContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  padding: 10px;
  border-radius: 10px;
`;
