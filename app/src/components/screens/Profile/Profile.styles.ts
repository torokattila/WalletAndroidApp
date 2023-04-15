import styled from 'styled-components/native';
import { ScrollView, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from '@components/shared';

export const Container = styled(View)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.white[100]};
`;

export const scrollViewStyle: StyleProp<ViewStyle> = {
  flexGrow: 1,
  alignItems: 'center',
  paddingBottom: 70,
};

export const keyboardAvoidingContainerStyle: StyleProp<ViewStyle> = {
  gap: 30,
};

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
  margin-bottom: 12%;
  align-self: flex-start;
`;

export const ScreenTitleText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  font-size: 25px;
  margin-right: 15px;
  font-family: 'NunitoSans-Light';
`;

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white[200]};
  align-self: center;
  flex-direction: column;
  width: 100%;
  flex: 1;
  margin-top: 5%;
  height: 10%;
  padding: 10px;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: relative;
`;

export const ImageContainer = styled(View)`
  position: absolute;
  border-radius: 100px;
  width: 110px;
  height: 110px;
  background-color: ${({ theme }) => theme.colors.white[200]};
  align-self: center;
  top: -8.5%;
  border-width: 6px;
  border-color: ${({ theme }) => theme.colors.white[200]};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const NameEmailContainer = styled(View)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 12%;
`;

export const Name = styled(Text)`
  font-family: 'NunitoSans-Bold';
  font-size: 20px;
`;

export const Email = styled(Text)``;

export const OptionsContainer = styled(ScrollView)`
  flex: 1;
  margin-top: 40px;
`;

export const OptionCard = styled(TouchableOpacity)`
  width: 90%;
  padding: 15px;
  background-color: ${({ theme }) => theme.colors.white[100]};
  border-radius: 12px;
  margin-top: 20px;
  margin-left: 5px;
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const OptionCardTitle = styled(Text)`
  font-family: 'NunitoSans-SemiBold';
`;

export const StyledIcon = styled(Icon)`
  margin-right: 15px;
`;
