import { Income, Purchase } from '@model/domain';
import { PermissionsAndroid } from 'react-native';
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
    const workSheet = XLSX.utils.json_to_sheet(sheet);
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
          exportToExcel();
        }
      } else {
        exportToExcel();
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

  return { handleDownloadButtonClick };
};
