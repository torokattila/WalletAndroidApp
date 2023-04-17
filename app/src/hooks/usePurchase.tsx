/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Unsubscribe } from 'firebase/firestore';
import { Purchase, PurchaseCategory } from '@model/domain';
import { PurchaseService } from '@model/services';
import { useUserId } from './useUserId';

export const usePurchase = (purchase?: Purchase) => {
  const { userId } = useUserId();

  const [amount, setAmount] = useState('0');
  const [category, setCategory] = useState<PurchaseCategory>(PurchaseCategory.OTHER);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (purchase) {
      setAmount(purchase.amount);
      setCategory(purchase.category);
    } else {
      setAmount('0');
      setCategory(PurchaseCategory.OTHER);
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
    category,
    purchases,
    isLoading,
  };
};
