/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { AddButton, Icon } from '@components/shared';
import { formatDate } from '@core/date-utils';
import { useDarkMode } from '@hooks/useDarkMode';
import { usePurchase } from '@hooks/usePurchase';
import { PurchaseCategory } from '@model/domain';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC, useCallback, useEffect, useRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import Animated, { FadeIn, FadeInLeft, FadeOut, FadeOutLeft } from 'react-native-reanimated';
import { PurchaseCard } from './PurchaseCard';
import { PurchaseModal } from './PurchaseModal';
import {
  AllPurchasesTitle,
  CategoryAndShowDateFiltersButtonContainer,
  CategoryFilterContainer,
  CategoryFilterLabel,
  ClearFilterAndDownloadContainer,
  CloseDateFiltersButton,
  Container,
  ContentContainer,
  DateFiltersContainer,
  DatePickerButton,
  DatePickerButtonContainer,
  DatePickerButtonLabel,
  DatePickerText,
  DeleteFiltersButton,
  DownloadButton,
  dropdownContainerStyle,
  dropdownItemContaineStyle,
  dropdownStyle,
  dropdownTextStyle,
  FiltersContainer,
  ListContainer,
  Loader,
  NoPurchasesContainer,
  NoPurchasesText,
  PurchasesThisMonth,
  PurchasesThisMonthContainer,
  PurchasesThisMonthTitle,
  ScreenTitleContainer,
  ScreenTitleText,
  selectedTextStyle,
  ShowDateFiltersButton,
  ShowDateFiltersButtonText,
  StyledLinearGradient,
} from './Purchases.styles';
import { formatAmount } from '@core/format-amount';

const shadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Purchases: FC = () => {
  const route = useRoute();
  const { category = PurchaseCategory.ALL, month = new Date() } =
    (route.params as {
      category?: string;
      month?: Date;
    }) || {};

  const categoryRef = useRef(category);
  const monthRef = useRef(month);

  const { isDarkMode } = useDarkMode();
  const {
    isLoading,
    handleModalOpen,
    handleModalClose,
    isModalOpen,
    isEditModeModal,
    selectedPurchase,
    purchases,
    handleEditModalOpen,
    allPurchasesAmountForThisMonth,
    fromDate,
    allCategories,
    handleFromDatePickerOpen,
    handleToDatePickerOpen,
    handleFromDatePickerClose,
    handleToDatePickerClose,
    toDate,
    handleFromDateChange,
    handleToDateChange,
    isFromDatePickerOpen,
    isToDatePickerOpen,
    handleClearFilters,
    isDateFilterChanged,
    isCategoryFilterChanged,
    filterCategory,
    handleFilterCategoryChange,
    isDateFiltersShown,
    showDateFilters,
    hideDateFilters,
    handleDownloadButtonClick,
    screenRefreshing,
    handlePullToRefresh,
    filterPurchases,
  } = usePurchase();

  useFocusEffect(
    useCallback(() => {
      const filterByCategoryAndMonth = async () => {
        if (!month) {
          return;
        }

        const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
        const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        fromDate.current = startDate;
        toDate.current = endDate;

        await filterPurchases({
          categoryParam: category,
          dates: { startDate, endDate },
        });
      };

      filterByCategoryAndMonth();
    }, [category, month])
  );

  useEffect(() => {
    categoryRef.current = category;
    monthRef.current = month;
  }, [category, month]);

  useFocusEffect(
    useCallback(() => {
      return () => {
        fromDate.current = new Date();
        toDate.current = new Date();
        filterCategory.current = PurchaseCategory.ALL;
        handleClearFilters();
      };
    }, [])
  );

  return (
    <>
      <Container>
        <StyledLinearGradient
          colors={['#8E65F7', '#4547B8']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Purchases.ScreenTitle')}</ScreenTitleText>
            <Icon type="purchase" iconColor="#fff" />
          </ScreenTitleContainer>

          <PurchasesThisMonthContainer>
            <PurchasesThisMonthTitle>
              {i18n.t('Purchases.PurchasesThisMonthTitle')}
            </PurchasesThisMonthTitle>
            <PurchasesThisMonth>
              {formatAmount(allPurchasesAmountForThisMonth)} Ft
            </PurchasesThisMonth>
          </PurchasesThisMonthContainer>

          <ContentContainer isDarkMode={isDarkMode}>
            <AllPurchasesTitle>{i18n.t('Purchases.AllPurchasesTitle')}</AllPurchasesTitle>

            <ClearFilterAndDownloadContainer>
              {(isCategoryFilterChanged || isDateFilterChanged.current) && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  <DeleteFiltersButton onPress={handleClearFilters}>
                    <Icon type="delete-filters" iconColor={theme.colors.purple[300]} />
                  </DeleteFiltersButton>
                </Animated.View>
              )}
              <DownloadButton onPress={handleDownloadButtonClick}>
                <Icon type="download" iconColor={theme.colors.purple[300]} />
              </DownloadButton>
            </ClearFilterAndDownloadContainer>

            <CategoryAndShowDateFiltersButtonContainer>
              <CategoryFilterContainer>
                <CategoryFilterLabel>{i18n.t('Purchases.FilterForCategory')}</CategoryFilterLabel>
                <Dropdown
                  style={[
                    !isDarkMode && shadow,
                    dropdownStyle,
                    {
                      backgroundColor: isDarkMode
                        ? theme.colors.grey[500]
                        : theme.colors.white[100],
                    },
                  ]}
                  data={allCategories}
                  value={filterCategory.current}
                  placeholderStyle={{
                    color: theme.colors.grey[600],
                  }}
                  placeholder={filterCategory.current}
                  containerStyle={[
                    !isDarkMode && shadow,
                    dropdownContainerStyle,
                    {
                      backgroundColor: isDarkMode
                        ? theme.colors.grey[500]
                        : theme.colors.white[100],
                      maxHeight: 230,
                      left: 65,
                    },
                  ]}
                  itemTextStyle={dropdownTextStyle}
                  itemContainerStyle={dropdownItemContaineStyle}
                  labelField={'label'}
                  valueField={'value'}
                  selectedTextStyle={selectedTextStyle}
                  activeColor={isDarkMode ? theme.colors.grey[700] : theme.colors.grey[200]}
                  onChange={handleFilterCategoryChange} // Trigger filtering on category change
                  mode="default"
                />
              </CategoryFilterContainer>

              <ShowDateFiltersButton
                style={!isDarkMode && shadow}
                onPress={showDateFilters}
                isDarkMode={isDarkMode}
              >
                <ShowDateFiltersButtonText>{i18n.t('FilterForDate')}</ShowDateFiltersButtonText>
              </ShowDateFiltersButton>
            </CategoryAndShowDateFiltersButtonContainer>

            <FiltersContainer>
              {isDateFiltersShown && (
                <DateFiltersContainer
                  style={!isDarkMode && shadow}
                  isDarkMode={isDarkMode}
                  entering={FadeInLeft}
                  exiting={FadeOutLeft}
                >
                  <DatePickerButtonContainer>
                    <DatePickerButtonLabel>
                      {i18n.t('DatePicker.FilterFromDateText')}
                    </DatePickerButtonLabel>
                    <DatePickerButton style={shadow} onPress={handleFromDatePickerOpen}>
                      <DatePickerText>{formatDate(fromDate.current)}</DatePickerText>
                    </DatePickerButton>
                  </DatePickerButtonContainer>

                  <DatePickerButtonContainer>
                    <DatePickerButtonLabel>
                      {i18n.t('DatePicker.FilterToDateText')}
                    </DatePickerButtonLabel>
                    <DatePickerButton style={shadow} onPress={handleToDatePickerOpen}>
                      <DatePickerText>{formatDate(toDate.current)}</DatePickerText>
                    </DatePickerButton>
                  </DatePickerButtonContainer>

                  <CloseDateFiltersButton
                    style={!isDarkMode && shadow}
                    onPress={hideDateFilters}
                    isDarkMode={isDarkMode}
                  >
                    <Icon type="close" iconColor={theme.colors.purple[300]} />
                  </CloseDateFiltersButton>
                </DateFiltersContainer>
              )}
            </FiltersContainer>

            <DatePicker
              modal
              mode="date"
              title={null}
              open={isFromDatePickerOpen}
              date={fromDate.current}
              maximumDate={new Date()}
              androidVariant="iosClone"
              onConfirm={handleFromDateChange}
              onCancel={handleFromDatePickerClose}
              cancelText={i18n.t('DatePicker.CancelButtonText')}
              confirmText={i18n.t('DatePicker.ConfirmButtonText')}
              theme={isDarkMode ? 'dark' : 'auto'}
            />
            <DatePicker
              modal
              mode="date"
              title={null}
              open={isToDatePickerOpen}
              date={toDate.current}
              minimumDate={fromDate.current}
              androidVariant="iosClone"
              onConfirm={handleToDateChange}
              onCancel={handleToDatePickerClose}
              cancelText={i18n.t('DatePicker.CancelButtonText')}
              confirmText={i18n.t('DatePicker.ConfirmButtonText')}
              theme={isDarkMode ? 'dark' : 'auto'}
            />

            {isLoading && <Loader color={theme.colors.purple[300]} size="large" />}

            {purchases.length > 0 && !isLoading && (
              <ListContainer>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 40 }}
                  style={{
                    paddingHorizontal: 10,
                    marginTop: -15,
                  }}
                  refreshControl={
                    <RefreshControl
                      refreshing={screenRefreshing}
                      onRefresh={handlePullToRefresh}
                      colors={['#4547B8', '#8E65F7']}
                    />
                  }
                  showsVerticalScrollIndicator={false}
                  data={purchases}
                  keyExtractor={(item) => item.id}
                  scrollEnabled
                  renderItem={({ item }) => (
                    <PurchaseCard purchase={item} onPress={() => handleEditModalOpen(item)} />
                  )}
                />
              </ListContainer>
            )}
            {!purchases.length && !isLoading && (
              <NoPurchasesContainer>
                <NoPurchasesText>{i18n.t('NoPurchasesText')}</NoPurchasesText>
              </NoPurchasesContainer>
            )}
            <AddButton onPress={handleModalOpen} />
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
      <PurchaseModal
        isVisible={isModalOpen}
        onClose={handleModalClose}
        isEditMode={isEditModeModal}
        purchase={selectedPurchase}
      />
    </>
  );
};
