import React, { FC } from 'react';
import { theme } from '@styles/theme';
import { Icon } from '../Icon';
import { Number, NumberButton, NumberColumn, NumbersContainer } from './ModalNumberKeyboard.styles';
import { useDarkMode } from '@hooks/useDarkMode';

type ModalNumberKeyboardProps = {
  onNumberChange: (value: string) => void;
  onBackspacePress: () => void;
};

export const ModalNumberKeyboard: FC<ModalNumberKeyboardProps> = ({
  onNumberChange,
  onBackspacePress,
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <NumbersContainer>
      <NumberColumn>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('1')}>
          <Number isDarkMode={isDarkMode}>1</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('4')}>
          <Number isDarkMode={isDarkMode}>4</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('7')}>
          <Number isDarkMode={isDarkMode}>7</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} isEmpty />
      </NumberColumn>

      <NumberColumn>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('2')}>
          <Number isDarkMode={isDarkMode}>2</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('5')}>
          <Number isDarkMode={isDarkMode}>5</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('8')}>
          <Number isDarkMode={isDarkMode}>8</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('0')}>
          <Number isDarkMode={isDarkMode}>0</Number>
        </NumberButton>
      </NumberColumn>

      <NumberColumn>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('3')}>
          <Number isDarkMode={isDarkMode}>3</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('6')}>
          <Number isDarkMode={isDarkMode}>6</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={() => onNumberChange('9')}>
          <Number isDarkMode={isDarkMode}>9</Number>
        </NumberButton>
        <NumberButton isDarkMode={isDarkMode} onPress={onBackspacePress}>
          <Icon
            type="backspace"
            iconColor={isDarkMode ? theme.colors.white[100] : theme.colors.grey[100]}
          />
        </NumberButton>
      </NumberColumn>
    </NumbersContainer>
  );
};
