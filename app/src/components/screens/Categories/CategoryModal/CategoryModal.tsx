/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import { ConfirmDialog, Icon, IconType, ModalBackground } from '@components/shared';
import { useCategory } from '@hooks/useCategory';
import { useDarkMode } from '@hooks/useDarkMode';
import { Category } from '@model/domain';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Modal, TouchableOpacity, View, Dimensions } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import Carousel from 'react-native-reanimated-carousel';
import CategoryColorPicker from '../CategoryColorPicker';
import {
  ColorPickerContainer,
  Content,
  ContentContainer,
  DeleteIconContainer,
  IconPickerContainer,
  PickColorText,
  PickIconText,
  StyledButton,
  StyledTextInput,
  Title,
  UpperLine,
  CarouselContainer,
  PaginationContainer,
  PaginationDot,
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

export const icons: IconType[] = [
  'apple',
  'airplane',
  'beauty',
  'dog',
  'train',
  'shopping-cart',
  'book-shelf',
  'car',
  'microphone',
  'no-smoking',
  'guitar',
  'hairdresser',
  'restaurant',
  'pills',
  'present',
  'house',
  'mobile',
  'gas-station',
  'gaming',
];

// Helper function to chunk icons into pages with 2 rows of 4 icons each
const chunkIcons = (iconArray: IconType[], iconsPerPage: number = 8) => {
  const chunks: IconType[][] = [];
  for (let i = 0; i < iconArray.length; i += iconsPerPage) {
    chunks.push(iconArray.slice(i, i + iconsPerPage));
  }
  return chunks;
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
    icon,
    handleTitleChange,
    handleColorChange,
    handleIconChange,
  } = useCategory(existingCategory);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const width = Dimensions.get('window').width;
  const carouselWidth = width * 0.9;
  const iconWidth = 70;
  const columnsPerRow = Math.floor(carouselWidth / iconWidth);

  // Fixed 2 rows per page
  const rows = 2;
  const iconsPerPage = columnsPerRow * rows;

  const iconPages = chunkIcons(icons, iconsPerPage);

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
                </IconPickerContainer>

                <CarouselContainer>
                  <Carousel
                    loop={false}
                    width={carouselWidth}
                    height={180}
                    data={iconPages}
                    onSnapToItem={(index) => setActiveIndex(index)}
                    renderItem={({ item: page, index: pageIndex }) => (
                      <View
                        style={{
                          width: carouselWidth,
                          marginTop: 10,
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'center',
                          alignItems: 'center',
                          alignContent: 'center',
                          gap: 5,
                        }}
                      >
                        {page.map((iconType, iconIndex) => (
                          <IconCard
                            key={`icon-${pageIndex}-${iconIndex}`}
                            icon={iconType}
                            isSelected={icon === iconType}
                            onPress={() => handleIconChange(iconType)}
                          />
                        ))}
                      </View>
                    )}
                  />
                  <PaginationContainer>
                    {iconPages.map((_, index) => (
                      <PaginationDot
                        key={`dot-${index}`}
                        isActive={index === activeIndex}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </PaginationContainer>
                </CarouselContainer>

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
