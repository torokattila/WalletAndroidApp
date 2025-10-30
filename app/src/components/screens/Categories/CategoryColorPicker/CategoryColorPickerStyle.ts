import { Button } from '@components/shared';
import { View } from 'react-native';
import styled from 'styled-components/native';

export const ContentContainer = styled(View)<{ isDarkMode: boolean }>`
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.grey[400] : theme.colors.white[100]};
  flex: 1;
  height: 85%;
  width: 100%;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  position: absolute;
  bottom: 0;
  padding: 20px;
`;

export const SwatchesContainer = styled(View)`
  align-self: center;
  height: 20%;
  width: 80%;
`;

export const StyledButton = styled(Button)`
  position: absolute;
  bottom: 5%;
  padding: 15px;
  width: 50%;
  align-self: center;
  text-transform: uppercase;
`;
