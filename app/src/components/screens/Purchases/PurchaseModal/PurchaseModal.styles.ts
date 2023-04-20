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
4;
import { theme as globalTheme } from '@styles/theme';

const WIDTH = Dimensions.get('screen').width;

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white[100]};
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
`;

export const InputNumberText = styled(Text)`
  font-size: 50px;
  margin: 20px 20px 0px 20px;
  color: ${({ theme }) => theme.colors.black};
  font-family: 'NunitoSans-Light';
`;

export const InputNumberErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.red};
  margin-left: 20px;
`;

export const DropdownContainer = styled(View)`
  margin-top: 2px;
`;

export const DropdownLabel = styled(Text)`
  margin-bottom: 10px;
  align-self: center;
  font-family: 'NunitoSans-Bold';
`;

export const dropdownStyle: StyleProp<ViewStyle> = {
  borderColor: '#8E65F7',
  borderWidth: 1.5,
  width: WIDTH * 0.6,
  borderRadius: 12,
  alignSelf: 'center',
  backgroundColor: globalTheme.colors.white[100],
  paddingHorizontal: 15,
  paddingVertical: 3,
};

export const dropdownContainerStyle: StyleProp<ViewStyle> = {
  borderColor: '#8E65F7',
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
  color: '#8E65F7',
};

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 18%;
  padding: 18px;
  width: 90%;
  align-self: center;
`;
