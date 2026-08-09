/* eslint-disable react-native/no-inline-styles */
import { AddButton, Icon } from '@components/shared';
import { useCategory } from '@hooks/useCategory';
import { useDarkMode } from '@hooks/useDarkMode';
import useVibration from '@hooks/useVibration';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import {
  Container,
  ContentContainer,
  ListContainer,
  Loader,
  MyCategoriesTitle,
  NoIncomesContainer,
  NoIncomesText,
  ScreenTitleContainer,
  ScreenTitleText,
  StyledLinearGradient,
} from './Categories.styles';
import { CategoryCard } from './CategoryCard';
import { CategoryModal } from './CategoryModal';

export const Categories: FC = () => {
  const { isDarkMode } = useDarkMode();
  const { vibrateLight } = useVibration();
  const {
    handlePullToRefresh,
    isLoading,
    categories,
    isModalOpen,
    selectedCategory,
    isEditModeModal,
    screenRefreshing,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
  } = useCategory();

  return (
    <>
      <Container>
        <StyledLinearGradient
          colors={['#e84393', '#e84393']}
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
            <MyCategoriesTitle isDarkMode={isDarkMode}>
              {i18n.t('Categories.ScreenTitle')}
            </MyCategoriesTitle>

            {isLoading && <Loader color={theme.colors.magenta[100]} size="large" />}

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
                      colors={['#e84393', '#e84393']}
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
                <NoIncomesText isDarkMode={isDarkMode}>
                  {i18n.t('Categories.NoCategoriesText')}
                </NoIncomesText>
              </NoIncomesContainer>
            )}

            <AddButton
              onPress={() => {
                vibrateLight();
                handleModalOpen();
              }}
            />
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
