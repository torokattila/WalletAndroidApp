/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect } from 'react';
import i18n from 'i18n-js';
import GestureRecognizer from 'react-native-swipe-detect';
import { Dropdown } from 'react-native-element-dropdown';
import { KeyboardAvoidingView, Modal } from 'react-native';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import { ConfirmDialog, Icon, ModalBackground, ModalNumberKeyboard } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import { usePurchase } from '@hooks/usePurchase';
import {
  Content,
  ContentContainer,
  DeleteIconContainer,
  DropdownContainer,
  Title,
  UpperLine,
  dropdownContainerStyle,
  dropdownTextStyle,
  dropdownStyle,
  DropdownLabel,
  InputNumberText,
  StyledButton,
  dropdownItemContaineStyle,
  ErrorText,
  selectedTextStyle,
} from './PurchaseModal.styles';

type PurchaseModalProps = {
  isVisible: boolean;
  onClose: () => void;
  purchase?: Purchase;
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

export const PurchaseModal: FC<PurchaseModalProps> = ({
  isVisible,
  onClose,
  isEditMode,
  purchase,
}) => {
  const { isDarkMode } = useDarkMode();
  const {
    amount,
    categories,
    category,
    isLoading,
    handleDropdownChange,
    handleCreatePurchase,
    handleUpdatePurchase,
    errors,
    setErrors,
    isConfirmDialogOpen,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
    handleNumberChange,
    handleBackspacePress,
  } = usePurchase(purchase);

  const modalTitle = isEditMode
    ? i18n.t('Dialog.Purchases.EditPurchaseTitle')
    : i18n.t('Dialog.Purchases.Title');
  const dropdownPlaceholder = category
    ? i18n.t(`Purchases.Categories.${category}`)
    : i18n.t('Purchases.ChooseCategory');

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
          <ContentContainer style={shadow} isDarkMode={isDarkMode}>
            <KeyboardAvoidingView keyboardVerticalOffset={10} behavior="position" enabled>
              <UpperLine />
              {isEditMode && (
                <DeleteIconContainer onPress={handleConfirmDialogOpen}>
                  <Icon type="trash" iconColor={theme.colors.white[100]} />
                </DeleteIconContainer>
              )}

              <Content>
                <Title>{modalTitle}</Title>

                {errors.amount && <ErrorText>{errors.amount}</ErrorText>}
                <InputNumberText numberOfLines={1} ellipsizeMode="head" isDarkMode={isDarkMode}>
                  {amount} Ft
                </InputNumberText>

                <DropdownContainer>
                  <DropdownLabel>{i18n.t('Dialog.Purchases.Category')}</DropdownLabel>
                  <Dropdown
                    style={[
                      shadow,
                      dropdownStyle,
                      {
                        backgroundColor: isDarkMode
                          ? theme.colors.grey[500]
                          : theme.colors.white[100],
                      },
                    ]}
                    data={categories}
                    value={category}
                    placeholder={dropdownPlaceholder}
                    placeholderStyle={{
                      color: theme.colors.grey[600],
                    }}
                    containerStyle={[
                      !isDarkMode && shadow,
                      dropdownContainerStyle,
                      {
                        backgroundColor: isDarkMode
                          ? theme.colors.grey[500]
                          : theme.colors.white[100],
                      },
                    ]}
                    itemTextStyle={dropdownTextStyle}
                    itemContainerStyle={[dropdownItemContaineStyle]}
                    labelField={'label'}
                    valueField={'value'}
                    onChange={handleDropdownChange}
                    selectedTextStyle={selectedTextStyle}
                    activeColor={isDarkMode ? theme.colors.grey[700] : theme.colors.grey[200]}
                    mode="modal"
                  />
                  {errors.category && <ErrorText>{errors.category}</ErrorText>}
                </DropdownContainer>

                <ModalNumberKeyboard
                  onNumberChange={handleNumberChange}
                  onBackspacePress={handleBackspacePress}
                />

                <StyledButton
                  size="large"
                  style={!isDarkMode && buttonShadow}
                  onPress={isEditMode ? handleUpdatePurchase : handleCreatePurchase}
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
