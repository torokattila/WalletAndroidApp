import { Income, Purchase } from '@model/domain';
import { writeFile, DownloadDirectoryPath } from 'react-native-fs';
import PushNotification, { Importance } from 'react-native-push-notification';
import uuid from 'react-native-uuid';
import XLSX from 'xlsx';
import i18n from 'i18n-js';
import { formatDate } from '@core/date-utils';
import { useToastNotificationStore } from '@stores/toastNotification.store';

export const useDownload = (
  sheet: Income[] | Purchase[],
  fromDate: Date,
  toDate: Date,
  fileName: string
) => {
  const toast = useToastNotificationStore();

  const exportToExcel = async (): Promise<void> => {
    const workBook = XLSX.utils.book_new();

    let resultWorkSheet: any[] = [];
    const totalAmount: number = !sheet.length
      ? 0
      : sheet
          .map((item: Income | Purchase) => Number(item.amount))
          .reduce((acc, curr) => acc + curr);

    if (sheet.length > 0 && sheet[0] instanceof Income) {
      resultWorkSheet = (sheet as Income[]).map((income) => {
        return {
          [`${i18n.t('ExcelColumns.Amount')}`]: income.amount,
          [`${i18n.t('ExcelColumns.Created')}`]: formatDate(income.createdAt.toDate()),
          [`${i18n.t('ExcelColumns.Modified')}`]: formatDate(income.updatedAt.toDate()),
          [`${i18n.t('ExcelColumns.Title')}`]: income?.title ?? '',
        };
      });
    } else if (sheet.length > 0 && sheet[0] instanceof Purchase) {
      resultWorkSheet = (sheet as Purchase[]).map((purchase) => {
        return {
          [`${i18n.t('ExcelColumns.Amount')}`]: purchase.amount,
          [`${i18n.t('ExcelColumns.Created')}`]: formatDate(purchase.createdAt.toDate()),
          [`${i18n.t('ExcelColumns.Modified')}`]: formatDate(purchase.updatedAt.toDate()),
          [`${i18n.t('ExcelColumns.Category')}`]:
            i18n.t(`Purchases.Categories.${purchase.category}`) ?? '',
        };
      });
    }

    resultWorkSheet.push({
      [`${i18n.t('ExcelColumns.Total')}`]: totalAmount.toString(),
    });

    const workSheet = XLSX.utils.json_to_sheet(resultWorkSheet);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet1');
    const output = XLSX.write(workBook, { type: 'binary', bookType: 'xlsx' });

    const formattedStartDate = formatDate(fromDate);
    const formattedToDate = formatDate(toDate).slice(0, -1);

    writeFile(
      DownloadDirectoryPath + `/${fileName}_${formattedStartDate}-${formattedToDate}.xlsx`,
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
      exportToExcel();
    } catch (error) {
      console.error('error: ', error);
      toast.show({
        type: 'error',
        title: i18n.t('ToastNotification.SomethingWentWrong'),
      });
      return;
    }
  };

  return { handleDownloadButtonClick };
};
