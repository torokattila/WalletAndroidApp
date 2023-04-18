import styled from 'styled-components/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { Button } from '@components/shared';

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
  margin-top: 30px;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 18%;
  padding: 18px;
  width: 90%;
  align-self: center;
`;
