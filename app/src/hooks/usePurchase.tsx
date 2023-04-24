/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import i18n from 'i18n-js';
import { Unsubscribe } from 'firebase/firestore';
import { Purchase, PurchaseCategory } from '@model/domain';
import { PurchaseService } from '@model/services';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { useUserId } from './useUserId';
import { useUser } from './useUser';

type CategoryDropdownValueType = {
  label: string;
  value: PurchaseCategory;
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
  const { retry: fetchUser } = useUser();

  const [amount, setAmount] = useState('0');
  const [allPurchasesAmountForThisMonth, setAllPurchasesAmountForThisMonth] = useState(0);
  const [category, setCategory] = useState<PurchaseCategory | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const fromDate = useRef(new Date());
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const toDate = useRef(new Date());
  const filterCategory = useRef(null);
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  useEffect(() => {
    if (purchase) {
      setAmount(purchase.amount);
      setCategory(purchase.category);
    } else {
      setAmount('0');
      setCategory(null);
    }
  }, [purchase]);

  const purchaseService = new PurchaseService();
  const toast = useToastNotificationStore();

  let unsubscribe: Unsubscribe;

  const fetchPurchases = async () => {
    setIsLoading(true);

    unsubscribe = await purchaseService.getAllPurchases(
      userId,
      (updatedPurchases) => {
        setPurchases(updatedPurchases);
      },
      (error) => {
        console.error(error);
      }
    );

    setIsLoading(false);
  };

  const fetchThisMonthPurchasesAmount = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const purchasesAmountCurrentMonth = await purchaseService.getAllPurchaseAmountInCurrentMonth(
        userId
      );

      setAllPurchasesAmountForThisMonth(purchasesAmountCurrentMonth);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterPurchases = async (): Promise<void> => {
    setIsLoading(true);

    const fromDateMidnight = fromDate;
    fromDateMidnight.current.setHours(0, 0, 0, 0);
    const toDateMidnight = toDate;
    toDateMidnight.current.setHours(23, 59, 0, 0);

    try {
      const filteredPurchases = await purchaseService.filterPurchases(
        userId,
        fromDateMidnight.current,
        toDateMidnight.current,
        filterCategory.current
      );

      setPurchases(filteredPurchases);
    } catch (error) {
      console.error(error);
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
        await purchaseService.createdPurchase(userId, amount, category);
        fetchUser();
        setAmount('0');
        setCategory(null);
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
        await purchaseService.updatePurchase(purchase?.id, userId, { amount, category });

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
    setIsFilterChanged(true);
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

  const handleFromDatePickerOpen = (): void => setIsFromDatePickerOpen(true);
  const handleFromDatePickerClose = (): void => setIsFromDatePickerOpen(false);
  const handleToDatePickerOpen = (): void => setIsToDatePickerOpen(true);
  const handleToDatePickerClose = (): void => setIsToDatePickerOpen(false);

  const handleFromDateChange = async (date: Date): Promise<void> => {
    setIsFilterChanged(true);
    handleFromDatePickerClose();
    fromDate.current = date;
    await filterPurchases();
  };

  const handleToDateChange = async (date: Date): Promise<void> => {
    setIsFilterChanged(true);
    handleToDatePickerClose();
    toDate.current = date;
    await filterPurchases();
  };

  const handleClearFilters = async (): Promise<void> => {
    fromDate.current = new Date();
    toDate.current = new Date();
    filterCategory.current = PurchaseCategory.ALL;
    setIsFilterChanged(false);
    await fetchPurchases();
  };

  useEffect(() => {
    if (userId) {
      fetchPurchases();
      fetchThisMonthPurchasesAmount();
    } else {
      setPurchases([]);
      setIsLoading(false);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [userId]);

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
    isFilterChanged,
    filterCategory,
    handleClearFilters,
    handleFilterCategoryChange,
    handleUpdatePurchase,
  };
};
