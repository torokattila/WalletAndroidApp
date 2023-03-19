import React, { FC } from 'react';
import i18n from 'i18n-js';
import {
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
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
  ButtonText,
  StyledRedirectQuestionText,
  StyledRedirectButton,
  keyboardAvoidingContainerStyle,
  StyledIconButton,
} from './Registration.styles';

type RegistrationProps = NativeStackScreenProps<AuthStackParams, 'Registration'>;

export const Registration: FC<RegistrationProps> = ({ navigation }) => {
  const {
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
    handleSubmit,
    errors,
  } = useRegistration();

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
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setFirstname(e.nativeEvent.text)
                }
                hasError={!!errors.firstname}
                inputMode="text"
                placeholder={errors.firstname ? errors.firstname : i18n.t('FirstNameLabel')}
                placeholderTextColor={
                  errors.firstname ? theme.colors.red : theme.colors.purple[200]
                }
              />
              <StyledTextInput
                inputMode="text"
                value={lastname}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setLastname(e.nativeEvent.text)
                }
                hasError={!!errors.lastname}
                placeholder={errors.lastname ? errors.lastname : i18n.t('LastNameLabel')}
                placeholderTextColor={errors.lastname ? theme.colors.red : theme.colors.purple[200]}
              />
              <StyledTextInput
                inputMode="email"
                value={email}
                onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                  setEmail(e.nativeEvent.text)
                }
                hasError={!!errors.email}
                placeholder={errors.email ? errors.email : i18n.t('EmailAddressLabel')}
                placeholderTextColor={errors.email ? theme.colors.red : theme.colors.purple[200]}
              />
              <View>
                <StyledTextInput
                  secureTextEntry={isPassword}
                  value={password}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                    setPassword(e.nativeEvent.text)
                  }
                  hasError={!!errors.password}
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
              <View>
                <StyledTextInput
                  secureTextEntry={isConfirmPassword}
                  value={confirmPassword}
                  onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) =>
                    setConfirmPassword(e.nativeEvent.text)
                  }
                  hasError={!!errors.passwordConfirm}
                  placeholder={
                    errors.passwordConfirm ? errors.passwordConfirm : i18n.t('PasswordConfirmLabel')
                  }
                  placeholderTextColor={
                    errors.passwordConfirm ? theme.colors.red : theme.colors.purple[200]
                  }
                />
                <StyledIconButton onPress={() => setIsConfirmPassword(!isConfirmPassword)}>
                  <Icon
                    type={isConfirmPassword ? 'eye' : 'eye-outlined'}
                    iconColor={theme.colors.purple[100]}
                  />
                </StyledIconButton>
              </View>
              <StyledButton onPress={handleSubmit}>
                <ButtonText>{i18n.t('Registration')}</ButtonText>
              </StyledButton>
            </KeyboardAvoidingView>
          </FormContainer>

          <StyledRedirectQuestionText>
            {i18n.t('AlreadyHaveAnAccountLabel')}
          </StyledRedirectQuestionText>
          <StyledRedirectButton onPress={() => navigation.navigate('Login')}>
            <ButtonText>{i18n.t('RedirectLoginLabel')}</ButtonText>
          </StyledRedirectButton>
        </BottomContainer>
      </StyledLinearGradient>
    </Container>
  );
};
