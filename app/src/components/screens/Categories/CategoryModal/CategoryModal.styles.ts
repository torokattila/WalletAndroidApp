import { Button } from '@components/shared';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';

export const UpperLine = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ isDarkMode, theme }) => (isDarkMode ? theme.colors.white[100] : 'silver')};
  margin-top: 5px;
  height: 3px;
  width: 50px;
  align-self: center;
`;

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[800] : theme.colors.white[100]};
  flex: 1;
  height: 90%;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

export const Content = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 30px;
  position: relative;
`;

export const Title = styled(Text)<{ isDarkMode: boolean }>`
  text-align: center;
  font-size: 17px;
  font-family: 'NunitoSans-ExtraBold';
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[600]};
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

export const StyledTextInput = styled(TextInput)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[900] : theme.colors.grey[200]};
  border-radius: 30px;
  padding-left: 20px;
  padding-right: 20px;
  font-weight: bold;
  margin: 7% 15px 0px 15px;
  color: ${({ theme }) => theme.colors.magenta[100]};
`;

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 17%;
  padding: 18px;
  width: 90%;
  align-self: center;
`;

export const ColorPickerContainer = styled(View)`
  display: flex;
  margin-top: 0%;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 100px;
`;

export const ColorPickerButton = styled(Button)`
  padding: 12px 16px;
  width: 55%;
  align-self: center;
`;

export const PickColorText = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[300]};
  font-size: 20px;
  font-family: 'NunitoSans-ExtraBold';
  margin-left: 15px;
`;

export const IconPickerContainer = styled(View)`
  display: flex;
  margin-top: 0%;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
`;

export const PickIconText = styled(Text)<{ isDarkMode: boolean }>`
  color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.white[100] : theme.colors.grey[300]};
  font-size: 20px;
  font-family: 'NunitoSans-ExtraBold';
  margin-left: 15px;
`;

export const IconListContainer = styled(View)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
`;

export const CarouselContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const IconRow = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
  gap: 12px;
`;

export const PaginationContainer = styled(View)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const PaginationDot = styled(View)<{ isActive: boolean; isDarkMode: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${({ theme, isActive, isDarkMode }) =>
    isActive
      ? isDarkMode
        ? theme.colors.magenta[100]
        : theme.colors.magenta[100]
      : isDarkMode
      ? theme.colors.grey[100]
      : theme.colors.grey[300]};
  opacity: ${({ isActive }) => (isActive ? 1 : 0.5)};
`;
