import { Button } from '@components/shared';
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const Container = styled(View)<ViewProps & { isDarkMode?: boolean }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white[100]};
`;

export const scrollViewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  justifyContent: 'center',
};

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const WelcomeAndAmountText = styled(View)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 12%;
  width: 100%;
  padding-left: 7%;
`;

export const WelcomeText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 25px;
  align-self: flex-start;
  padding-top: 15%;
  font-family: 'NunitoSans-Light';
`;

export const BalanceContainer = styled(View)`
  align-self: flex-start;
  margin-top: -2%;
`;

export const BalanceTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  opacity: 0.6;
  font-size: 15px;
`;

export const Balance = styled(Text)`
  font-size: 17px;
  font-family: 'NunitoSans-SemiBold';
  color: ${({ theme }) => theme.colors.grey[200]};
`;

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[200]};
  align-self: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  flex: 1;
  margin-top: -9%;
  height: 10%;
  padding: 20px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: relative;
`;

export const MonthlyStatementAndDateSelectorContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const MonthlyStatementTitle = styled(Text)`
  font-size: 20px;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.purple[300]};
  align-self: flex-start;
`;

export const DateSelectorButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple[300]};
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 20px;
`;

export const DateSelectorText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-family: 'NunitoSans-Bold';
  font-size: 15px;
  text-transform: capitalize;
`;

export const PieChartContainer = styled(View)`
  width: 100%;
  flex: 1;
  margin-top: -3%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PieChartCenterAmount = styled(Text)`
  font-size: 16px;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.purple[300]};
`;

export const NoLastFivePurchasesContainer = styled(View)`
  margin-top: 15%;
  align-self: center;
`;

export const NoLastFivePurchasesText = styled(Text)`
  text-align: center;
  font-family: 'NunitoSans-Regular';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const RedirectToPurchasesButton = styled(Button)`
  margin-top: 8%;
  padding: 15px 40px;
`;

export const ListContainer = styled(View)`
  margin-top: 5px;
  width: 100%;
  flex-grow: 1;
  max-height: 100%;
  flex: 1;
`;

export const Loader = styled(ActivityIndicator)`
  padding-top: 20%;
  align-self: center;
`;
