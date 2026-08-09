import { Icon } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import useLogin from '@hooks/useLogin';
import useVibration from '@hooks/useVibration';
import { AuthStackParams } from '@navigation/AuthStack';
import { RootStackParams } from '@navigation/Navigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { theme } from '@styles/theme';
import i18n from 'i18n-js';
import React, { FC, useRef } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';
import {
  BottomContainer,
  Container,
  FormContainer,
  scrollViewStyle,
  StyledButton,
  StyledGradientText,
  StyledIconButton,
  StyledImage,
  StyledLinearGradient,
  StyledRedirectButton,
  StyledRedirectQuestionText,
  StyledSubtitle,
  StyledTextInput,
  StyledTitle,
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
  const { vibrateLight } = useVibration();

  const passwordRef = useRef(null);

  return (
    <Container contentContainerStyle={scrollViewStyle}>
      <StyledLinearGradient
        colors={['#e84393', '#e84393']}
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
                placeholderTextColor={errors.email ? theme.colors.red : theme.colors.magenta[200]}
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
                    errors.password ? theme.colors.red : theme.colors.magenta[200]
                  }
                  isDarkMode={isDarkMode}
                />
                <StyledIconButton
                  onPress={() => {
                    vibrateLight();
                    setIsPassword(!isPassword);
                  }}
                >
                  <Icon
                    type={isPassword ? 'eye' : 'eye-outlined'}
                    iconColor={theme.colors.magenta[100]}
                  />
                </StyledIconButton>
              </View>
              <StyledButton
                onPress={() => {
                  vibrateLight();
                  handleSubmit();
                }}
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
            onPress={() => {
              vibrateLight();
              navigation.navigate('Registration');
            }}
            text={i18n.t('RedirectSignupLabel')}
          />
        </BottomContainer>
      </StyledLinearGradient>
    </Container>
  );
};
