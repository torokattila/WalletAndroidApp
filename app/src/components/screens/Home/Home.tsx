/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { Icon } from '@components/shared';
import { formatAmount } from '@core/format-amount';
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
  BalanceContainer,
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

const shiftHue = (hex: string, degrees = 80): string => {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return hex;

  // Hex → RGB → HSL
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  const d = max - min;
  let h = 0;
  let s = 0;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }

  // Rotate hue, keep saturation & lightness
  const newH = ((h * 360 + degrees) % 360) / 360;

  // HSL → RGB → Hex
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t: number): number => {
    const tc = ((t % 1) + 1) % 1;
    if (tc < 1 / 6) return p + (q - p) * 6 * tc;
    if (tc < 1 / 2) return q;
    if (tc < 2 / 3) return p + (q - p) * (2 / 3 - tc) * 6;
    return p;
  };
  const toHex = (v: number) =>
    Math.round((s === 0 ? l : v) * 255)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(hue2rgb(newH + 1 / 3))}${toHex(hue2rgb(newH))}${toHex(hue2rgb(newH - 1 / 3))}`;
};

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
      const purchaseDate = purchase.createdAt.toDate();
      return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    if (purchasesForSelectedMonth.length === 0) {
      return [];
    }

    const totalAmount = purchasesForSelectedMonth.reduce(
      (sum, purchase) => sum + parseFloat(purchase.amount || '0'),
      0
    );

    const categoryTotals: {
      [category: string]: {
        amount: number;
        color: string;
        originalCategory: string;
        icon?: string;
      };
    } = {};

    purchasesForSelectedMonth.forEach((purchase) => {
      const category: string =
        typeof purchase.categoryObject?.title === 'string'
          ? purchase.categoryObject.title
          : typeof purchase.category === 'string'
          ? purchase.category
          : '';
      const amount = parseFloat(purchase.amount || '0');
      const color = purchase.categoryObject?.color || theme.colors.grey[500];
      const originalCategory =
        typeof purchase.category === 'string' ? purchase.category : purchase.category.title;
      const icon = purchase?.categoryObject?.icon ?? '';

      if (categoryTotals[category]) {
        categoryTotals[category].amount += amount;
      } else {
        categoryTotals[category] = { amount, color, originalCategory, icon };
      }
    });

    return Object.entries(categoryTotals)
      .map(([category, { amount, color, originalCategory, icon }]) => ({
        label: category,
        value: amount,
        text: `${category} - ${Math.round((amount / totalAmount) * 100)}%`,
        percentage: Math.round((amount / totalAmount) * 100),
        color,
        gradientCenterColor: shiftHue(color),
        originalCategory,
        icon,
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
                  innerRadius={60}
                  showGradient
                  strokeColor={isDarkMode ? theme.colors.grey[1000] : theme.colors.white[100]}
                  strokeWidth={1}
                  textSize={14}
                  innerCircleColor={isDarkMode ? theme.colors.grey[800] : theme.colors.white[200]}
                  innerCircleBorderWidth={2}
                  innerCircleBorderColor={
                    isDarkMode ? theme.colors.grey[950] : theme.colors.white[100]
                  }
                  showTooltip
                  tooltipBackgroundColor={
                    isDarkMode ? theme.colors.grey[900] : theme.colors.white[200]
                  }
                  tooltipBorderRadius={10}
                  tooltipDuration={1900}
                  focusOnPress
                  showValuesAsTooltipText
                  textColor={isDarkMode ? theme.colors.white[200] : theme.colors.magenta[100]}
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

                          navigation.navigate('Purchases', {
                            category: item.originalCategory,
                            fromDate: firstDayOfSelectedMonth,
                            toDate: lastDayOfSelectedMonth,
                          });
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
