import { useState } from 'react';
import * as Yup from 'yup';
import i18n from 'i18n-js';

const useRegistration = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const registeredUser = {
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
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
    } else {
    }
  };

  return {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    isPassword,
    setIsPassword,
    confirmPassword,
    setConfirmPassword,
    isConfirmPassword,
    setIsConfirmPassword,
    errors,
    handleSubmit,
  };
};

export default useRegistration;
