/* eslint-disable curly */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import i18n from 'i18n-js';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { IncomeService } from '@model/services';
import { Income } from '@model/domain';
import { useUser } from './useUser';
import { useDownload } from './useDownload';
import { useModal } from './common/useModal';
import { useAsyncAction } from './common/useAsyncAction';
import { useDateRange } from './common/useDateRange';

export const useIncome = (income?: Income) => {
  const { retry: fetchUser, user } = useUser();
  const userId = user?.id;

  const [amount, setAmount] = useState<string>('0');
  const [title, setTitle] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { isLoading, execute } = useAsyncAction();
  const modal = useModal<Income>();
  const dateRange = useDateRange();

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [isFilterChanged, setIsFilterChanged] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [screenRefreshing, setScreenRefreshing] = useState(false);

  const toast = useToastNotificationStore();
  const incomeService = new IncomeService();
  const { handleDownloadButtonClick } = useDownload(
    incomes,
    dateRange.fromDate,
    dateRange.toDate,
    'incomes'
  );

  useEffect(() => {
    if (income) {
      setAmount(income.amount);
      setTitle(income.title);
    } else {
      setAmount('0');
      setTitle('');
    }
  }, [income]);

  const fetchIncomes = useCallback(async () => {
    await execute(async () => {
      const allIncomes = await incomeService.getAllIncomes(user.id);
      setIncomes(allIncomes);
    });
  }, [user.id]);

  const filterIncomes = useCallback(async () => {
    await execute(async () => {
      const filteredIncomes = await incomeService.getIncomesByDate(
        userId,
        dateRange.fromDate,
        dateRange.toDate
      );
      setIncomes(filteredIncomes);
    });
  }, [userId, dateRange.fromDate, dateRange.toDate]);

  const handlePullToRefresh = async () => {
    setScreenRefreshing(true);
    await fetchIncomes();
  };

  const stopRefreshing = () => setScreenRefreshing(false);

  const verifyForm = (): boolean => {
    if (amount === '0') {
      setErrors({ amount: i18n.t('Dialog.Incomes.AmountError') });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleCreateIncome = async (): Promise<void> => {
    if (!verifyForm()) return;

    await execute(async () => {
      await incomeService.createIncome(userId, amount, title);
      fetchUser();
      setAmount('0');
      setTitle('');
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.NewIncomeSuccess'),
      });
    });
  };

  const handleUpdateIncome = async (): Promise<void> => {
    if (!income || !verifyForm()) return;

    await execute(async () => {
      await incomeService.updateIncome(income.id, userId, { amount, title });
      fetchUser();
      fetchIncomes();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.EditIncomeSuccess'),
      });
    });
  };

  const handleDeleteIncome = async (): Promise<void> => {
    if (!income) return;

    await execute(async () => {
      await incomeService.deleteIncome(income.id, userId);
      fetchUser();
      fetchIncomes();
      toast.show({
        type: 'success',
        title: i18n.t('ToastNotification.DeleteIncomeSuccess'),
      });
    });
  };

  const handleModalOpen = () => modal.open();

  const handleModalClose = () => {
    modal.close();
    setAmount('0');
    setTitle('');
    setErrors({});
  };

  const handleEditModalOpen = (editableIncome: Income) => {
    modal.open(editableIncome);
  };

  const handleConfirmDialogOpen = () => setIsConfirmDialogOpen(true);
  const handleConfirmDialogClose = () => setIsConfirmDialogOpen(false);

  const handleConfirmDialogDelete = async () => {
    await handleDeleteIncome();
    handleConfirmDialogClose();
  };

  const handleTitleChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setTitle(e.nativeEvent.text);
  };

  const handleNumberChange = (value: string) => {
    const newAmount = amount === '0' ? value : amount + value;
    setAmount(newAmount);
  };

  const handleBackspacePress = () => {
    setAmount(amount.length === 1 ? '0' : amount.slice(0, -1));
  };

  const handleFromDateChange = async (date: Date) => {
    setIsFilterChanged(true);
    dateRange.setFromDate(date);
    await filterIncomes();
  };

  const handleToDateChange = async (date: Date) => {
    setIsFilterChanged(true);
    dateRange.setToDate(date);
    await filterIncomes();
  };

  const handleClearFilters = async () => {
    dateRange.clearDates();
    setIsFilterChanged(false);
    await fetchIncomes();
  };

  useEffect(() => {
    if (userId) {
      fetchIncomes();
    } else {
      setIncomes([]);
    }
  }, [userId]);

  useEffect(() => {
    if (!isLoading && screenRefreshing) {
      stopRefreshing();
    }
  }, [isLoading, incomes, screenRefreshing]);

  return {
    amount,
    title,
    errors,
    setErrors,
    isLoading,
    screenRefreshing,
    incomes,
    isModalOpen: modal.isOpen,
    selectedIncome: modal.data,
    isEditModeModal: modal.isEditMode,
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isConfirmDialogOpen,
    handleConfirmDialogOpen,
    handleConfirmDialogDelete,
    handleConfirmDialogClose,
    fromDate: dateRange.fromDate,
    toDate: dateRange.toDate,
    isFromDatePickerOpen: dateRange.isFromDatePickerOpen,
    isToDatePickerOpen: dateRange.isToDatePickerOpen,
    handleFromDatePickerOpen: dateRange.openFromDatePicker,
    handleFromDatePickerClose: dateRange.closeFromDatePicker,
    handleToDatePickerOpen: dateRange.openToDatePicker,
    handleToDatePickerClose: dateRange.closeToDatePicker,
    handleFromDateChange,
    handleToDateChange,
    isFilterChanged,
    handleClearFilters,
    handleTitleChange,
    handleNumberChange,
    handleBackspacePress,
    handleCreateIncome,
    handleUpdateIncome,
    handleDeleteIncome,
    handlePullToRefresh,
    stopRefreshing,
    handleDownloadButtonClick,
  };
};
