/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import i18n from 'i18n-js';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { IncomeService } from '@model/services';
import { Income } from '@model/domain';
import { Unsubscribe } from 'firebase/firestore';
import { useUser } from './useUser';
import { useUserId } from './useUserId';

export const useIncome = (income?: Income) => {
  const { retry: fetchUser } = useUser();
  const { userId } = useUserId();
  const [amount, setAmount] = useState<string>('0');
  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isFromDatePickerOpen, setIsFromDatePickerOpen] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setTitle(income.title);
    } else {
      setAmount('0');
      setTitle('');
    }
  }, [income]);

  const toast = useToastNotificationStore();
  const incomeService = new IncomeService();
  let unsubscribe: Unsubscribe;

  const fetchIncomes = async () => {
    setIsLoading(true);

    unsubscribe = await incomeService.getAllIncomes(
      userId,
      (updatedIncomes) => {
        setIncomes(updatedIncomes);
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
    } else {
      setErrors({});
      return true;
    }
  };

  const handleCreateIncome = async (): Promise<void> => {
    const isFormVerified = verifyForm();

    if (isFormVerified) {
      try {
        setIsLoading(true);
        await incomeService.createIncome(userId, amount, title);
        fetchUser();
        setAmount('0');
        setTitle('');
        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.NewIncomeSuccess'),
        });
      } catch (error: any) {
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

  const handleUpdateIncome = async (): Promise<void> => {
    if (!income) {
      return;
    }

    try {
      setIsLoading(true);
      await incomeService.updateIncome(income?.id, userId, { amount, title });
      fetchUser();
      fetchIncomes();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.EditIncomeSuccess'),
      });
    } catch (error: any) {
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

  const handleDeleteIncome = async (): Promise<void> => {
    if (!income) {
      return;
    }

    try {
      setIsLoading(true);
      await incomeService.deleteIncome(income?.id, userId);
      fetchUser();
      fetchIncomes();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.DeleteIncomeSuccess'),
      });
    } catch (error: any) {
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

  const handleFromDatePickerOpen = (): void => setIsFromDatePickerOpen(true);
  const handleFromDatePickerClose = (): void => setIsFromDatePickerOpen(false);
  const handleToDatePickerOpen = (): void => setIsToDatePickerOpen(true);
  const handleToDatePickerClose = (): void => setIsToDatePickerOpen(false);

  const handleFromDateChange = (date: Date): void => {
    setIsFilterChanged(true);
    handleFromDatePickerClose();
    setFromDate(date);
  };

  const handleToDateChange = (date: Date): void => {
    setIsFilterChanged(true);
    handleToDatePickerClose();
    setToDate(date);
  };

  const handleClearFilters = (): void => {
    setFromDate(new Date());
    setToDate(new Date());
    setIsFilterChanged(false);
  };

  useEffect(() => {
    if (userId) {
      fetchIncomes();
    } else {
      setIncomes([]);
      setIsLoading(false);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [userId]);

  return {
    amount,
    setAmount,
    title,
    setTitle,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    handleCreateIncome,
    handleUpdateIncome,
    handleDeleteIncome,
    errors,
    setErrors,
    isLoading,
    incomes,
    retry: fetchIncomes,
    isFromDatePickerOpen,
    handleFromDatePickerOpen,
    handleFromDatePickerClose,
    handleFromDateChange,
    fromDate,
    isToDatePickerOpen,
    handleToDatePickerOpen,
    handleToDatePickerClose,
    handleToDateChange,
    toDate,
    handleClearFilters,
    isFilterChanged,
  };
};
