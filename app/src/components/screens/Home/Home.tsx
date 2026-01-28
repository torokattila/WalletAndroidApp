/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Icon } from '@components/shared';
import { ROUTES } from '@constants/routes';
import { formatAmount } from '@core/format-amount';
import { getLocale } from '@core/translation-utils';
import { useDarkMode } from '@hooks/useDarkMode';
import { useHome } from '@hooks/useHome';
import { theme } from '@styles/theme';
import { format } from 'date-fns';
import { enUS, hu } from 'date-fns/locale';
import i18n from 'i18n-js';
import React, { FC } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { PieChart } from 'react-native-gifted-charts';
import { PurchaseModal } from '../Purchases/PurchaseModal';
import {
  Balance,
  BalanceContainer,
  BalanceTitle,
  buttonShadow,
  Container,
  ContentContainer,
  DateSelectorButton,
  DateSelectorText,
  ListContainer,
  Loader,
  MonthlyStatementAndDateSelectorContainer,
  MonthlyStatementTitle,
  NoLastFivePurchasesContainer,
  NoLastFivePurchasesText,
  PieChartCenterAmount,
  PieChartContainer,
  RedirectToPurchasesButton,
  scrollViewStyle,
  StyledLinearGradient,
  WelcomeAndAmountText,
  WelcomeText,
} from './Home.styles';
import PieChartPurchaseCard from './PieChartPurchaseCard/PieChartPurchaseCard';

export const Home: FC = () => {
  const { isDarkMode } = useDarkMode();
  const locale = getLocale();
  const {
    user,
    donutChartData,
    isLoading,
    screenRefreshing,
    handlePullToRefresh,
    selectedMonth,
    isMonthPickerOpen,
    handleMonthPickerOpen,
    handleMonthPickerClose,
    handleMonthChange,
    isModalOpen,
    handleModalClose,
    isEditModeModal,
    selectedPurchase,
    navigateToPurchases,
    navigation,
  } = useHome();

  return (
    <>
      <Container
        overScrollMode="never"
        contentContainerStyle={scrollViewStyle}
        refreshControl={
          <RefreshControl
            refreshing={screenRefreshing}
            onRefresh={handlePullToRefresh}
            colors={['#e84393', '#e84393']}
          />
        }
        isDarkMode={isDarkMode}
      >
        <StyledLinearGradient
          colors={['#e84393', '#e84393']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <WelcomeAndAmountText>
            <WelcomeText>Hello {user?.firstname}!</WelcomeText>
            <BalanceContainer>
              <BalanceTitle>{i18n.t('BalanceTitle')}</BalanceTitle>
              <Balance>{formatAmount(user?.balance)} Ft</Balance>
            </BalanceContainer>
          </WelcomeAndAmountText>

          <ContentContainer isDarkMode={isDarkMode}>
            <MonthlyStatementAndDateSelectorContainer>
              <MonthlyStatementTitle isDarkMode={isDarkMode}>
                {i18n.t('Home.MonthlyStatement')}:
              </MonthlyStatementTitle>
              <DateSelectorButton onPress={handleMonthPickerOpen}>
                <Icon type="calendar" iconColor={theme.colors.white[100]} />
                <DateSelectorText>
                  {format(selectedMonth, 'yyyy MMMM', { locale: locale === 'hun' ? hu : enUS })}
                </DateSelectorText>
              </DateSelectorButton>
            </MonthlyStatementAndDateSelectorContainer>

            <DatePicker
              modal
              mode="date"
              title={null}
              open={isMonthPickerOpen}
              date={selectedMonth}
              maximumDate={new Date()}
              androidVariant="iosClone"
              onConfirm={handleMonthChange}
              onCancel={handleMonthPickerClose}
              cancelText={i18n.t('DatePicker.CancelButtonText')}
              confirmText={i18n.t('DatePicker.ConfirmButtonText')}
              theme={isDarkMode ? 'dark' : 'auto'}
            />

            {donutChartData.length > 0 && (
              <PieChartContainer>
                <PieChart
                  data={donutChartData ?? []}
                  donut
                  radius={90}
                  innerRadius={60}
                  strokeColor={!isDarkMode ? theme.colors.white[200] : theme.colors.grey[800]}
                  strokeWidth={1}
                  textSize={14}
                  innerCircleColor={isDarkMode ? theme.colors.grey[800] : theme.colors.white[200]}
                  showTooltip
                  tooltipBackgroundColor={
                    isDarkMode ? theme.colors.grey[900] : theme.colors.white[200]
                  }
                  focusOnPress
                  showValuesAsTooltipText
                  textColor={isDarkMode ? theme.colors.white[200] : theme.colors.purple[100]}
                  centerLabelComponent={() => (
                    <PieChartCenterAmount>
                      {formatAmount(donutChartData.reduce((sum, item) => sum + item.value, 0))} Ft
                    </PieChartCenterAmount>
                  )}
                />

                <ListContainer>
                  <FlatList
                    contentContainerStyle={{
                      paddingBottom: 40,
                    }}
                    style={{
                      paddingHorizontal: 10,
                    }}
                    refreshControl={
                      <RefreshControl
                        refreshing={screenRefreshing}
                        onRefresh={handlePullToRefresh}
                        colors={['#e84393', '#e84393']}
                      />
                    }
                    data={donutChartData}
                    scrollEnabled
                    keyExtractor={(item, index) => `${item.label}-${index.toString()}`}
                    renderItem={({ item }) => (
                      <PieChartPurchaseCard
                        donutChartData={item}
                        onPress={() => {
                          const firstDayOfSelectedMonth = new Date(
                            selectedMonth.getFullYear(),
                            selectedMonth.getMonth(),
                            1
                          );
                          const lastDayOfSelectedMonth = new Date(
                            selectedMonth.getFullYear(),
                            selectedMonth.getMonth() + 1,
                            0
                          );

                          navigateToPurchases(
                            item.originalCategory,
                            firstDayOfSelectedMonth,
                            lastDayOfSelectedMonth
                          );
                        }}
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                </ListContainer>
              </PieChartContainer>
            )}

            {isLoading && <Loader color={theme.colors.magenta[100]} size="large" />}

            {!donutChartData.length && !isLoading && (
              <NoLastFivePurchasesContainer>
                <NoLastFivePurchasesText isDarkMode={isDarkMode}>
                  {i18n.t('NoPurchasesText')}
                </NoLastFivePurchasesText>
                <RedirectToPurchasesButton
                  style={!isDarkMode && buttonShadow}
                  onPress={() => navigation.navigate(ROUTES.PURCHASES)}
                  text={i18n.t('Home.RedirectToPurchasesButtonText')}
                  size="small"
                />
              </NoLastFivePurchasesContainer>
            )}
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
