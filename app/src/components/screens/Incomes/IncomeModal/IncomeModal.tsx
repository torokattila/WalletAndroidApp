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
import { ConfirmDialog, Icon, ModalBackground, ModalNumberKeyboard } from '@components/shared';
import { useIncome } from '@hooks/useIncome';
import { Income } from '@model/domain';
import {
  Content,
  ContentContainer,
  DeleteIconContainer,
  InputNumberErrorText,
  InputNumberText,
  StyledButton,
  StyledTextInput,
  Title,
  UpperLine,
} from './IncomeModal.styles';

type IncomeModalProps = {
  isVisible: boolean;
  onClose: () => void;
  income?: Income;
  isEditMode?: boolean;
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

export const IncomeModal: FC<IncomeModalProps> = ({ isVisible, onClose, isEditMode, income }) => {
  const {
    amount,
    title,
    setTitle,
    isConfirmDialogOpen,
    handleCreateIncome,
    handleUpdateIncome,
    errors,
    setErrors,
    isLoading,
    handleNumberChange,
    handleBackspacePress,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
  } = useIncome(income);

  const modalTitle = isEditMode
    ? i18n.t('Dialog.Incomes.EditIncomeTitle')
    : i18n.t('Dialog.Incomes.Title');

  useEffect(() => {
    if (!isLoading && !errors) {
      onClose();
    }
  }, [isLoading, errors]);

  useEffect(() => {
    setErrors({});
  }, [onClose]);

  // eslint-disable-next-line curly
  if (!isVisible) return null;

  return (
    <>
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
              {isEditMode && (
                <DeleteIconContainer onPress={handleConfirmDialogOpen}>
                  <Icon type="trash" iconColor={theme.colors.white[100]} />
                </DeleteIconContainer>
              )}
              <Content>
                <Title>{modalTitle}</Title>
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
                  placeholder={i18n.t('Dialog.Incomes.TitleInputPlaceholder')}
                />

                <ModalNumberKeyboard
                  onNumberChange={handleNumberChange}
                  onBackspacePress={handleBackspacePress}
                />

                <StyledButton
                  size="large"
                  style={buttonShadow}
                  onPress={isEditMode ? handleUpdateIncome : handleCreateIncome}
                  withActivityIndicator
                  isLoading={isLoading}
                  disabled={isLoading}
                  text={i18n.t('SaveButtonTitle')}
                />
              </Content>
            </KeyboardAvoidingView>
          </ContentContainer>
        </Modal>
      </GestureRecognizer>
      <ConfirmDialog
        isVisible={isConfirmDialogOpen}
        onPressPrimaryButton={handleConfirmDialogDelete}
        onPressSecondaryButton={handleConfirmDialogClose}
        primaryButtonText={i18n.t('Dialog.Delete')}
        secondaryButtonText={i18n.t('Dialog.Cancel')}
        title={i18n.t('Dialog.AreYouSureTitle')}
        description={i18n.t('Dialog.CannotBeUndoneTitle')}
      />
    </>
  );
};
