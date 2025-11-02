import { Text, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components';

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

export const CategoryContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
`;

export const Category = styled(Text)<{ isDarkMode: boolean }>`
  font-family: 'NunitoSans-Bold';
  font-size: 16px;
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[200] : theme.colors.grey[600]};
`;

export const Percentage = styled(Text)`
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[100]};
`;

export const AmountContainer = styled(View)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  position: absolute;
  right: 0px;
  top: 40%;
`;

export const Amount = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'NunitoSans-Bold';
  margin-right: 20px;
`;
