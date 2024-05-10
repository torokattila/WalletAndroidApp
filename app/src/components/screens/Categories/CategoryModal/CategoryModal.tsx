/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmDialog, Icon, ModalBackground } from '@components/shared';
import { useCategory } from '@hooks/useCategory';
import { useDarkMode } from '@hooks/useDarkMode';
import { Category } from '@model/domain';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC, useEffect } from 'react';
import { KeyboardAvoidingView, Modal } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import {
  Content,
  ContentContainer,
  DeleteIconContainer,
  StyledButton,
  StyledTextInput,
  Title,
  UpperLine,
} from './CategoryModal.styles';

type CategoryModalProps = {
  isVisible: boolean;
  onClose: () => void;
  existingCategory?: Category;
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

export const CategoryModal: FC<CategoryModalProps> = ({
  isVisible,
  onClose,
  isEditMode,
  existingCategory,
}) => {
  const { isDarkMode } = useDarkMode();
  const {
    isLoading,
    handleCreateCategory,
    handleUpdateCategory,
    errors,
    setErrors,
    isConfirmDialogOpen,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
    title,
    handleTitleChange,
  } = useCategory(existingCategory);

  const modalTitle = isEditMode
    ? i18n.t('Dialog.Categories.EditCategoryTitle')
    : i18n.t('Dialog.Categories.Title');

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

                <StyledTextInput
                  value={title}
                  onChange={handleTitleChange}
                  placeholder={i18n.t('Dialog.Categories.TitleInputPlaceholder')}
                  isDarkMode={isDarkMode}
                  placeholderTextColor={theme.colors.grey[600]}
                />

                <StyledButton
                  size="large"
                  style={!isDarkMode && buttonShadow}
                  onPress={isEditMode ? handleUpdateCategory : handleCreateCategory}
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
