import { useDarkMode } from '@hooks/useDarkMode';
import React, { FC } from 'react';
import i18n from 'i18n-js';
import {
  Container,
  ContentContainer,
  Loader,
  MyCategoriesTitle,
  ScreenTitleContainer,
  ScreenTitleText,
  StyledLinearGradient,
} from './Categories.styles';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import { useCategory } from '@hooks/useCategory';

export const Categories: FC = () => {
  const { isDarkMode } = useDarkMode();
  const {
    fetchCategories,
    handlePullToRefresh,
    stopRefreshing,
    verifyForm,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    errors,
    isLoading,
    categories,
    isConfirmDialogOpen,
    isModalOpen,
    selectedCategory,
    isEditModeModal,
    screenRefreshing,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    handleTitleChange,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
  } = useCategory();

  return (
    <>
      <Container>
        <StyledLinearGradient
          colors={['#5b1bff', '#4547B8']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Categories.ScreenTitle')}</ScreenTitleText>
            <Icon type="category" iconColor="#fff" />
          </ScreenTitleContainer>

          <ContentContainer isDarkMode={isDarkMode}>
            <MyCategoriesTitle>{i18n.t('Categories.MyCategoriesTitle')}</MyCategoriesTitle>

            {isLoading && <Loader color={theme.colors.purple[300]} size="large" />}
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
    </>
  );
};
