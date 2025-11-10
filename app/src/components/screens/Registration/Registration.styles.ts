import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleProp,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { Button } from '@components/shared';

const screenWidth = Dimensions.get('screen').width;

export type StyledTextInputProps = TextInputProps & {
  hasError: boolean;
  isDarkMode?: boolean;
};

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white[100]};
`;

export const scrollViewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  justifyContent: 'center',
  alignSelf: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBottom: 50,
};

export const StyledLinearGradient = styled(LinearGradient)`
  height: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledGradientText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 40px;
  padding-top: 15%;
  font-family: 'NunitoSans-Light';
`;

export const BottomContainer = styled(ScrollView)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  width: 100%;
  flex: 1;
  margin-top: 10%;
  height: 10%;
  padding: 20px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
`;

export const StyledImage = styled(Image)`
  width: 100px;
  height: 100px;
`;

export const StyledTitle = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  font-size: 30px;
  text-align: center;
  font-family: 'NunitoSans-Bold';
`;

export const StyledSubtitle = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  font-size: 15px;
  text-align: center;
  font-family: 'NunitoSans-Regular';
`;

export const FormContainer = styled(View)`
  margin-top: 12%;
  flex-direction: column;
`;

export const keyboardAvoidingContainerStyle: StyleProp<ViewStyle> = {
  gap: 30,
};

export const StyledTextInput = styled(TextInput)<StyledTextInputProps>`
  border-width: 2px;
  border-color: ${({ hasError, theme, isDarkMode }) =>
    hasError ? theme.colors.red : isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  width: ${() => screenWidth - 50}px;
  border-radius: 25px;
  padding-left: 20px;
  padding-right: 20px;
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  font-family: 'NunitoSans-Bold';
  background-color: ${({ isDarkMode, theme }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
`;

export const StyledIconButton = styled(TouchableOpacity)`
  position: absolute;
  padding: 10px 20px;
  right: 0px;
  top: 2px;
`;

export const StyledButton = styled(Button)`
  padding: 18px;
`;

export const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  text-align: center;
  font-family: 'NunitoSans-Bold';
  text-transform: uppercase;
  font-size: 15px;
`;

export const VerifyEmailAddressText = styled(Text)<{ isDarkMode: boolean }>`
  text-align: center;
  margin-top: 7%;
  font-family: 'NunitoSans-Light';
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
`;

export const StyledRedirectQuestionText = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]};
  font-size: 15px;
  text-align: center;
  font-family: 'NunitoSans-Regular';
  margin-top: 5%;
`;

export const StyledRedirectButton = styled(Button)`
  margin-top: 10px;
  padding: 10px 20px;
`;
