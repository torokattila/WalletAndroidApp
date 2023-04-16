import { useState } from 'react';
import i18n from 'i18n-js';
import { FirebaseError } from 'firebase/app';
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
  const [oldPassword, setOldPassword] = useState('');
  const [isOldPassword, setIsOldPassword] = useState(true);
  const [newPassword, setNewPassword] = useState('');
  const [isNewPassword, setIsNewPassword] = useState(true);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteProfileDialogVisible, setIsDeleteProfileDialogVisible] = useState(false);

  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: 'firstname' | 'lastname' | 'oldPassword' | 'newPassword' | 'newPasswordConfirm'
  ): void => {
    switch (type) {
      case 'firstname':
        setFirstname(e.nativeEvent.text);
        return;
      case 'lastname':
        setLastname(e.nativeEvent.text);
        return;
      case 'oldPassword':
        setOldPassword(e.nativeEvent.text);
        return;
      case 'newPassword':
        setNewPassword(e.nativeEvent.text);
        return;
      case 'newPasswordConfirm':
        setNewPasswordConfirm(e.nativeEvent.text);
        return;
      default:
        return null;
    }
  };

  const handleTogglePasswordVisible = (
    type: 'oldPassword' | 'newPassword' | 'newPasswordConfirm'
  ): void => {
    switch (type) {
      case 'oldPassword':
        setIsOldPassword(!isOldPassword);
        return;
      case 'newPassword':
        setIsNewPassword(!isNewPassword);
        return;
      case 'newPasswordConfirm':
        setIsNewPasswordConfirm(!isNewPasswordConfirm);
        return;
      default:
        return;
    }
  };

  const handleBasicDetailsPress = (): void => setIsBasicDetailsVisible(true);
  const handleBasicDetailsClose = (): void => setIsBasicDetailsVisible(false);

  const handleUpdateBasicDetailsSubmit = (): void => {};

  const handleChangePasswordPress = (): void => setIsChangePasswordVisible(true);
  const handleChangePasswordClose = (): void => {
    setIsChangePasswordVisible(false);
    setOldPassword('');
    setIsOldPassword(true);
    setNewPassword('');
    setIsNewPassword(true);
    setNewPasswordConfirm('');
    setIsNewPasswordConfirm(true);
  };

  const verifyPasswordChangeForm = (): boolean => {
    if (!oldPassword.length) {
      setErrors({
        oldPassword: i18n.t('AuthForm.PasswordRequired'),
      });
      return false;
    } else if (!newPassword.length) {
      setErrors({
        ...errors,
        newPassword: i18n.t('RequiredField'),
      });
      return false;
    } else if (!newPasswordConfirm.length) {
      setErrors({
        newPasswordConfirm: i18n.t('AuthForm.PasswordConfirmRequired'),
      });
      return false;
    }

    setErrors({});
    return true;
  };

  const handleChangePasswordSubmit = async (): Promise<void> => {
    const isFormVerified = verifyPasswordChangeForm();

    if (isFormVerified) {
      setIsLoading(true);
      try {
        if (newPassword !== newPasswordConfirm) {
          throw new FirebaseError('password-mismatch', 'Passwords are different');
        }

        await authService.changePassword(oldPassword, newPassword);

        toast.show({
          type: 'success',
          title: i18n.t('ToastNotification.SuccessfulPasswordChange'),
        });

        handleChangePasswordClose();
      } catch (error) {
        console.error(error);
        switch (error.code) {
          case 'auth/wrong-password':
            toast.show({
              type: 'error',
              title: i18n.t('Profile.WrongPassword'),
            });
            setErrors({
              oldPassword: i18n.t('Profile.WrongPassword'),
            });
            return;
          case 'auth/user-not-found':
            setErrors({
              oldPassword: i18n.t('Profile.WrongPassword'),
            });
            return;
          case 'password-mismatch':
            toast.show({
              type: 'error',
              title: i18n.t('AuthForm.PasswordsDoNotMatch'),
            });
            setErrors({
              newPassword: i18n.t('AuthForm.PasswordsDoNotMatch'),
            });
            return;
          default:
            toast.show({
              type: 'error',
              title: i18n.t('ToastNotification.SomethingWentWrong'),
            });
            return;
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

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
    oldPassword,
    isOldPassword,
    newPasswordConfirm,
    isNewPasswordConfirm,
    newPassword,
    isNewPassword,
    errors,
    isLoading,
    isDeleteProfileDialogVisible,
    handleDeleteProfilePress,
    handleDeleteProfileDialogClose,
    handleDeleteProfileSubmit,
    handleUpdateBasicDetailsSubmit,
    handleChangePasswordSubmit,
    handleTogglePasswordVisible,
  };
};
