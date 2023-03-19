import { useState } from 'react';
import * as Yup from 'yup';
import i18n from 'i18n-js';

const useLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    } else {
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
