import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';

export const Container = styled(TouchableOpacity)`
  width: 95%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.white};
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

export const TitleAndAmountContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.colors.purple[100]};
  font-weight: bold;
`;

export const Amount = styled(Text)`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.green[400]};
`;

export const IncomeDate = styled(Text)`
  font-weight: bold;
  align-self: flex-end;
  position: absolute;
  right: 20px;
  bottom: 10px;
`;
