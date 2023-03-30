import React, { FC, useState } from 'react';
import i18n from 'i18n-js';
import {
  KeyboardAvoidingView,
  Modal,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import { theme } from '@styles/theme';
import { ModalBackground, ModalNumberKeyboard } from '@components/shared';
import {
  Content,
  ContentContainer,
  InputNumberText,
  StyledButton,
  StyledButtonText,
  StyledTextInput,
  Title,
  UpperLine,
} from './IncomeModal.styles';

type IncomeModalProps = {
  isVisible: boolean;
  onSave: () => void;
  onClose: () => void;
};

const shadow = {
  elevation: 8,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -8, height: 20 },
  shadowOpacity: 0.6,
  shadowRadius: 35,
};

const buttonShadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const IncomeModal: FC<IncomeModalProps> = ({ isVisible, onClose }) => {
  const [inputNumber, setInputNumber] = useState<string>('0');
  const [incomeTitle, setIncomeTitle] = useState<string>('');
  // eslint-disable-next-line curly
  if (!isVisible) return null;

  const handleNumberChange = (value: string) => {
    let newInputNumber = '';

    if (inputNumber === '0') {
      newInputNumber = '' + value;
    } else {
      newInputNumber = inputNumber + value;
    }

    setInputNumber(newInputNumber);
  };

  const handleBackspacePress = () => {
    if (inputNumber.length <= 1) {
      setInputNumber('0');
    } else {
      setInputNumber(inputNumber.slice(0, -1));
    }
  };

  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal
        animationType="slide"
        transparent
        visible={isVisible}
        onRequestClose={onClose}
        animated
      >
        <ModalBackground onHide={onClose} isVisible={isVisible} />
        <ContentContainer style={shadow}>
          <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="position" enabled>
            <UpperLine />
            <Content>
              <Title>{i18n.t('NewModal.Incomes.Title')}</Title>
              <InputNumberText>{`${inputNumber} Ft`}</InputNumberText>
              <StyledTextInput
                value={incomeTitle}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setIncomeTitle(e.nativeEvent.text)
                }
                placeholder={i18n.t('NewModal.Incomes.TitleInputPlaceholder')}
              />

              <ModalNumberKeyboard
                onNumberChange={handleNumberChange}
                onBackspacePress={handleBackspacePress}
              />

              <StyledButton style={buttonShadow}>
                <StyledButtonText>{i18n.t('SaveButtonTitle')}</StyledButtonText>
              </StyledButton>
            </Content>
          </KeyboardAvoidingView>
        </ContentContainer>
      </Modal>
    </GestureRecognizer>
  );
};
