import { useState } from 'react';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import * as Yup from 'yup';
import i18n from 'i18n-js';
import { UserService } from '@model/services';
import { useToastNotificationStore } from '@stores/toastNotification.store';

const useRegistration = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToastNotificationStore();
  const userService = new UserService();

  const registeredUser = {
    firstname,
    lastname,
    email,
    password,
    passwordConfirm,
  };

  const handleInputChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: 'firstname' | 'lastname' | 'email' | 'password' | 'passwordConfirm'
  ): void => {
    switch (type) {
      case 'firstname':
        setFirstname(e.nativeEvent.text);
        return;
      case 'lastname':
        setLastname(e.nativeEvent.text);
        return;
      case 'email':
        setEmail(e.nativeEvent.text);
        return;
      case 'password':
        setPassword(e.nativeEvent.text);
        return;
      case 'passwordConfirm':
        setPasswordConfirm(e.nativeEvent.text);
        return;
      default:
        return null;
    }
  };

  const RegistrationSchema = Yup.object().shape({
    firstname: Yup.string().required(i18n.t('AuthForm.FirstnameRequired')),
    lastname: Yup.string().required(i18n.t('AuthForm.LastnameRequired')),
    email: Yup.string().required(i18n.t('AuthForm.EmailRequired')),
    password: Yup.string().required(i18n.t('AuthForm.PasswordRequired')),
    passwordConfirm: Yup.string()
      .required(i18n.t('AuthForm.PasswordConfirmRequired'))
      .oneOf([Yup.ref('password'), null], i18n.t('AuthForm.PasswordsDoNotMatch')),
  });

  const verifyForm = async (): Promise<boolean> => {
    try {
      await RegistrationSchema.validate(registeredUser, { abortEarly: false });
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
        await userService.createUser(email, password, firstname, lastname);
        setFirstname('');
        setLastname('');
        setPassword('');
        setPasswordConfirm('');
        setIsPassword(true);
        setIsPasswordConfirm(true);
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.show({
              type: 'error',
              title: i18n.t('ToastNotification.EmailAlreadyExists'),
            });
            return;
          case 'auth/invalid-email':
            toast.show({
              type: 'error',
              title: i18n.t('ToastNotification.InvalidEmailTitle'),
            });
            return;
          case 'auth/weak-password':
            toast.show({
              type: 'error',
              title: i18n.t('ToastNotification.PasswordTooShortTitle'),
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
    firstname,
    lastname,
    email,
    password,
    isPassword,
    setIsPassword,
    passwordConfirm,
    setPasswordConfirm,
    isPasswordConfirm,
    setIsPasswordConfirm,
    errors,
    handleSubmit,
    isLoading,
    handleInputChange,
  };
};

export default useRegistration;
