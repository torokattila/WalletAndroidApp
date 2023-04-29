import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white[100]};
`;

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ScreenTitleContainer = styled(View)`
  align-items: center;
  flex-direction: row;
  padding-top: 7%;
  padding-left: 5%;
  align-self: flex-start;
`;

export const ScreenTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 25px;
  margin-right: 15px;
  font-family: 'NunitoSans-Light';
`;

export const BalanceContainer = styled(View)`
  align-self: flex-start;
  padding-left: 5%;
  margin-top: 25px;
`;

export const BalanceTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  opacity: 0.6;
  font-size: 15px;
`;

export const Balance = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 30px;
`;

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white[200]};
  align-self: center;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  margin-top: 5%;
  height: 10%;
  padding: 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: relative;
`;

export const AllIncomeTitle = styled(Text)`
  font-family: 'NunitoSans-Bold';
  font-size: 20px;
  margin-top: 20px;
  margin-left: 20px;
`;

export const DatePickerContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  margin-top: 15px;
  position: relative;
`;

export const DatePickerButtonContainer = styled(View)`
  flex-direction: column;
`;

export const DatePickerButtonLabel = styled(Text)`
  margin-left: 6px;
`;

export const DatePickerButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.purple[300]};
  border-radius: 10px;
  padding: 5px 20px;
  margin-right: 20px;
`;

export const DatePickerText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-family: 'NunitoSans-Bold';
`;

export const DeleteFiltersButton = styled(TouchableOpacity)`
  width: 35px;
  height: 35px;
  border-color: ${({ theme }) => theme.colors.purple[300]};
  border-width: 2px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  bottom: -8px;
  margin-right: 10px;
`;

export const DownloadButton = styled(TouchableOpacity)`
  width: 35px;
  height: 35px;
  border-color: ${({ theme }) => theme.colors.purple[300]};
  border-width: 2px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  bottom: -8px;
`;

export const ListContainer = styled(View)`
  margin-top: 30px;
  width: 100%;
  flex: 1;
`;
