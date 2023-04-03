import { Text, View } from 'react-native';
import styled from 'styled-components/native';

export const Background = styled(View)`
  background-color: #00000070;
  height: 100%;
  width: 100%;
`;

export const ContentContainer = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

export const Content = styled(View)`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.white};
  align-items: center;
  justify-content: space-around;
  width: 90%;
  padding: 20px 10px;
`;

export const TextContainer = styled(View)`
  margin-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const Title = styled(Text)`
  text-align: left;
  margin-bottom: 10px;
`;

export const Description = styled(Text)`
  text-align: left;
`;
