import React, { FC } from 'react';
import i18n from 'i18n-js';
import GestureRecognizer from 'react-native-swipe-detect';
import { KeyboardAvoidingView, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import { Icon, ModalBackground } from '@components/shared';
import {
  Content,
  ContentContainer,
  DeleteIconContainer,
  DropdownContainer,
  Title,
  UpperLine,
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

export const PurchaseModal: FC<PurchaseModalProps> = ({
  isVisible,
  onClose,
  purchase,
  isEditMode,
}) => {
  const {
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    categories,
    setCategories,
    category,
    setCategory,
  } = usePurchase();

  const modalTitle = isEditMode
    ? i18n.t('Dialog.Purchases.EditPurchaseTitle')
    : i18n.t('Dialog.Purchases.Title');

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

                <DropdownContainer>
                  <DropDownPicker
                    style={shadow}
                    open={isCategoryDropdownOpen}
                    setOpen={setIsCategoryDropdownOpen}
                    multiple={false}
                    items={categories}
                    setItems={setCategories}
                    value={category}
                    setValue={setCategory}
                    placeholder={i18n.t('Purchases.ChooseCategory')}
                  />
                </DropdownContainer>
              </Content>
            </KeyboardAvoidingView>
          </ContentContainer>
        </Modal>
      </GestureRecognizer>
    </>
  );
};
