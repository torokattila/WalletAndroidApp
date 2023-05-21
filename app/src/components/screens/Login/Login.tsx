import React, { FC, useRef } from 'react';
import i18n from 'i18n-js';
import { KeyboardAvoidingView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '@navigation/AuthStack';
import { RootStackParams } from '@navigation/Navigation';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import useLogin from '@hooks/useLogin';
import { useDarkMode } from '@hooks/useDarkMode';
import {
  Container,
  scrollViewStyle,
  BottomContainer,
  StyledLinearGradient,
  StyledGradientText,
  StyledImage,
  StyledTitle,
  FormContainer,
  StyledTextInput,
  StyledButton,
  StyledSubtitle,
  StyledRedirectQuestionText,
  StyledRedirectButton,
  StyledIconButton,
} from './Login.styles';

type LoginProps = NativeStackScreenProps<AuthStackParams & RootStackParams, 'Login'>;

export const Login: FC<LoginProps> = ({ navigation }) => {
  const { isDarkMode } = useDarkMode();
  const {
    email,
    password,
    isPassword,
    setIsPassword,
    handleSubmit,
    errors,
    isLoading,
    handleInputChange,
  } = useLogin();

  const passwordRef = useRef(null);

  return (
    <Container contentContainerStyle={scrollViewStyle}>
      <StyledLinearGradient
        colors={['#2C1F5F', '#4c397a', '#9068ee', '#b296f1', '#ffffff', '#3f087a57']}
        useAngle
        angle={140}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <StyledGradientText>{i18n.t('Login')}</StyledGradientText>

        <BottomContainer isDarkMode={isDarkMode}>
          <StyledImage source={require('../../../assets/wallet.png')} />
          <StyledTitle isDarkMode={isDarkMode}>Wallet</StyledTitle>
          <StyledSubtitle isDarkMode={isDarkMode}>{i18n.t('LoginSubtitle')}</StyledSubtitle>

          <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position" enabled>
            <FormContainer>
              <StyledTextInput
                value={email}
                onChange={(e) => handleInputChange(e, 'email')}
                hasError={!!errors.email}
                inputMode="email"
                placeholder={errors.email ? errors.email : i18n.t('EmailAddressLabel')}
                placeholderTextColor={
                  errors.email
                    ? theme.colors.red
                    : isDarkMode
                    ? theme.colors.purple[400]
                    : theme.colors.purple[200]
                }
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current.focus()}
                isDarkMode={isDarkMode}
              />
              <View>
                <StyledTextInput
                  ref={passwordRef}
                  value={password}
                  onChange={(e) => handleInputChange(e, 'password')}
                  hasError={!!errors.password}
                  secureTextEntry={isPassword}
                  placeholder={errors.password ? errors.password : i18n.t('PasswordLabel')}
                  placeholderTextColor={
                    errors.password
                      ? theme.colors.red
                      : isDarkMode
                      ? theme.colors.purple[400]
                      : theme.colors.purple[200]
                  }
                  isDarkMode={isDarkMode}
                />
                <StyledIconButton onPress={() => setIsPassword(!isPassword)}>
                  <Icon
                    type={isPassword ? 'eye' : 'eye-outlined'}
                    iconColor={isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]}
                  />
                </StyledIconButton>
              </View>
              <StyledButton
                onPress={handleSubmit}
                text={i18n.t('Login')}
                size="large"
                withActivityIndicator
                isLoading={isLoading}
                disabled={isLoading}
              />
            </FormContainer>
          </KeyboardAvoidingView>

          <StyledRedirectQuestionText isDarkMode={isDarkMode}>
            {i18n.t('DontYouHaveAnAccountLabel')}
          </StyledRedirectQuestionText>
          <StyledRedirectButton
            onPress={() => navigation.navigate('Registration')}
            text={i18n.t('RedirectSignupLabel')}
          />
        </BottomContainer>
      </StyledLinearGradient>
    </Container>
  );
};
