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

export const IconContainer = styled(View)<{ isDarkMode: boolean; categoryColor?: string }>`
  background-color: ${({ theme, isDarkMode, categoryColor }) => {
    if (categoryColor) {
      return categoryColor;
    }
    return isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100];
  }};
  padding: 7px;
  border-radius: 10px;
`;

export const CategoriesContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

export const Category = styled(Text)<{ isDarkMode: boolean }>`
  font-family: 'NunitoSans-ExtraBold';
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[200] : theme.colors.grey[600]};
`;

export const SecondaryCategory = styled(Text)`
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[100]};
`;

export const AmountAndDateContainer = styled(View)`
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
  font-family: 'NunitoSans-ExtraBold';
  margin-right: 20px;
`;

export const PurchaseDate = styled(Text)`
  align-self: flex-end;
  right: 20px;
  bottom: 10px;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;
