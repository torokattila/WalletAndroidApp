import React, { FC } from 'react';
import i18n from 'i18n-js';
import GestureRecognizer from 'react-native-swipe-detect';
import { KeyboardAvoidingView, Modal } from 'react-native';
import { Purchase } from '@model/domain';
import { Dropdown } from 'react-native-element-dropdown';
import { theme } from '@styles/theme';
import { Icon, ModalBackground, ModalNumberKeyboard } from '@components/shared';
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
} from './PurchaseModal.styles';
import { usePurchase } from '@hooks/usePurchase';

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

export const PurchaseModal: FC<PurchaseModalProps> = ({ isVisible, onClose, isEditMode }) => {
  const { amount, setAmount, categories, category, isLoading, handleDropdownChange } =
    usePurchase();

  const modalTitle = isEditMode
    ? i18n.t('Dialog.Purchases.EditPurchaseTitle')
    : i18n.t('Dialog.Purchases.Title');
  const dropdownPlaceholder = category
    ? i18n.t(`Purchases.Categories.${category}`)
    : i18n.t('Purchases.ChooseCategory');

  const handleNumberChange = (value: string): void => {
    let newInputNumber = '';

    if (amount === '0') {
      newInputNumber = '' + value;
    } else {
      newInputNumber = amount + value;
    }

    setAmount(newInputNumber);
  };

  const handleBackspacePress = (): void => {
    if (amount.length <= 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

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
                <DeleteIconContainer onPress={() => {}}>
                  <Icon type="trash" iconColor={theme.colors.white[100]} />
                </DeleteIconContainer>
              )}

              <Content>
                <Title>{modalTitle}</Title>

                <InputNumberText numberOfLines={1} ellipsizeMode="head">
                  {amount} Ft
                </InputNumberText>

                <DropdownContainer>
                  <DropdownLabel>{i18n.t('Dialog.Purchases.Category')}</DropdownLabel>
                  <Dropdown
                    style={[shadow, dropdownStyle]}
                    data={categories}
                    value={category}
                    placeholder={dropdownPlaceholder}
                    containerStyle={[shadow, dropdownContainerStyle]}
                    itemTextStyle={dropdownTextStyle}
                    itemContainerStyle={dropdownItemContaineStyle}
                    labelField={'label'}
                    valueField={'value'}
                    onChange={handleDropdownChange}
                    mode="modal"
                  />
                </DropdownContainer>

                <ModalNumberKeyboard
                  onNumberChange={handleNumberChange}
                  onBackspacePress={handleBackspacePress}
                />

                <StyledButton
                  size="large"
                  style={buttonShadow}
                  onPress={() => {}}
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
    </>
  );
};
