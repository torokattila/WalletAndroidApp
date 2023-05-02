import { Text, TouchableOpacity, View, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 150;

export const Container = styled(TouchableOpacity)`
  width: ${() => CARD_WIDTH}px;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.white[100]};
  border-radius: 14px;
  margin-top: 15px;
  margin-left: 5px;
  margin-right: 20px;
  flex-direction: column;
  position: relative;
`;

export const IconContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  padding: 10px;
  width: 65%;
  height: 45%;
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
  font-size: 20px;
  color: ${({ theme }) => theme.colors.purple[300]};
`;

export const Amount = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'NunitoSans-Bold';
  font-size: 22px;
  text-align: center;
`;

export const PurchaseDate = styled(Text)`
  align-self: center;
  position: relative;
  text-align: center;
  font-size: 20px;
  bottom: 10px;
  margin-top: 25%;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.purple[300]};
`;
