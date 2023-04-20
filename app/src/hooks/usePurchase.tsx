/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
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

export const usePurchase = (purchase?: Purchase) => {
  const { userId } = useUserId();
  const { retry: fetchUser } = useUser();

  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<PurchaseCategory | null>(null);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleModalOpen = (): void => setIsModalOpen(true);
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

  const handleDropdownChange = (item: CategoryDropdownValueType): void => setCategory(item.value);

  useEffect(() => {
    if (userId) {
      fetchPurchases();
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
    setAmount,
    category,
    purchases,
    isLoading,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isModalOpen,
    isEditModeModal,
    selectedPurchase,
    categories,
    handleDropdownChange,
    handleCreatePurchase,
    errors,
  };
};
