import { ROUTES } from '@constants/routes';
import { Purchase } from '@model/domain';
import type { TabStackParams } from '@navigation/Tabs/TabStack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { theme } from '@styles/theme';
import { useMemo, useState } from 'react';
import { useRefreshControl } from './common';
import { usePurchase } from './usePurchase';
import { useUser } from './useUser';

export const useHome = () => {
  const navigation = useNavigation<BottomTabNavigationProp<TabStackParams>>();
  const { isRefreshing: screenRefreshing, onRefresh } = useRefreshControl();
  const {
    purchases,
    isModalOpen,
    handleModalClose,
    isEditModeModal,
    selectedPurchase,
    isLoading,
    retry: fetchPurchases,
  } = usePurchase();
  const { user } = useUser();

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);

  const handlePullToRefresh = () => onRefresh(fetchPurchases);

  const handleMonthPickerOpen = () => setIsMonthPickerOpen(true);
  const handleMonthPickerClose = () => setIsMonthPickerOpen(false);

  const handleMonthChange = (date: Date) => {
    setSelectedMonth(date);
    handleMonthPickerClose();
  };

  const navigateToPurchases = (category: string, fromDate: Date, toDate: Date) => {
    navigation.navigate(ROUTES.PURCHASES, { category, fromDate, toDate });
  };

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

  return {
    user,
    purchases,
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
  };
};
