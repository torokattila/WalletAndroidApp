import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import * as Yup from 'yup';
import i18n from 'i18n-js';
import { AuthService } from '@model/services';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { useUser } from './useUser';
import { TabStackParams } from '@navigation/Tabs';

const useLogin = () => {
  const navigation = useNavigation<NavigationProp<TabStackParams>>();
  const { retry: fetchUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

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
    try {
      await LoginSchema.validate(loginUser, { abortEarly: false });
      setErrors({});

      return Promise.resolve(true);
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};

      for (const err of error.inner) {
        newErrors[err.path] = err.message;
      }

      setErrors(newErrors);
      return Promise.resolve(false);
    }
  };

  const handleSubmit = async () => {
    const isFormVerified = await verifyForm();

    if (isFormVerified) {
      setIsLoading(true);

      try {
        await authService.loginWithEmailAndPassword(email, password);
        navigation.navigate('Home');
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
      } finally {
        setIsLoading(false);
      }
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
