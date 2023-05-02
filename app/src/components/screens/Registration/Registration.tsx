import React, { FC, useRef } from 'react';
import i18n from 'i18n-js';
import { KeyboardAvoidingView, View } from 'react-native';
import useRegistration from '@hooks/useRegistration';
import { AuthStackParams } from '@navigation/AuthStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import {
  Container,
  StyledLinearGradient,
  StyledGradientText,
  BottomContainer,
  StyledImage,
  StyledTitle,
  StyledSubtitle,
  scrollViewStyle,
  FormContainer,
  StyledTextInput,
  StyledButton,
  StyledRedirectQuestionText,
  StyledRedirectButton,
  keyboardAvoidingContainerStyle,
  StyledIconButton,
  VerifyEmailAddressText,
} from './Registration.styles';

type RegistrationProps = NativeStackScreenProps<AuthStackParams, 'Registration'>;

export const Registration: FC<RegistrationProps> = ({ navigation }) => {
  const {
    firstname,
    lastname,
    email,
    password,
    isPassword,
    setIsPassword,
    passwordConfirm,
    isPasswordConfirm,
    setIsPasswordConfirm,
    handleSubmit,
    errors,
    isLoading,
    handleInputChange,
  } = useRegistration();

  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);

  return (
    <Container>
      <StyledLinearGradient
        colors={['#2C1F5F', '#4c397a', '#9068ee', '#b296f1', '#ffffff', '#3f087a57']}
        useAngle
        angle={140}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StyledGradientText>{i18n.t('Registration')}</StyledGradientText>

        <BottomContainer contentContainerStyle={scrollViewStyle}>
          <StyledImage source={require('../../../assets/wallet.png')} />
          <StyledTitle>Wallet</StyledTitle>
          <StyledSubtitle>{i18n.t('LoginSubtitle')}</StyledSubtitle>

          <FormContainer>
            <KeyboardAvoidingView
              contentContainerStyle={keyboardAvoidingContainerStyle}
              keyboardVerticalOffset={40}
              behavior="position"
              enabled
            >
              <StyledTextInput
                value={firstname}
                onChange={(e) => handleInputChange(e, 'firstname')}
                hasError={!!errors.firstname}
                inputMode="text"
                placeholder={errors.firstname ? errors.firstname : i18n.t('FirstNameLabel')}
                placeholderTextColor={
                  errors.firstname ? theme.colors.red : theme.colors.purple[200]
                }
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => lastnameRef.current.focus()}
              />
              <StyledTextInput
                ref={lastnameRef}
                inputMode="text"
                value={lastname}
                onChange={(e) => handleInputChange(e, 'lastname')}
                hasError={!!errors.lastname}
                placeholder={errors.lastname ? errors.lastname : i18n.t('LastNameLabel')}
                placeholderTextColor={errors.lastname ? theme.colors.red : theme.colors.purple[200]}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => emailRef.current.focus()}
              />
              <StyledTextInput
                ref={emailRef}
                inputMode="email"
                value={email}
                onChange={(e) => handleInputChange(e, 'email')}
                hasError={!!errors.email}
                autoCapitalize="none"
                placeholder={errors.email ? errors.email : i18n.t('EmailAddressLabel')}
                placeholderTextColor={errors.email ? theme.colors.red : theme.colors.purple[200]}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current.focus()}
              />
              <View>
                <StyledTextInput
                  ref={passwordRef}
                  secureTextEntry={isPassword}
                  value={password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  hasError={!!errors.password}
                  placeholder={errors.password ? errors.password : i18n.t('PasswordLabel')}
                  placeholderTextColor={
                    errors.password ? theme.colors.red : theme.colors.purple[200]
                  }
                  returnKeyType="next"
                  blurOnSubmit={false}
                  onSubmitEditing={() => passwordConfirmRef.current.focus()}
                />
                <StyledIconButton onPress={() => setIsPassword(!isPassword)}>
                  <Icon
                    type={isPassword ? 'eye' : 'eye-outlined'}
                    iconColor={theme.colors.purple[100]}
                  />
                </StyledIconButton>
              </View>
              <View>
                <StyledTextInput
                  ref={passwordConfirmRef}
                  secureTextEntry={isPasswordConfirm}
                  value={passwordConfirm}
                  onChange={(e) => handleInputChange(e, 'passwordConfirm')}
                  hasError={!!errors.passwordConfirm}
                  placeholder={
                    errors.passwordConfirm ? errors.passwordConfirm : i18n.t('PasswordConfirmLabel')
                  }
                  placeholderTextColor={
                    errors.passwordConfirm ? theme.colors.red : theme.colors.purple[200]
                  }
                />
                <StyledIconButton onPress={() => setIsPasswordConfirm(!isPasswordConfirm)}>
                  <Icon
                    type={isPasswordConfirm ? 'eye' : 'eye-outlined'}
                    iconColor={theme.colors.purple[100]}
                  />
                </StyledIconButton>
              </View>
              <StyledButton
                onPress={handleSubmit}
                text={i18n.t('Registration')}
                size="large"
                withActivityIndicator
                isLoading={isLoading}
                disabled={isLoading}
              />
            </KeyboardAvoidingView>
          </FormContainer>

          <VerifyEmailAddressText>{i18n.t('VerifyEmailAddressText')}</VerifyEmailAddressText>

          <StyledRedirectQuestionText>
            {i18n.t('AlreadyHaveAnAccountLabel')}
          </StyledRedirectQuestionText>
          <StyledRedirectButton
            onPress={() => navigation.navigate('Login')}
            text={i18n.t('RedirectLoginLabel')}
          />
        </BottomContainer>
      </StyledLinearGradient>
    </Container>
  );
};
