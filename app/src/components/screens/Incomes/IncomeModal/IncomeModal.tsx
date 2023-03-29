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
import { ModalBackground } from '@components/shared';
import {
  Content,
  ContentContainer,
  InputNumberText,
  Number,
  NumberButton,
  NumberRow,
  NumbersContainer,
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

              <NumbersContainer>
                <NumberRow>
                  <NumberButton>
                    <Number>1</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number>2</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number>3</Number>
                  </NumberButton>
                </NumberRow>

                <NumberRow>
                  <NumberButton>
                    <Number>4</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number>5</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number>6</Number>
                  </NumberButton>
                </NumberRow>

                <NumberRow>
                  <NumberButton>
                    <Number>7</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number>8</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number>9</Number>
                  </NumberButton>
                </NumberRow>

                <NumberRow>
                  <NumberButton />
                  <NumberButton>
                    <Number>0</Number>
                  </NumberButton>
                  <NumberButton>
                    <Number />
                  </NumberButton>
                </NumberRow>
              </NumbersContainer>

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
