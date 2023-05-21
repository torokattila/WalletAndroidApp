import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

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

export const IconContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  padding: 10px;
  border-radius: 10px;
`;

export const CategoryAndAmountContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

export const Category = styled(Text)`
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const Amount = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'NunitoSans-Bold';
`;

export const PurchaseDate = styled(Text)`
  align-self: flex-end;
  position: absolute;
  right: 20px;
  bottom: 10px;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;
