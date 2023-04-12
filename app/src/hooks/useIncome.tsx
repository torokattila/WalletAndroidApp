/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Unsubscribe } from 'firebase/firestore';
import { PermissionsAndroid } from 'react-native';
import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import PushNotification, { Importance } from 'react-native-push-notification';
import uuid from 'react-native-uuid';
import XLSX from 'xlsx';
import i18n from 'i18n-js';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { IncomeService } from '@model/services';
import { Income } from '@model/domain';
import { formatDate } from '@core/date-utils';
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

  const exportIncomesToExcel = async (): Promise<void> => {
    const workBook = XLSX.utils.book_new();
    const workSheet = XLSX.utils.json_to_sheet(incomes);
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    const output = XLSX.write(workBook, { type: 'binary', bookType: 'xlsx' });

    const formattedStartDate = formatDate(fromDate.current);
    const formattedToDate = formatDate(toDate.current).slice(0, -1);

    writeFile(
      DownloadDirectoryPath + `/incomes_${formattedStartDate}-${formattedToDate}.xlsx`,
      output,
      'ascii'
    );

    const channelId = uuid.v4();

    PushNotification.createChannel({
      channelId,
      channelName: `Notification channel - ${channelId}`,
      importance: Importance.HIGH,
      vibrate: true,
    });

    PushNotification.localNotification({
      channelId,
      vibrate: true,
      title: i18n.t('ToastNotification.SuccessfulDownload'),
      message: `${formattedStartDate}-${formattedToDate}.xlsx`,
    });

    toast.show({
      type: 'success',
      title: i18n.t('ToastNotification.SuccessfulDownload'),
    });
  };

  const handleDownloadButtonClick = async (): Promise<void> => {
    try {
      let isPermittedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );

      if (!isPermittedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: i18n.t('Permissions.StoragePermissionNeededTitle'),
            buttonNeutral: i18n.t('Permissions.AskMeLaterTitle'),
            buttonNegative: i18n.t('Dialog.Cancel'),
            buttonPositive: 'OK',
            message: '',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportIncomesToExcel();
        }
      } else {
        exportIncomesToExcel();
      }
    } catch (error) {
      console.error('error: ', error);
      toast.show({
        type: 'error',
        title: i18n.t('ToastNotification.SomethingWentWrong'),
      });
      return;
    }
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
    handleModalOpen,
    handleModalClose,
    handleEditModalOpen,
    isModalOpen,
    selectedIncome,
    isEditModeModal,
    handleDownloadButtonClick,
  };
};
