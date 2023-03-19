import React, { FC, useRef } from 'react';
import i18n from 'i18n-js';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParams } from '@navigation/AuthStack';
import { RootStackParams } from '@navigation/Navigation';
import { theme } from '@styles/theme';
import { Icon } from '@components/shared';
import useLogin from '@hooks/useLogin';
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
  ButtonText,
  StyledSubtitle,
  StyledRedirectQuestionText,
  StyledRedirectButton,
  StyledIconButton,
} from './Login.styles';

type LoginProps = NativeStackScreenProps<AuthStackParams & RootStackParams, 'Login'>;

export const Login: FC<LoginProps> = ({ navigation }) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isPassword,
    setIsPassword,
    handleSubmit,
    errors,
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

        <BottomContainer>
          <StyledImage source={require('../../../assets/wallet.png')} />
          <StyledTitle>Wallet</StyledTitle>
          <StyledSubtitle>{i18n.t('LoginSubtitle')}</StyledSubtitle>

          <KeyboardAvoidingView keyboardVerticalOffset={40} behavior="position" enabled>
            <FormContainer>
              <StyledTextInput
                value={email}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setEmail(e.nativeEvent.text)
                }
                hasError={!!errors.email}
                inputMode="email"
                placeholder={errors.email ? errors.email : i18n.t('EmailAddressLabel')}
                placeholderTextColor={errors.email ? theme.colors.red : theme.colors.purple[200]}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current.focus()}
              />
              <View>
                <StyledTextInput
                  ref={passwordRef}
                  value={password}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                    setPassword(e.nativeEvent.text)
                  }
                  hasError={!!errors.password}
                  secureTextEntry={isPassword}
                  placeholder={errors.password ? errors.password : i18n.t('PasswordLabel')}
                  placeholderTextColor={
                    errors.password ? theme.colors.red : theme.colors.purple[200]
                  }
                />
                <StyledIconButton onPress={() => setIsPassword(!isPassword)}>
                  <Icon
                    type={isPassword ? 'eye' : 'eye-outlined'}
                    iconColor={theme.colors.purple[100]}
                  />
                </StyledIconButton>
              </View>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>{i18n.t('Login')}</ButtonText>
              </StyledButton>
            </FormContainer>
          </KeyboardAvoidingView>

          <StyledRedirectQuestionText>
            {i18n.t('DontYouHaveAnAccountLabel')}
          </StyledRedirectQuestionText>
          <StyledRedirectButton onPress={() => navigation.navigate('Registration')}>
            <ButtonText>{i18n.t('RedirectSignupLabel')}</ButtonText>
          </StyledRedirectButton>
        </BottomContainer>
      </StyledLinearGradient>
    </Container>
  );
};
