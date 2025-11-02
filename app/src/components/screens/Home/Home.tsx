/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { CreditCard } from '@components/CreditCard';
import { useDarkMode } from '@hooks/useDarkMode';
import { useHome } from '@hooks/useHome';
import { usePurchase } from '@hooks/usePurchase';
import { Purchase } from '@model/domain';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import { FC, useEffect, useMemo } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { PurchaseModal } from '../Purchases/PurchaseModal';
import {
  Container,
  ContentContainer,
  ListContainer,
  Loader,
  NoLastFivePurchasesContainer,
  NoLastFivePurchasesText,
  PieChartCenterAmount,
  PieChartContainer,
  RedirectToPurchasesButton,
  scrollViewStyle,
  StyledLinearGradient,
  WelcomeText,
} from './Home.styles';
import PieChartPurchaseCard from './PieChartPurchaseCard/PieChartPurchaseCard';

const buttonShadow = {
  elevation: 10,
  shadowColor: theme.colors.black,
  shadowOffset: { width: -2, height: 20 },
  shadowOpacity: 0.7,
  shadowRadius: 20,
};

export const Home: FC = () => {
  const { isDarkMode } = useDarkMode();
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
  const { user, localizedName, navigation } = useHome();

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

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const purchasesForCurrentMonth = purchasesProp.filter((purchase) => {
      const purchaseDate = purchase.updatedAt.toDate();
      return purchaseDate.getMonth() === currentMonth && purchaseDate.getFullYear() === currentYear;
    });

    if (purchasesForCurrentMonth.length === 0) {
      return [];
    }

    const totalAmount = purchasesForCurrentMonth.reduce(
      (sum, purchase) => sum + parseFloat(purchase.amount || '0'),
      0
    );

    const categoryTotals: { [category: string]: { amount: number; color: string } } = {};

    purchasesForCurrentMonth.forEach((purchase) => {
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
        percentage: Math.round((amount / totalAmount) * 100), // Calculate percentage based on current month total
        color,
      }))
      .sort((a, b) => b.percentage - a.percentage);
  };

  const donutChartData = useMemo(() => aggregatePurchasesByCategory(purchases), [purchases]);

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
          <WelcomeText>Hello {user?.firstname}!</WelcomeText>

          <ContentContainer isDarkMode={isDarkMode}>
            <CreditCard name={localizedName} balance={user?.balance} />

            {donutChartData.length > 0 && (
              <PieChartContainer>
                <PieChart
                  data={donutChartData ?? []}
                  donut
                  radius={100}
                  innerRadius={60}
                  textSize={16}
                  showText
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
                    renderItem={({ item }) => <PieChartPurchaseCard donutChartData={item} />}
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
