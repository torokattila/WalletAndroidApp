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
  padding-top: 20%;
  padding-left: 5%;
  padding-bottom: 16%;
  align-self: flex-start;
`;

export const ScreenTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 25px;
  margin-right: 15px;
  margin-bottom: 8px;
  font-family: 'NunitoSans-Light';
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

export const MyCategoriesTitle = styled(Text)`
  font-family: 'NunitoSans-Bold';
  font-size: 20px;
  margin-top: 20px;
  margin-left: 20px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const Loader = styled(ActivityIndicator)`
  padding-top: 20%;
  align-self: center;
`;

export const ListContainer = styled(View)`
  margin-top: 60px;
  width: 100%;
  flex: 1;
`;

export const NoIncomesContainer = styled(View)`
  margin-top: 20%;
  align-self: center;
`;

export const NoIncomesText = styled(Text)`
  text-align: center;
  font-family: 'NunitoSans-Light';
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grey[600]};
`;
