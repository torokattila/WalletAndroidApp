/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import DatePicker from 'react-native-date-picker';
import { Dropdown } from 'react-native-element-dropdown';
import i18n from 'i18n-js';
import { theme } from '@styles/theme';
import { formatDate } from '@core/date-utils';
import { AddButton, Icon } from '@components/shared';
import { usePurchase } from '@hooks/usePurchase';
import {
  AllPurchasesTitle,
  CategoryAndShowDateFiltersButtonContainer,
  CategoryFilterContainer,
  CategoryFilterLabel,
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
  PurchasesThisMonth,
  PurchasesThisMonthContainer,
  PurchasesThisMonthTitle,
  ScreenTitleContainer,
  ScreenTitleText,
  ShowDateFiltersButton,
  ShowDateFiltersButtonText,
  StyledLinearGradient,
} from './Purchases.styles';
import { PurchaseModal } from './PurchaseModal';
import { FlatList } from 'react-native';
import { PurchaseCard } from './PurchaseCard';

const shadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Purchases: FC = () => {
  const {
    handleModalOpen,
    handleModalClose,
    isModalOpen,
    isEditModeModal,
    selectedPurchase,
    purchases,
    handleEditModalOpen,
    allPurchasesAmountForThisMonth,
    fromDate,
    filterCategories,
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
    isFilterChanged,
    filterCategory,
    handleFilterCategoryChange,
    isDateFiltersShown,
    toggleDateFiltersShown,
  } = usePurchase();

  const dropdownPlaceholder = filterCategory.current
    ? i18n.t(`Purchases.Categories.${filterCategory.current}`)
    : i18n.t('Purchases.Categories.all');

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
            <PurchasesThisMonth>{allPurchasesAmountForThisMonth} Ft</PurchasesThisMonth>
          </PurchasesThisMonthContainer>

          <ContentContainer>
            <AllPurchasesTitle>{i18n.t('Purchases.AllPurchasesTitle')}</AllPurchasesTitle>

            <CategoryAndShowDateFiltersButtonContainer>
              <CategoryFilterContainer>
                <CategoryFilterLabel>Szűrés kategóriára</CategoryFilterLabel>
                <Dropdown
                  style={[shadow, dropdownStyle]}
                  data={filterCategories}
                  value={filterCategory.current}
                  placeholder={dropdownPlaceholder}
                  containerStyle={[shadow, dropdownContainerStyle]}
                  itemTextStyle={dropdownTextStyle}
                  itemContainerStyle={dropdownItemContaineStyle}
                  labelField={'label'}
                  valueField={'value'}
                  onChange={handleFilterCategoryChange}
                  mode="modal"
                />
              </CategoryFilterContainer>

              <ShowDateFiltersButton style={shadow} onPress={toggleDateFiltersShown}>
                <ShowDateFiltersButtonText>{i18n.t('FilterForDate')}</ShowDateFiltersButtonText>
              </ShowDateFiltersButton>
            </CategoryAndShowDateFiltersButtonContainer>

            <FiltersContainer>
              {isDateFiltersShown && (
                <DateFiltersContainer>
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
                </DateFiltersContainer>
              )}

              {isFilterChanged && (
                <>
                  <DeleteFiltersButton onPress={handleClearFilters}>
                    <Icon type="delete-filters" iconColor={theme.colors.purple[100]} />
                  </DeleteFiltersButton>
                </>
              )}
              <DownloadButton onPress={() => {}}>
                <Icon type="download" iconColor={theme.colors.purple[100]} />
              </DownloadButton>
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
            />

            <ListContainer>
              <FlatList
                contentContainerStyle={{ paddingBottom: 40 }}
                style={{
                  paddingHorizontal: 10,
                  marginTop: -15,
                }}
                showsVerticalScrollIndicator={false}
                data={purchases}
                keyExtractor={(item) => item.id}
                scrollEnabled
                renderItem={({ item }) => (
                  <PurchaseCard purchase={item} onPress={() => handleEditModalOpen(item)} />
                )}
              />
            </ListContainer>
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
