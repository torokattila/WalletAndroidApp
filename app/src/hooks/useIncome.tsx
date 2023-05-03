/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { Unsubscribe } from 'firebase/firestore';
import i18n from 'i18n-js';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { IncomeService } from '@model/services';
import { Income } from '@model/domain';
import { useUser } from './useUser';
import { useUserId } from './useUserId';
import { useDownload } from './useDownload';

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
  const fromDate = useRef(new Date());
  const [isToDatePickerOpen, setIsToDatePickerOpen] = useState(false);
  const toDate = useRef(new Date());
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState<Income | null>(null);
  const [isEditModeModal, setIsEditModeModal] = useState(false);

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
  const { handleDownloadButtonClick } = useDownload(
    incomes,
    fromDate.current,
    toDate.current,
    'incomes'
  );
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

  const filterIncomes = async () => {
    setIsLoading(true);

    const fromDateMidnight = fromDate;
    fromDateMidnight.current.setHours(0, 0, 0, 0);
    const endDateMidnight = toDate;
    endDateMidnight.current.setHours(23, 59, 0, 0);

    try {
      const filteredIncomes = await incomeService.getIncomesByDate(
        userId,
        fromDateMidnight.current,
        endDateMidnight.current
      );

      setIncomes(filteredIncomes);
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

    const isFormVerified = verifyForm();

    if (isFormVerified) {
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

  const handleFromDateChange = async (date: Date): Promise<void> => {
    setIsFilterChanged(true);
    handleFromDatePickerClose();
    fromDate.current = date;
    await filterIncomes();
  };

  const handleToDateChange = async (date: Date): Promise<void> => {
    setIsFilterChanged(true);
    handleToDatePickerClose();
    toDate.current = date;
    await filterIncomes();
  };

  const handleClearFilters = async (): Promise<void> => {
    fromDate.current = new Date();
    toDate.current = new Date();
    setIsFilterChanged(false);
    await fetchIncomes();
  };

  const handleModalOpen = (): void => setIsModalOpen(true);
  const handleModalClose = (): void => {
    setIsModalOpen(false);
    setSelectedIncome(null);
    setIsModalOpen(false);
    setIsEditModeModal(false);
  };

  const handleEditModalOpen = (editableIncome: Income) => {
    handleModalOpen();
    setSelectedIncome(editableIncome);
    setIsEditModeModal(true);
  };

  const handleTitleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTitle(e.nativeEvent.text);
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

  const handleConfirmDialogOpen = () => setIsConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setIsConfirmDialogOpen(false);

  const handleConfirmDialogDelete = async () => {
    await handleDeleteIncome();
    handleConfirmDialogClose();
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
    handleTitleChange,
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
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isModalOpen,
    selectedIncome,
    isEditModeModal,
    handleDownloadButtonClick,
    handleNumberChange,
    handleBackspacePress,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
  };
};
