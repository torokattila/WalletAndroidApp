import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[800] : theme.colors.white[100]};
  flex: 1;
  height: 70%;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

export const UpperLine = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) => (isDarkMode ? theme.colors.white[100] : 'silver')};
  margin-top: 5px;
  height: 3px;
  width: 50px;
  align-self: center;
`;

export const DragHandleArea = styled(View)`
  width: 100%;
  padding-bottom: 4px;
`;

export const ChartTitle = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[400]};
  font-family: 'NunitoSans-Bold';
  font-size: 18px;
  margin-top: 25px;
  text-align: center;
`;

export const ChartSubTitle = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[100] : theme.colors.grey[300]};
  font-family: 'NunitoSans-Regular';
  font-size: 12px;
  margin-top: 4px;
  margin-bottom: 25px;
  text-align: center;
`;

export const LoaderWrapper = styled(View)`
  height: 200px;
  justify-content: center;
  align-items: center;
`;

export const TooltipBox = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[900] : theme.colors.white[200]};
  border-radius: 8px;
  padding: 8px 12px;
  border-left-width: 4px;
  border-left-color: ${({ theme }) => theme.colors.magenta[100]};
`;

export const TooltipMonthLabel = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[100] : theme.colors.grey[300]};
  font-family: 'NunitoSans-Regular';
  font-size: 12px;
`;

export const TooltipAmountText = styled(Text)`
  color: ${({ theme }) => theme.colors.magenta[100]};
  font-family: 'NunitoSans-Bold';
  font-size: 14px;
`;
