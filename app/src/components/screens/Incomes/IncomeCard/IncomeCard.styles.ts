import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';

export const Container = styled(TouchableOpacity)<{ isDarkMode: boolean }>`
  width: 95%;
  padding: 15px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[500] : theme.colors.white[100]};
  border-radius: 14px;
  margin-top: 15px;
  margin-left: 5px;
  flex-direction: row;
  position: relative;
`;

export const IconContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  padding: 10px;
  border-radius: 10px;
`;

export const TitleAndAmountContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

export const Title = styled(Text)`
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const Amount = styled(Text)`
  color: ${({ theme }) => theme.colors.green[400]};
  font-family: 'NunitoSans-Bold';
`;

export const IncomeDate = styled(Text)`
  align-self: flex-end;
  position: absolute;
  right: 20px;
  bottom: 10px;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;
