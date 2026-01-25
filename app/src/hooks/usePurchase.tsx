/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import { getLocale } from '@core/translation-utils';
import { Purchase, PurchaseCategory } from '@model/domain';
import { defaultCategories } from '@model/domain/constants/categories';
import { PurchaseService } from '@model/services';
import { CategoryService } from '@model/services/category';
import { TabStackParams } from '@navigation/Tabs';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { Timestamp } from 'firebase/firestore';
import translate from 'google-translate-api-x';
import i18n from 'i18n-js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { useDownload } from './useDownload';
import { useUser } from './useUser';
import { useAsyncAction, useDateRange, useModal } from './common';

export type CategoryDropdownValueType = {
  label: string;
  value: PurchaseCategory | string;
};

const categories: CategoryDropdownValueType[] = [
  { label: i18n.t('Purchases.Categories.food'), value: PurchaseCategory.FOOD },
  { label: i18n.t('Purchases.Categories.clothing'), value: PurchaseCategory.CLOTHING },
  { label: i18n.t('Purchases.Categories.entertainment'), value: PurchaseCategory.ENTERTAINMENT },
  { label: i18n.t('Purchases.Categories.other'), value: PurchaseCategory.OTHER },
];

const filterCategories: CategoryDropdownValueType[] = [
  { label: i18n.t('Purchases.Categories.all'), value: PurchaseCategory.ALL },
  ...categories,
];

export const usePurchase = (purchase?: Purchase) => {
  const { retry: fetchUser, user } = useUser();
  const route = useRoute<RouteProp<TabStackParams, 'Purchases'>>();
  const navigation = useNavigation();
  const userId = user?.id;

  const categoryService = new CategoryService();

  const [amount, setAmount] = useState('0');
  const [allPurchasesAmountForThisMonth, setAllPurchasesAmountForThisMonth] = useState(0);
  const [category, setCategory] = useState<PurchaseCategory | string | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { isLoading, execute } = useAsyncAction();
  const modal = useModal<Purchase>();
  const dateRange = useDateRange();

  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [createdAt, setCreatedAt] = useState<Date>(
    purchase?.createdAt ? purchase.createdAt.toDate() : new Date()
  );
  const [isCreatedAtPickerOpen, setIsCreatedAtPickerOpen] = useState(false);
  const filterCategory = useRef(null);
  const [isCategoryFilterChanged, setIsCategoryFilterChanged] = useState(false);
  const isDateFilterChanged = useRef(false);
  const [isDateFiltersShown, setIsDateFiltersShown] = useState(false);
  const [screenRefreshing, setScreenRefreshing] = useState(false);
  const [allCategories, setAllCategories] = useState<CategoryDropdownValueType[]>([]);

  const locale = getLocale();

  useEffect(() => {
    const setAmountAndCategory = async () => {
      if (purchase) {
        setAmount(purchase.amount);
        setSecondaryCategory(purchase.secondaryCategory ?? null);

        const isCategoryExistsInDefaultCategories = categories.find(
          (cat) => cat.value.toLowerCase().trim() === purchase.category
        );

        if (isCategoryExistsInDefaultCategories) {
          setCategory(purchase.category as PurchaseCategory | string);
        } else {
          const isCategoryAString = typeof purchase.category === 'string';
          const categoryText = isCategoryAString ? purchase.category : purchase.category.title;
          const categoryTextWithoutTranslation = isCategoryAString
            ? purchase.category
            : purchase.category.title;
          const translatedCategory = (
            await translate(categoryText, {
              to: locale === 'hun' ? 'hu' : 'en',
            })
          ).text;

          if (
            !isCategoryAString &&
            purchase.category &&
            typeof purchase.category === 'object' &&
            'isDefault' in purchase.category &&
            !purchase.category.isDefault
          ) {
            setCategory(translatedCategory);
          } else {
            setCategory(categoryTextWithoutTranslation);
          }
        }
      } else {
        setAmount('0');
        setCategory(null);
      }
    };

    setAmountAndCategory();
  }, [purchase]);

  const purchaseService = new PurchaseService();
  const toast = useToastNotificationStore();
  const { handleDownloadButtonClick } = useDownload(
    purchases,
    dateRange.fromDate,
    dateRange.toDate,
    'purchases'
  );

  const fetchPurchases = useCallback(async () => {
    await execute(async () => {
      const allPurchases = await purchaseService.joinCategoriesIntoPurchases(userId);
      setPurchases(allPurchases);
    });
  }, [userId]);

  const fetchAllCategories = useCallback(async () => {
    await execute(async () => {
      const categoriesList = await categoryService.getAllCategories(userId);
      const categoriesWithLabelAndValue: CategoryDropdownValueType[] = [];

      for (const categ of categoriesList) {
        categoriesWithLabelAndValue.push({
          label: categ?.isDefault
            ? (await translate(categ.title, { to: locale === 'hun' ? 'hu' : 'en' })).text
            : categ.title,
          value: categ?.isDefault
            ? (await translate(categ.title, { to: locale === 'hun' ? 'hu' : 'en' })).text
            : categ.title,
        });
      }

      setAllCategories([...filterCategories, ...categoriesWithLabelAndValue]);
    });
  }, [userId, locale]);

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);

    await fetchPurchases();
  };

  const stopRefreshing = () => setScreenRefreshing(false);

  const fetchThisMonthPurchasesAmount = useCallback(async () => {
    await execute(async () => {
      const purchasesAmountCurrentMonth = await purchaseService.getAllPurchaseAmountInCurrentMonth(
        userId
      );
      setAllPurchasesAmountForThisMonth(purchasesAmountCurrentMonth);
    });
  }, [userId]);

  const filterPurchases = useCallback(async () => {
    await execute(async () => {
      const filteredPurchases = await purchaseService.filterPurchases(
        userId,
        isDateFilterChanged.current
          ? {
              startDate: dateRange.fromDate,
              endDate: dateRange.toDate,
            }
          : null,
        filterCategory.current !== PurchaseCategory.ALL ? filterCategory.current : null
      );

      const userCategories = await categoryService.getAllCategories(userId);
      const categoriesForJoin = [...defaultCategories, ...userCategories];

      const purchasesWithCategories = filteredPurchases.map((purchaseItem) => {
        const categoryObj = categoriesForJoin.find((cat) => {
          if (cat.isDefault) {
            return cat.title === i18n.t(`Purchases.Categories.${purchaseItem.category}`);
          }
          return cat.title === purchaseItem.category;
        });

        return {
          ...purchaseItem,
          categoryObject: categoryObj || null,
        };
      });

      setPurchases(purchasesWithCategories);
    });
  }, [userId, dateRange.fromDate, dateRange.toDate]);

  const verifyForm = (): boolean => {
    if (amount === '0') {
      setErrors({
        amount: i18n.t('Dialog.Incomes.AmountError'),
      });
      return false;
    } else if (!category) {
      setErrors({
        category: i18n.t('Purchases.CategoryError'),
      });
    } else {
      setErrors({});
      return true;
    }
  };

  const handleCreatePurchase = async (): Promise<void> => {
    if (!verifyForm()) return;

    await execute(async () => {
      await purchaseService.createdPurchase(userId, amount, category, secondaryCategory);
      fetchUser();
      setAmount('0');
      setCategory(null);
      setSecondaryCategory(null);
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.NewPurchaseSuccess'),
      });
    });
  };

  const handleUpdatePurchase = async (): Promise<void> => {
    if (!purchase || !verifyForm()) return;

    await execute(async () => {
      await purchaseService.updatePurchase(purchase?.id, userId, {
        amount,
        category,
        secondaryCategory,
        createdAt: Timestamp.fromDate(createdAt),
      });

      fetchUser();
      fetchPurchases();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.EditPurchaseSuccess'),
      });
    });
  };

  const handleDeletePurchase = async (): Promise<void> => {
    if (!purchase) return;

    await execute(async () => {
      await purchaseService.deletePurchase(purchase?.id, userId);
      fetchUser();
      fetchPurchases();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.DeletePurchaseSuccess'),
      });
    });
  };

  const handleModalOpen = () => modal.open();

  const handleModalClose = () => {
    modal.close();
    setAmount('0');
    setCategory(null);
    setSecondaryCategory(null);
    setCreatedAt(new Date());
  };

  const handleEditModalOpen = (editablePurchase: Purchase) => {
    modal.open(editablePurchase);
  };

  const handleConfirmDialogOpen = () => setIsConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setIsConfirmDialogOpen(false);

  const handleConfirmDialogDelete = async () => {
    await handleDeletePurchase();
    handleConfirmDialogClose();
  };

  const handleDropdownChange = (item: CategoryDropdownValueType): void => setCategory(item.value);

  const handleFilterCategoryChange = async (item: CategoryDropdownValueType): Promise<void> => {
    if (item.value !== PurchaseCategory.ALL) {
      setIsCategoryFilterChanged(true);
    }
    filterCategory.current = item.value;
    await filterPurchases();
  };

  const handleNumberChange = (value: string): void => {
    let newInputNumber = '';

    if (amount === '0') {
      newInputNumber = '' + value;
    } else {
      newInputNumber = amount + value;
    }

    setAmount(newInputNumber);
  };

  const handleBackspacePress = (): void => {
    if (amount.length <= 1) {
      setAmount('0');
    } else {
      setAmount(amount.slice(0, -1));
    }
  };

  const showDateFilters = (): void => setIsDateFiltersShown(true);
  const hideDateFilters = (): void => setIsDateFiltersShown(false);
  const handleCreatedAtPickerOpen = (): void => setIsCreatedAtPickerOpen(true);
  const handleCreatedAtPickerClose = (): void => setIsCreatedAtPickerOpen(false);

  const handleFromDateChange = async (date: Date): Promise<void> => {
    isDateFilterChanged.current = true;
    dateRange.setFromDate(date);
    await filterPurchases();
  };

  const handleToDateChange = async (date: Date): Promise<void> => {
    isDateFilterChanged.current = true;
    dateRange.setToDate(date);
    await filterPurchases();
  };

  const handleCreatedAtChange = (date: Date): void => {
    setCreatedAt(date);
    handleCreatedAtPickerClose();
  };

  const handleClearFilters = async (): Promise<void> => {
    dateRange.clearDates();
    filterCategory.current = PurchaseCategory.ALL;
    setIsCategoryFilterChanged(false);
    isDateFilterChanged.current = false;
    await fetchPurchases();
  };

  const handleSecondaryCategoryChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setSecondaryCategory(e.nativeEvent.text);
  };

  useEffect(() => {
    if (userId) {
      fetchPurchases();
      fetchThisMonthPurchasesAmount();
      fetchAllCategories();
    } else {
      setPurchases([]);
      setAllCategories([]);
    }
  }, [userId]);

  useEffect(() => {
    if (!isLoading && screenRefreshing) {
      stopRefreshing();
    }
  }, [isLoading, purchases, screenRefreshing]);

  useEffect(() => {
    if (purchase) {
      setCreatedAt(purchase.createdAt.toDate());
    }
  }, [purchase]);

  useEffect(() => {
    if (route.params?.category && route.params?.fromDate && route.params?.toDate && userId) {
      filterCategory.current = route.params.category;
      setIsCategoryFilterChanged(true);

      const fromDate = new Date(route.params.fromDate);
      const toDate = new Date(route.params.toDate);
      dateRange.setFromDate(fromDate);
      dateRange.setToDate(toDate);
      isDateFilterChanged.current = true;
      // Don't call filterPurchases here - let the dates update first
    }
  }, [route.params, userId]);

  // Separate effect to filter purchases when dates are updated from navigation
  useEffect(() => {
    if (isCategoryFilterChanged && dateRange.fromDate && dateRange.toDate && userId) {
      filterPurchases();
    }
  }, [dateRange.fromDate, dateRange.toDate, isCategoryFilterChanged, userId, filterPurchases]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      dateRange.clearDates();
      filterCategory.current = null;
      setIsCategoryFilterChanged(false);
      isDateFilterChanged.current = false;
      setIsDateFiltersShown(false);
      filterPurchases();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (!route.params?.category && !route.params?.fromDate && !route.params?.toDate && userId) {
        fetchPurchases();
      }
    });

    return unsubscribe;
  }, [navigation, route.params, userId]);

  return {
    amount,
    category,
    purchases,
    allPurchasesAmountForThisMonth,
    isLoading,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isModalOpen: modal.isOpen,
    isEditModeModal: modal.isEditMode,
    selectedPurchase: modal.data,
    categories,
    filterCategories,
    handleDropdownChange,
    handleCreatePurchase,
    errors,
    setErrors,
    handleDeletePurchase,
    isConfirmDialogOpen,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
    handleNumberChange,
    handleBackspacePress,
    handleFromDatePickerOpen: dateRange.openFromDatePicker,
    fromDate: dateRange.fromDate,
    handleFromDatePickerClose: dateRange.closeFromDatePicker,
    handleToDatePickerOpen: dateRange.openToDatePicker,
    toDate: dateRange.toDate,
    handleToDatePickerClose: dateRange.closeToDatePicker,
    handleFromDateChange,
    handleToDateChange,
    isFromDatePickerOpen: dateRange.isFromDatePickerOpen,
    isToDatePickerOpen: dateRange.isToDatePickerOpen,
    isDateFilterChanged: isDateFilterChanged.current,
    isCategoryFilterChanged,
    filterCategory,
    handleClearFilters,
    handleFilterCategoryChange,
    handleUpdatePurchase,
    isDateFiltersShown,
    showDateFilters,
    hideDateFilters,
    handleDownloadButtonClick,
    retry: fetchPurchases,
    screenRefreshing,
    handlePullToRefresh,
    stopRefreshing,
    allCategories,
    secondaryCategory,
    handleSecondaryCategoryChange,
    createdAt,
    isCreatedAtPickerOpen,
    handleCreatedAtPickerOpen,
    handleCreatedAtPickerClose,
    handleCreatedAtChange,
  };
};
