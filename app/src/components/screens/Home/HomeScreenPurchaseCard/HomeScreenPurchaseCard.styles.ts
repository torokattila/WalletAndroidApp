import { Text, TouchableHighlight, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 160;

export const Container = styled(TouchableHighlight)<{ isDarkMode: boolean }>`
  width: ${() => CARD_WIDTH}px;
  padding: 10px 5px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[500] : theme.colors.white[100]};
  border-radius: 14px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 20px;
  flex-direction: column;
  position: relative;
`;

export const IconContainer = styled(View)<{ isDarkMode: boolean; categoryColor?: string }>`
  background-color: ${({ theme, isDarkMode, categoryColor }) => {
    if (categoryColor) {
      return categoryColor;
    }
    return isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100];
  }};
  padding: 10px;
  width: 50%;
  height: 35%;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const CategoryAndAmountContainer = styled(View)`
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  margin-top: 20px;
`;

export const Category = styled(Text)`
  font-family: 'NunitoSans-Bold';
  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grey[300]};
`;

export const SecondaryCategory = styled(Text)`
  font-family: 'NunitoSans-Bold';
  text-align: center;
  font-size: 17px;
  color: ${({ theme }) => theme.colors.grey[100]};
`;

export const Amount = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'NunitoSans-Bold';
  font-size: 20px;
  text-align: center;
`;

export const PurchaseDate = styled(Text)`
  align-self: center;
  position: relative;
  text-align: center;
  font-size: 17px;
  bottom: 10%;
  margin-top: 25%;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.purple[300]};
`;
