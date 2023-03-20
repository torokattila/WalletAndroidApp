import { useState } from 'react';
import * as Yup from 'yup';
import i18n from 'i18n-js';
import { AuthService } from '@model/services';
import { useToastNotificationStore } from '@stores/toastNotification.store';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
      try {
        await authService.loginWithEmailAndPassword(email, password);
        setEmail('');
        setPassword('');
        setIsPassword(true);
      } catch (error) {
        console.log(error.code);

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
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isPassword,
    setIsPassword,
    handleSubmit,
    errors,
  };
};

export default useLogin;
