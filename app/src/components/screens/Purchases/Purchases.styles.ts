import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Dimensions,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { theme as globalTheme } from '@styles/theme';
import Animated from 'react-native-reanimated';

const WIDTH = Dimensions.get('screen').width;

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
  padding-top: 15%;
  padding-left: 5%;
  align-self: flex-start;
`;

export const ScreenTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 25px;
  margin-right: 15px;
  font-family: 'NunitoSans-Light';
`;

export const PurchasesThisMonthContainer = styled(View)`
  align-self: flex-start;
  padding-left: 5%;
  margin-top: 25px;
`;

export const PurchasesThisMonthTitle = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  opacity: 0.6;
  font-size: 15px;
`;

export const PurchasesThisMonth = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 30px;
`;

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[200]};
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

export const AllPurchasesTitle = styled(Text)`
  font-family: 'NunitoSans-Bold';
  font-size: 20px;
  margin-top: 20px;
  margin-left: 20px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const ClearFilterAndDownloadContainer = styled(View)`
  flex-direction: row;
  align-self: flex-end;
  position: absolute;
  top: 5%;
  right: 20%;
`;

export const FiltersContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  margin-top: 10px;
  position: relative;
`;

export const DateFiltersContainer = styled(Animated.View)<{ isDarkMode: boolean }>`
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.purple[300]};
  border-radius: 12px;
  padding: 8px 10px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  margin-top: 10px;
`;

export const CloseDateFiltersButton = styled(TouchableOpacity)<{ isDarkMode: boolean }>`
  border-radius: 25px;
  width: 34px;
  height: 34px;
  border-width: 1.5px;
  border-color: ${({ theme }) => theme.colors.purple[300]};
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -10px;
  top: -10px;
`;

export const CategoryAndShowDateFiltersButtonContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const ShowDateFiltersButton = styled(TouchableOpacity)<{ isDarkMode: boolean }>`
  margin-left: 20px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  border-color: ${({ theme }) => theme.colors.purple[300]};
  border-width: 1.5px;
  border-radius: 12px;
  padding: 6px 15px;
  align-self: flex-end;
`;

export const ShowDateFiltersButtonText = styled(Text)`
  font-family: 'NunitoSans-SemiBold';
  font-size: 15px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const CategoryFilterContainer = styled(View)`
  margin-top: 15px;
  flex-direction: column;
  padding-left: 20px;
`;

export const CategoryFilterLabel = styled(Text)`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const dropdownStyle: StyleProp<ViewStyle> = {
  borderColor: globalTheme.colors.purple[300],
  borderWidth: 1.5,
  borderRadius: 12,
  alignSelf: 'center',
  backgroundColor: globalTheme.colors.white[100],
  paddingHorizontal: 15,
  paddingVertical: 3,
  height: 35,
  width: WIDTH * 0.4,
};

export const dropdownContainerStyle: StyleProp<ViewStyle> = {
  borderColor: globalTheme.colors.purple[300],
  borderWidth: 1.5,
  borderRadius: 12,
  alignSelf: 'center',
  zIndex: 99,
  width: WIDTH * 0.6,
};

export const dropdownItemContaineStyle: StyleProp<ViewStyle> = {
  borderRadius: 12,
};

export const dropdownTextStyle: StyleProp<TextStyle> = {
  color: globalTheme.colors.purple[300],
};

export const selectedTextStyle: StyleProp<TextStyle> = {
  color: globalTheme.colors.grey[600],
};

export const DatePickerButtonContainer = styled(View)`
  flex-direction: column;
`;

export const DatePickerButtonLabel = styled(Text)`
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.grey[600]};
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

export const NoPurchasesContainer = styled(View)`
  margin-top: 20%;
  align-self: center;
`;

export const NoPurchasesText = styled(Text)`
  text-align: center;
  font-family: 'NunitoSans-Light';
  font-size: 18px;
`;

export const Loader = styled(ActivityIndicator)`
  padding-top: 20%;
  align-self: center;
`;
