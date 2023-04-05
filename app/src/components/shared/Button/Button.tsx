import React, { FC } from 'react';
import { theme } from '@styles/theme';
import { ButtonText, Loader, StyledButton } from './Button.styles';

type ButtonProps = {
  text: string;
  onPress: () => void;
  disabled?: boolean;
  withActivityIndicator?: boolean;
  isLoading?: boolean;
  size?: 'small' | 'large';
};

const shadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Button: FC<ButtonProps> = ({
  text,
  onPress,
  disabled = false,
  withActivityIndicator = false,
  isLoading = false,
  size,
  ...props
}) => (
  <StyledButton
    size={size}
    style={shadow}
    onPress={disabled ? () => {} : onPress}
    disabled={disabled}
    {...props}
  >
    {withActivityIndicator && isLoading && <Loader color="white" />}
    <ButtonText>{text}</ButtonText>
  </StyledButton>
);
