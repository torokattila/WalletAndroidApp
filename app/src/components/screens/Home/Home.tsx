/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { getLocale } from '@core/translation-utils';
import { useDarkMode } from '@hooks/useDarkMode';
import { useHome } from '@hooks/useHome';
import { usePurchase } from '@hooks/usePurchase';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import { format } from 'date-fns';
import { enUS, hu } from 'date-fns/locale';
import i18n from 'i18n-js';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { PieChart } from 'react-native-gifted-charts';
import { PurchaseModal } from '../Purchases/PurchaseModal';
import {
  Balance,
  BalanceTitle,
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
import { Icon } from '@components/shared';
import { categoryTranslationMap } from '@core/translations';

const buttonShadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Home: FC = () => {
  const { isDarkMode } = useDarkMode();
  const locale = getLocale();
  const { screenRefreshing, setScreenRefreshing } = useHome();
  const {
    purchases,
    isModalOpen,
    handleModalClose,
    isEditModeModal,
    selectedPurchase,
    retry: reloadPurchases,
    isLoading,
  } = usePurchase();
  const { user, navigation } = useHome();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);

    await reloadPurchases();
  };

  useEffect(() => {
    if (!isLoading && screenRefreshing) {
      setScreenRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, purchases, screenRefreshing]);

  const aggregatePurchasesByCategory = (purchasesProp: Purchase[]) => {
    if (!purchasesProp || purchasesProp.length === 0) {
      return [];
    }

    const currentMonth = selectedMonth.getMonth();
    const currentYear = selectedMonth.getFullYear();

    const purchasesForSelectedMonth = purchasesProp.filter((purchase) => {
      const purchaseDate = purchase.updatedAt.toDate();
      return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    if (purchasesForSelectedMonth.length === 0) {
      return [];
    }

    const totalAmount = purchasesForSelectedMonth.reduce(
      (sum, purchase) => sum + parseFloat(purchase.amount || '0'),
      0
    );

    const categoryTotals: { [category: string]: { amount: number; color: string } } = {};

    purchasesForSelectedMonth.forEach((purchase) => {
      const category: string =
        typeof purchase.categoryObject?.title === 'string'
          ? purchase.categoryObject.title
          : typeof purchase.category === 'string'
          ? purchase.category
          : '';
      const amount = parseFloat(purchase.amount || '0');
      const color = purchase.categoryObject?.color || theme.colors.grey[500];

      if (categoryTotals[category]) {
        categoryTotals[category].amount += amount;
      } else {
        categoryTotals[category] = { amount, color };
      }
    });

    return Object.entries(categoryTotals)
      .map(([category, { amount, color }]) => ({
        label: category,
        value: amount,
        text: `${category} - ${Math.round((amount / totalAmount) * 100)}%`,
        percentage: Math.round((amount / totalAmount) * 100),
        color,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  const donutChartData = useMemo(
    () => aggregatePurchasesByCategory(purchases),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [purchases, selectedMonth]
  );

  return (
    <>
      <Container
        overScrollMode="never"
        contentContainerStyle={scrollViewStyle}
        refreshControl={
          <RefreshControl
            refreshing={screenRefreshing}
            onRefresh={handlePullToRefresh}
            colors={['#4547B8', '#8E65F7']}
          />
        }
        isDarkMode={isDarkMode}
      >
        <StyledLinearGradient
          colors={['#2C1F5F', '#4c397a', '#9068ee', '#b296f1', '#ffffff', '#3f087a57']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <WelcomeAndAmountText>
            <WelcomeText>Hello {user?.firstname}!</WelcomeText>
            <BalanceTitle>
              {i18n.t('BalanceTitle')}: <Balance>{user?.balance} Ft</Balance>
            </BalanceTitle>
          </WelcomeAndAmountText>

          <ContentContainer isDarkMode={isDarkMode}>
            <MonthlyStatementAndDateSelectorContainer>
              <MonthlyStatementTitle>{i18n.t('Home.MonthlyStatement')}:</MonthlyStatementTitle>
              <DateSelectorButton onPress={() => setIsMonthPickerOpen(true)}>
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
              onConfirm={(date) => {
                setSelectedMonth(date);
                setIsMonthPickerOpen(false);
              }}
              onCancel={() => setIsMonthPickerOpen(false)}
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
                  innerRadius={50}
                  strokeColor={!isDarkMode ? theme.colors.white[200] : theme.colors.grey[400]}
                  strokeWidth={1}
                  textSize={14}
                  innerCircleColor={isDarkMode ? theme.colors.grey[400] : theme.colors.white[200]}
                  showTooltip
                  tooltipBackgroundColor={
                    isDarkMode ? theme.colors.grey[400] : theme.colors.white[200]
                  }
                  focusOnPress
                  showValuesAsTooltipText
                  textColor={isDarkMode ? theme.colors.white[200] : theme.colors.purple[100]}
                  centerLabelComponent={() => (
                    <PieChartCenterAmount>
                      {donutChartData.reduce((sum, item) => sum + item.value, 0)} Ft
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
                        colors={['#4547B8', '#8E65F7']}
                      />
                    }
                    data={donutChartData}
                    scrollEnabled
                    keyExtractor={(item, index) => `${item.label}-${index.toString()}`}
                    renderItem={({ item }) => (
                      <PieChartPurchaseCard
                        donutChartData={item}
                        onPress={() =>
                          navigation.navigate('Purchases', {
                            category: categoryTranslationMap[item.label] || item.label,
                            month: selectedMonth,
                          })
                        }
                      />
                    )}
                    showsVerticalScrollIndicator={false}
                  />
                </ListContainer>
              </PieChartContainer>
            )}

            {isLoading && <Loader color={theme.colors.purple[300]} size="large" />}

            {!donutChartData.length && !isLoading && (
              <NoLastFivePurchasesContainer>
                <NoLastFivePurchasesText>{i18n.t('NoPurchasesText')}</NoLastFivePurchasesText>
                <RedirectToPurchasesButton
                  style={!isDarkMode && buttonShadow}
                  onPress={() => navigation.navigate('Purchases')}
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
