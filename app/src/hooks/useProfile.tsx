import { useState } from 'react';
import i18n from 'i18n-js';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { getLocalizedName } from '@core/name';
import { AuthService } from '@model/services';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '@navigation/Navigation';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { useUser } from './useUser';

const authService = new AuthService();

export const useProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const toast = useToastNotificationStore();
  const { user } = useUser();

  const localizedName = getLocalizedName(user?.lastname, user?.firstname);

  const [isBasicDetailsVisible, setIsBasicDetailsVisible] = useState(false);
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);
  const [firstname, setFirstname] = useState(user?.firstname ?? '');
  const [lastname, setLastname] = useState(user?.lastname ?? '');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteProfileDialogVisible, setIsDeleteProfileDialogVisible] = useState(false);

  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: 'firstname' | 'lastname' | 'password' | 'passwordConfirm' | 'newPassword'
  ): void => {
    switch (type) {
      case 'firstname':
        setFirstname(e.nativeEvent.text);
        return;
      case 'lastname':
        setLastname(e.nativeEvent.text);
        return;
      case 'password':
        setPassword(e.nativeEvent.text);
        return;
      case 'passwordConfirm':
        setPasswordConfirm(e.nativeEvent.text);
        return;
      case 'newPassword':
        setNewPassword(e.nativeEvent.text);
        return;
      default:
        return null;
    }
  };

  const handleBasicDetailsPress = (): void => setIsBasicDetailsVisible(true);
  const handleBasicDetailsClose = (): void => setIsBasicDetailsVisible(false);

  const handleChangePasswordPress = (): void => setIsChangePasswordVisible(true);
  const handleChangePasswordClose = (): void => setIsChangePasswordVisible(false);

  const handleDeleteProfilePress = (): void => setIsDeleteProfileDialogVisible(true);
  const handleDeleteProfileDialogClose = (): void => setIsDeleteProfileDialogVisible(false);

  const handleDeleteProfileSubmit = async (): Promise<void> => {
    try {
      await authService.deleteAccount();
      navigation.navigate('Auth');
    } catch (error) {
      console.error(error);
      setErrors({
        generalError: error,
      });
      toast.show({
        type: 'error',
        title: i18n.t('ToastNotification.SomethingWentWrong'),
      });
    } finally {
      handleDeleteProfileDialogClose();
    }
  };

  const handleSignOutButtonPress = async () => {
    await authService.signOut();
    navigation.navigate('Auth');
  };

  return {
    localizedName,
    handleSignOutButtonPress,
    email: user?.email ?? '',
    isBasicDetailsVisible,
    handleBasicDetailsPress,
    handleBasicDetailsClose,
    isChangePasswordVisible,
    handleChangePasswordPress,
    handleChangePasswordClose,
    firstname,
    lastname,
    handleInputChange,
    password,
    isPassword,
    setIsPassword,
    passwordConfirm,
    isPasswordConfirm,
    setIsPasswordConfirm,
    newPassword,
    isNewPassword,
    setIsNewPassword,
    errors,
    isLoading,
    isDeleteProfileDialogVisible,
    handleDeleteProfilePress,
    handleDeleteProfileDialogClose,
    handleDeleteProfileSubmit,
  };
};
