import { AuthService } from '@model/services';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import i18n from 'i18n-js';
import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import * as Yup from 'yup';
import { useAsyncAction } from './common/useAsyncAction';
import { useFormValidation } from './common/useFormValidation';
import { useUser } from './useUser';

const useLogin = () => {
  const { retry: fetchUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const { errors, validateAll } = useFormValidation();
  const { isLoading, execute } = useAsyncAction();

  const toast = useToastNotificationStore();
  const authService = new AuthService();

  const loginUser = {
    email,
    password,
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required(i18n.t('AuthForm.EmailRequired')),
    password: Yup.string().required(i18n.t('AuthForm.PasswordRequired')),
  });

  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: 'email' | 'password'
  ): void => {
    switch (type) {
      case 'email':
        setEmail(e.nativeEvent.text);
        return;
      case 'password':
        setPassword(e.nativeEvent.text);
        return;
      default:
        return null;
    }
  };

  const verifyForm = async (): Promise<boolean> => {
    return await validateAll(loginUser, LoginSchema);
  };

  const handleSubmit = async () => {
    const isFormVerified = await verifyForm();

    if (isFormVerified) {
      await execute(async () => {
        try {
          await authService.loginWithEmailAndPassword(email, password);
          fetchUser();
        } catch (error) {
          switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
              toast.show({
                type: 'error',
                title: i18n.t('ToastNotification.InvalidCredentialsTitle'),
              });
              return;
            default:
              toast.show({
                type: 'error',
                title: i18n.t('ToastNotification.SomethingWentWrong'),
              });
              return;
          }
        }
      });
    }
  };

  return {
    email,
    password,
    isPassword,
    setIsPassword,
    handleSubmit,
    errors,
    isLoading,
    handleInputChange,
  };
};

export default useLogin;
