import styled from 'styled-components/native';
import { View } from 'react-native';

export const ContentContainer = styled(View)`
  background-color: ${({ theme }) => theme.colors.white};
  flex: 1;
  height: 70%;
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
