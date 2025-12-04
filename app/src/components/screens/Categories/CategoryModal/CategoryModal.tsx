/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmDialog, Icon, ModalBackground } from '@components/shared';
import { useCategory } from '@hooks/useCategory';
import { useDarkMode } from '@hooks/useDarkMode';
import { Category } from '@model/domain';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, TouchableOpacity, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import CategoryColorPicker from '../CategoryColorPicker';
import {
  ColorPickerContainer,
  Content,
  ContentContainer,
  DeleteIconContainer,
  IconListContainer,
  IconPickerContainer,
  PickColorText,
  PickIconText,
  StyledButton,
  StyledTextInput,
  Title,
  UpperLine,
} from './CategoryModal.styles';
import { IconCard } from '../IconCard';

type CategoryModalProps = {
  isVisible: boolean;
  onClose: () => void;
  existingCategory?: Category;
  isEditMode?: boolean;
};

export const shadow = {
  elevation: 8,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -8, height: 20 },
  shadowOpacity: 0.6,
  shadowRadius: 35,
};

export const buttonShadow = {
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
    color,
    handleTitleChange,
    handleColorChange,
  } = useCategory(existingCategory);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);

  const openColorPicker = () => setIsColorPickerOpen(true);
  const closeColorPicker = () => setIsColorPickerOpen(false);

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

                <ColorPickerContainer>
                  <View>
                    <PickColorText>{i18n.t('Categories.PickColor')}:</PickColorText>
                  </View>
                  <TouchableOpacity
                    onPress={openColorPicker}
                    style={{
                      ...shadow,
                      height: 50,
                      width: 70,
                      backgroundColor: color,
                      borderRadius: 20,
                    }}
                  />
                </ColorPickerContainer>

                <IconPickerContainer>
                  <View>
                    <PickIconText>{i18n.t('Categories.PickIcon')}:</PickIconText>
                  </View>
                  <IconListContainer>
                    <IconCard icon="beauty" />
                    <IconCard icon="dog" />
                    <IconCard icon="train" />
                    <IconCard icon="shopping-cart" />
                    <IconCard icon="car" />
                    <IconCard icon="no-smoking" />
                  </IconListContainer>
                </IconPickerContainer>

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
      <CategoryColorPicker
        isVisible={isColorPickerOpen}
        onClose={closeColorPicker}
        pickColor={handleColorChange}
        existingColor={color}
      />
    </>
  );
};
