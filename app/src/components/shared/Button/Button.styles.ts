import styled from 'styled-components/native';
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type ButtonProps = TouchableOpacityProps & {
  size?: 'small' | 'large';
};

const screenWidth = Dimensions.get('screen').width;

export const StyledButton = styled(TouchableOpacity)<ButtonProps>`
  background-color: ${({ theme }) => theme.colors.purple[100]};
  border-radius: 30px;
  width: ${({ size }) => (size === 'large' ? `${screenWidth - 50}px` : 'auto')};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Loader = styled(ActivityIndicator)`
  margin-right: 10px;
`;

export const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.colors.white[100]};
  text-align: center;
  font-family: 'NunitoSans-Bold';
  font-size: 17px;
`;
