/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import i18n from 'i18n-js';
import { Unsubscribe } from 'firebase/firestore';
import { Purchase, PurchaseCategory } from '@model/domain';
import { PurchaseService } from '@model/services';
import { useUserId } from './useUserId';

type CategoryDropdownValueType = {
  label: string;
  value: PurchaseCategory;
};

export const usePurchase = (purchase?: Purchase) => {
  const { userId } = useUserId();

  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<PurchaseCategory>(PurchaseCategory.ALL);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState<CategoryDropdownValueType[]>([
    { label: i18n.t('Purchases.Categories.All'), value: PurchaseCategory.ALL },
    { label: i18n.t('Purchases.Categories.Food'), value: PurchaseCategory.FOOD },
    { label: i18n.t('Purchases.Categories.Clothing'), value: PurchaseCategory.CLOTHING },
    { label: i18n.t('Purchases.Categories.Entertainment'), value: PurchaseCategory.ENTERTAINMENT },
    { label: i18n.t('Purchases.Categories.Other'), value: PurchaseCategory.OTHER },
  ]);

  useEffect(() => {
    if (purchase) {
      setAmount(purchase.amount);
      setCategory(purchase.category);
    } else {
      setAmount('0');
      setCategory(PurchaseCategory.ALL);
    }
  }, [purchase]);

  const purchaseService = new PurchaseService();
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

  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedPurchase(null);
    setIsModalOpen(false);
    setIsEditModeModal(false);
    setIsCategoryDropdownOpen(false);
    setCategory(PurchaseCategory.ALL);
  };

  const handleEditModalOpen = (editableIncome: Purchase) => {
    handleModalOpen();
    setSelectedPurchase(editableIncome);
    setIsEditModeModal(true);
  };

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
    setCategory,
    purchases,
    isLoading,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isModalOpen,
    isEditModeModal,
    selectedPurchase,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    categories,
    setCategories,
  };
};
