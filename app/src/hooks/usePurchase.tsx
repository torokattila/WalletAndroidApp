/* eslint-disable react-hooks/exhaustive-deps */
import { getLocale } from '@core/translation-utils';
import { Purchase, PurchaseCategory } from '@model/domain';
import { PurchaseService } from '@model/services';
import { CategoryService } from '@model/services/category';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import translate from 'google-translate-api-x';
import { Timestamp } from 'firebase/firestore'; // Ensure this is imported
import i18n from 'i18n-js';
import { useEffect, useRef, useState } from 'react';
import { useDownload } from './useDownload';
import { useUser } from './useUser';
import { useUserId } from './useUserId';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

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
  const { userId } = useUserId();
  const { retry: fetchUser, user } = useUser();

  const categoryService = new CategoryService();

  const [amount, setAmount] = useState('0');
  const [allPurchasesAmountForThisMonth, setAllPurchasesAmountForThisMonth] = useState(0);
  const [category, setCategory] = useState<PurchaseCategory | string | null>(null);
  const [secondaryCategory, setSecondaryCategory] = useState<string | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const fromDate = useRef(new Date());
  const [createdAt, setCreatedAt] = useState<Date>(
    purchase?.createdAt ? purchase.createdAt.toDate() : new Date()
  );
  const [isCreatedAtPickerOpen, setIsCreatedAtPickerOpen] = useState(false);
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const toDate = useRef(new Date());
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
          const categoryText =
            typeof purchase.category === 'string' ? purchase.category : purchase.category.title;
          const translatedCategory = (
            await translate(categoryText, {
              to: locale === 'hun' ? 'hu' : 'en',
            })
          ).text;

          setCategory(translatedCategory);
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
    fromDate.current,
    toDate.current,
    'purchases'
  );

  const fetchPurchases = async () => {
    setIsLoading(true);

    try {
      const allPurchases = await purchaseService.joinCategoriesIntoPurchases(user.id);

      setPurchases(allPurchases);
    } catch (error) {
      console.error(`Error during fetching purchases: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllCategories = async () => {
    setIsLoading(true);

    try {
      const categoriesList = await categoryService.getAllCategories(user.id);

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
    } catch (error) {
      console.error(`Error during fetching categories: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);

    await fetchPurchases();
  };

  const stopRefreshing = () => setScreenRefreshing(false);

  const fetchThisMonthPurchasesAmount = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const purchasesAmountCurrentMonth = await purchaseService.getAllPurchaseAmountInCurrentMonth(
        user.id
      );

      setAllPurchasesAmountForThisMonth(purchasesAmountCurrentMonth);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPurchases = async ({
    categoryParam = PurchaseCategory.ALL,
    dates = { startDate: new Date(), endDate: new Date() },
  }: {
    categoryParam?: string | null;
    dates?: { startDate: Date; endDate: Date } | null;
  }): Promise<void> => {
    setIsLoading(true);

    try {
      console.log('Filtering purchases with:', { categoryParam, dates });

      if (!dates || !dates.startDate || !dates.endDate) {
        throw new Error('Invalid date range provided.');
      }

      const startDate = dates.startDate;
      const endDate = dates.endDate;

      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      const filterCategoryValue =
        categoryParam ||
        (filterCategory.current !== PurchaseCategory.ALL ? filterCategory.current : null);

      console.log('Filter category value:', filterCategoryValue);
      console.log({ startDate, endDate });

      const filteredPurchases = await purchaseService.filterPurchases(
        userId,
        { startDate, endDate },
        filterCategoryValue
      );

      console.log('Filtered purchases:', filteredPurchases);

      setPurchases(filteredPurchases);
    } catch (error) {
      console.error('Error during filtering purchases:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
        await purchaseService.createdPurchase(userId, amount, category, secondaryCategory);
        fetchUser();
        setAmount('0');
        setCategory(null);
        setSecondaryCategory(null);
        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.NewPurchaseSuccess'),
        });
      } catch (error) {
        setErrors({
          generalError: error,
        });
        toast.show({
          type: 'error',
          title: i18n.t('ToastNotification.SomethingWentWrong'),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleUpdatePurchase = async (): Promise<void> => {
    if (!purchase) {
      return;
    }

    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
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
      } catch (error) {
        setErrors({
          generalError: error,
        });
        toast.show({
          type: 'error',
          title: i18n.t('ToastNotification.SomethingWentWrong'),
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeletePurchase = async (): Promise<void> => {
    if (!purchase) {
      return;
    }

    try {
      setIsLoading(true);
      await purchaseService.deletePurchase(purchase?.id, userId);
      fetchUser();
      fetchPurchases();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.DeletePurchaseSuccess'),
      });
    } catch (error) {
      setErrors({
        generalError: error,
      });
      toast.show({
        type: 'error',
        title: i18n.t('ToastNotification.SomethingWentWrong'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
    setIsModalOpen(false);
    setIsEditModeModal(false);
    setCategory(PurchaseCategory.ALL);
  };

  const handleEditModalOpen = (editableIncome: Purchase) => {
    handleModalOpen();
    setSelectedPurchase(editableIncome);
    setIsEditModeModal(true);
  };

  const handleConfirmDialogOpen = () => setIsConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setIsConfirmDialogOpen(false);

  const handleConfirmDialogDelete = async () => {
    await handleDeletePurchase();
    handleConfirmDialogClose();
  };

  const handleDropdownChange = (item: CategoryDropdownValueType): void => setCategory(item.value);

  const handleFilterCategoryChange = async (item: CategoryDropdownValueType): Promise<void> => {
    try {
      console.log('Selected category:', item);

      filterCategory.current = item.value;

      await filterPurchases({
        categoryParam: filterCategory.current,
        dates: { startDate: fromDate.current, endDate: toDate.current },
      });
    } catch (error) {
      console.error('Error during category filtering:', error);
    }
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

  const handleFromDatePickerOpen = (): void => setIsFromDatePickerOpen(true);
  const handleFromDatePickerClose = (): void => setIsFromDatePickerOpen(false);
  const handleToDatePickerOpen = (): void => setIsToDatePickerOpen(true);
  const handleToDatePickerClose = (): void => setIsToDatePickerOpen(false);
  const handleCreatedAtPickerOpen = (): void => setIsCreatedAtPickerOpen(true);
  const handleCreatedAtPickerClose = (): void => setIsCreatedAtPickerOpen(false);

  const handleFromDateChange = async (date: Date): Promise<void> => {
    isDateFilterChanged.current = true;
    handleFromDatePickerClose();
    fromDate.current = date;
    await filterPurchases(null);
  };

  const handleToDateChange = async (date: Date): Promise<void> => {
    isDateFilterChanged.current = true;
    handleToDatePickerClose();
    toDate.current = date;
    await filterPurchases(null);
  };

  const handleCreatedAtChange = (date: Date): void => {
    setCreatedAt(date);
    handleCreatedAtPickerClose();
  };

  const handleClearFilters = async (): Promise<void> => {
    fromDate.current = new Date();
    toDate.current = new Date();
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
      setIsLoading(false);
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

  return {
    amount,
    category,
    purchases,
    allPurchasesAmountForThisMonth,
    isLoading,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isModalOpen,
    isEditModeModal,
    selectedPurchase,
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
    handleFromDatePickerOpen,
    fromDate,
    handleFromDatePickerClose,
    handleToDatePickerOpen,
    toDate,
    handleToDatePickerClose,
    handleFromDateChange,
    handleToDateChange,
    isFromDatePickerOpen,
    isToDatePickerOpen,
    isDateFilterChanged,
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
    filterPurchases,
  };
};
