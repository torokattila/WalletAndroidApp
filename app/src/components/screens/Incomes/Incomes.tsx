/* eslint-disable react-native/no-inline-styles */
import { AddButton, Icon } from '@components/shared';
import { formatDate } from '@core/date-utils';
import { formatAmount } from '@core/format-amount';
import { useDarkMode } from '@hooks/useDarkMode';
import { useIncome } from '@hooks/useIncome';
import { useVibration } from '@hooks/useVibration';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { IncomeCard } from './IncomeCard';
import { IncomeModal } from './IncomeModal';
import {
  AllIncomeTitle,
  Balance,
  BalanceContainer,
  BalanceTitle,
  ClearFilterAndDownloadContainer,
  Container,
  ContentContainer,
  DatePickerButton,
  DatePickerButtonContainer,
  DatePickerButtonLabel,
  DatePickerContainer,
  DatePickerText,
  DeleteFiltersButton,
  DownloadButton,
  ListContainer,
  Loader,
  NoIncomesContainer,
  NoIncomesText,
  ScreenTitleContainer,
  ScreenTitleText,
  StyledLinearGradient,
} from './Incomes.styles';

const shadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Incomes: FC = () => {
  const { isDarkMode } = useDarkMode();
  const { vibrateLight } = useVibration();
  const {
    isLoading,
    incomes,
    isFromDatePickerOpen,
    handleFromDatePickerOpen,
    handleFromDatePickerClose,
    fromDate,
    handleFromDateChange,
    isToDatePickerOpen,
    handleToDatePickerOpen,
    handleToDatePickerClose,
    toDate,
    handleToDateChange,
    handleClearFilters,
    isFilterChanged,
    handleModalOpen,
    handleEditModalOpen,
    isModalOpen,
    handleModalClose,
    selectedIncome,
    isEditModeModal,
    handleDownloadButtonClick,
    screenRefreshing,
    handlePullToRefresh,
    totalIncome,
  } = useIncome();

  return (
    <>
      <Container
        overScrollMode="never"
        refreshControl={
          <RefreshControl
            refreshing={screenRefreshing}
            onRefresh={handlePullToRefresh}
            colors={['#e84393', '#e84393']}
          />
        }
      >
        <StyledLinearGradient
          colors={['#e84393', '#e84393']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Incomes.ScreenTitle')}</ScreenTitleText>
            <Icon type="income" iconColor="#fff" />
          </ScreenTitleContainer>

          <BalanceContainer>
            <BalanceTitle>{i18n.t('Incomes.ActualMonthlyIncomeTitle')}</BalanceTitle>
            <Balance>{formatAmount(totalIncome)} Ft</Balance>
          </BalanceContainer>
          <ContentContainer isDarkMode={isDarkMode}>
            <AllIncomeTitle isDarkMode={isDarkMode}>
              {i18n.t('Incomes.AllIncomeTitle')}
            </AllIncomeTitle>

            <DatePickerContainer>
              <DatePickerButtonContainer>
                <DatePickerButtonLabel isDarkMode={isDarkMode}>
                  {i18n.t('DatePicker.FilterFromDateText')}
                </DatePickerButtonLabel>
                <DatePickerButton style={shadow} onPress={handleFromDatePickerOpen}>
                  <DatePickerText>{formatDate(fromDate.current)}</DatePickerText>
                </DatePickerButton>
              </DatePickerButtonContainer>

              <DatePickerButtonContainer>
                <DatePickerButtonLabel isDarkMode={isDarkMode}>
                  {i18n.t('DatePicker.FilterToDateText')}
                </DatePickerButtonLabel>
                <DatePickerButton style={shadow} onPress={handleToDatePickerOpen}>
                  <DatePickerText>{formatDate(toDate.current)}</DatePickerText>
                </DatePickerButton>
              </DatePickerButtonContainer>
            </DatePickerContainer>

            <ClearFilterAndDownloadContainer>
              {isFilterChanged && (
                <Animated.View entering={FadeIn} exiting={FadeOut}>
                  <DeleteFiltersButton onPress={handleClearFilters}>
                    <Icon type="delete-filters" iconColor={theme.colors.magenta[100]} />
                  </DeleteFiltersButton>
                </Animated.View>
              )}
              <DownloadButton onPress={handleDownloadButtonClick}>
                <Icon type="download" iconColor={theme.colors.magenta[100]} />
              </DownloadButton>
            </ClearFilterAndDownloadContainer>

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

            {isLoading && <Loader color={theme.colors.magenta[100]} size="large" />}

            {incomes.length > 0 && !isLoading && (
              <ListContainer>
                <FlatList
                  contentContainerStyle={{ paddingBottom: 40 }}
                  style={{ paddingHorizontal: 10, marginTop: -15 }}
                  showsVerticalScrollIndicator={false}
                  data={incomes}
                  refreshControl={
                    <RefreshControl
                      refreshing={screenRefreshing}
                      onRefresh={handlePullToRefresh}
                      colors={['#e84393', '#e84393']}
                    />
                  }
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <IncomeCard
                      key={item.id}
                      income={item}
                      onPress={() => {
                        vibrateLight();
                        handleEditModalOpen(item);
                      }}
                    />
                  )}
                />
              </ListContainer>
            )}

            {!incomes.length && !isLoading && (
              <NoIncomesContainer>
                <NoIncomesText isDarkMode={isDarkMode}>
                  {i18n.t('Incomes.NoIncomesText')}
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
      <IncomeModal
        isVisible={isModalOpen}
        onClose={handleModalClose}
        income={selectedIncome}
        isEditMode={isEditModeModal}
      />
    </>
  );
};
