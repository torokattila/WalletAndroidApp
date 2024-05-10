/* eslint-disable react-native/no-inline-styles */
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
  ListContainer,
  NoIncomesContainer,
  NoIncomesText,
} from './Categories.styles';
import { theme } from '@styles/theme';
import { AddButton, Icon } from '@components/shared';
import { useCategory } from '@hooks/useCategory';
import { CategoryModal } from './CategoryModal';
import { FlatList, RefreshControl } from 'react-native';
import { CategoryCard } from './CategoryCard';

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

            {categories.length > 0 && !isLoading && (
              <ListContainer>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 40 }}
                  style={{ paddingHorizontal: 10, marginTop: -15 }}
                  showsVerticalScrollIndicator={false}
                  data={categories}
                  refreshControl={
                    <RefreshControl
                      refreshing={screenRefreshing}
                      onRefresh={handlePullToRefresh}
                      colors={['#4547B8', '#8E65F7']}
                    />
                  }
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <CategoryCard
                      key={item.id}
                      category={item}
                      onPress={() => handleEditModalOpen(item)}
                    />
                  )}
                />
              </ListContainer>
            )}

            {!categories.length && !isLoading && (
              <NoIncomesContainer>
                <NoIncomesText>{i18n.t('Categories.NoCategoriesText')}</NoIncomesText>
              </NoIncomesContainer>
            )}

            <AddButton onPress={handleModalOpen} />
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
      <CategoryModal
        isVisible={isModalOpen}
        onClose={handleModalClose}
        isEditMode={isEditModeModal}
        existingCategory={selectedCategory}
      />
    </>
  );
};
