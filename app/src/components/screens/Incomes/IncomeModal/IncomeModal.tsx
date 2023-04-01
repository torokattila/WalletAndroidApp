/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
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
import { useIncome } from '@hooks/useIncome';
import {
  Content,
  ContentContainer,
  InputNumberErrorText,
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
  const { amount, setAmount, title, setTitle, handleCreateIncome, errors, setErrors, isLoading } =
    useIncome();

  useEffect(() => {
    if (!isLoading) {
      onClose();
    }
  }, [isLoading]);

  useEffect(() => {
    setErrors({});
  }, [onClose]);

  const handleNumberChange = (value: string) => {
    let newInputNumber = '';

    if (amount === '0') {
      newInputNumber = '' + value;
    } else {
      newInputNumber = amount + value;
    }

    setAmount(newInputNumber);
  };

  const handleBackspacePress = () => {
    if (amount.length <= 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

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
              <InputNumberText
                numberOfLines={1}
                ellipsizeMode="head"
              >{`${amount} Ft`}</InputNumberText>
              {errors.amount && <InputNumberErrorText>{errors.amount}</InputNumberErrorText>}
              <StyledTextInput
                value={title}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setTitle(e.nativeEvent.text)
                }
                placeholder={i18n.t('NewModal.Incomes.TitleInputPlaceholder')}
              />

              <ModalNumberKeyboard
                onNumberChange={handleNumberChange}
                onBackspacePress={handleBackspacePress}
              />

              <StyledButton style={buttonShadow} onPress={handleCreateIncome}>
                <StyledButtonText>{i18n.t('SaveButtonTitle')}</StyledButtonText>
              </StyledButton>
            </Content>
          </KeyboardAvoidingView>
        </ContentContainer>
      </Modal>
    </GestureRecognizer>
  );
};
