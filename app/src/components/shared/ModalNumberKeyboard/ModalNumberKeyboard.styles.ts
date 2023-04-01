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
`;

export const NumberButton = styled(TouchableOpacity)`
  padding: 15px;
`;

export const Number = styled(Text)`
  font-size: 25px;
`;
