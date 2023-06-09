import styled from 'styled-components/native';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import { Button } from '@components/shared';
import { theme as globalTheme } from '@styles/theme';

const WIDTH = Dimensions.get('screen').width;

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  flex: 1;
  height: 75%;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

export const UpperLine = styled(View)`
  background-color: silver;
  margin-top: 5px;
  height: 3px;
  width: 50px;
  align-self: center;
`;

export const Content = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  position: relative;
`;

export const DeleteIconContainer = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.red};
  border-radius: 30px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 10px;
`;

export const Title = styled(Text)`
  text-align: center;
  font-size: 17px;
  font-family: 'NunitoSans-ExtraBold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const InputNumberText = styled(Text)<{ isDarkMode: boolean }>`
  font-size: 50px;
  margin: 20px 20px 0px 20px;
  color: ${({ theme, isDarkMode }) => (isDarkMode ? theme.colors.white[200] : theme.colors.black)};
  font-family: 'NunitoSans-Light';
`;

export const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  margin-left: 20px;
  margin-bottom: -20px;
  margin-top: 5px;
  text-align: center;
`;

export const DropdownContainer = styled(View)`
  margin-top: 2px;
`;

export const DropdownLabel = styled(Text)`
  margin-bottom: 10px;
  align-self: center;
  font-family: 'NunitoSans-Bold';
  color: ${({ theme }) => theme.colors.grey[600]};
`;

export const dropdownStyle: StyleProp<ViewStyle> = {
  borderColor: globalTheme.colors.purple[300],
  borderWidth: 1.5,
  width: WIDTH * 0.6,
  borderRadius: 12,
  alignSelf: 'center',
  paddingHorizontal: 15,
  paddingVertical: 3,
};

export const dropdownContainerStyle: StyleProp<ViewStyle> = {
  borderColor: globalTheme.colors.purple[300],
  borderWidth: 1.5,
  borderRadius: 12,
  width: WIDTH * 0.6,
  alignSelf: 'center',
  zIndex: 99,
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

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 18%;
  padding: 18px;
  width: 90%;
  align-self: center;
`;
