import React, { FC } from 'react';
import { theme } from '@styles/theme';
import { Icon } from '../Icon';
import { Number, NumberButton, NumberColumn, NumbersContainer } from './ModalNumberKeyboard.styles';

type ModalNumberKeyboardProps = {
  onNumberChange: (value: string) => void;
  onBackspacePress: () => void;
};

export const ModalNumberKeyboard: FC<ModalNumberKeyboardProps> = ({
  onNumberChange,
  onBackspacePress,
}) => (
  <NumbersContainer>
    <NumberColumn>
      <NumberButton onPress={() => onNumberChange('1')}>
        <Number>1</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('4')}>
        <Number>4</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('7')}>
        <Number>7</Number>
      </NumberButton>
      <NumberButton />
    </NumberColumn>

    <NumberColumn>
      <NumberButton onPress={() => onNumberChange('2')}>
        <Number>2</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('5')}>
        <Number>5</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('8')}>
        <Number>8</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('0')}>
        <Number>0</Number>
      </NumberButton>
    </NumberColumn>

    <NumberColumn>
      <NumberButton onPress={() => onNumberChange('3')}>
        <Number>3</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('6')}>
        <Number>6</Number>
      </NumberButton>
      <NumberButton onPress={() => onNumberChange('9')}>
        <Number>9</Number>
      </NumberButton>
      <NumberButton onPress={onBackspacePress}>
        <Icon type="backspace" iconColor={theme.colors.grey[100]} />
      </NumberButton>
    </NumberColumn>
  </NumbersContainer>
);
