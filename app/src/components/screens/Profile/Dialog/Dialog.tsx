import React, { FC, useRef } from 'react';
import i18n from 'i18n-js';
import {
  KeyboardAvoidingView,
  Modal,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  View,
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import { Icon, ModalBackground } from '@components/shared';
import { useDarkMode } from '@hooks/useDarkMode';
import { theme } from '@styles/theme';
import {
  buttonShadow,
  Content,
  ContentContainer,
  FormContainer,
  InputContainer,
  Label,
  shadow,
  StyledButton,
  StyledIconButton,
  StyledTextInput,
  Title,
  UpperLine,
} from './Dialog.styles';

type DialogProps = {
  isOpen: boolean;
  isBasicDetailsDialog: boolean;
  onSave: () => void;
  onClose: () => void;
  errors: { [key: string]: string };
  inputValues: {
    firstname: string;
    lastname: string;
    oldPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
  };
  handleInputChange: (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
    type: 'firstname' | 'lastname' | 'oldPassword' | 'newPassword' | 'newPasswordConfirm'
  ) => void;
  isLoading: boolean;
  handleTogglePasswordVisible: (type: 'oldPassword' | 'newPassword' | 'newPasswordConfirm') => void;
  passwordsVisibility: {
    isOldPassword: boolean;
    isNewPassword: boolean;
    isNewPasswordConfirm: boolean;
  };
};

export const Dialog: FC<DialogProps> = ({
  isOpen,
  isBasicDetailsDialog,
  onSave,
  onClose,
  errors,
  inputValues,
  handleInputChange,
  isLoading,
  handleTogglePasswordVisible,
  passwordsVisibility,
}) => {
  const { isDarkMode } = useDarkMode();

  const dialogTitle = isBasicDetailsDialog
    ? i18n.t('Profile.BasicDetailsTitle')
    : i18n.t('Profile.ChangePasswordTitle');
  const lastnameRef = useRef(null);
  const newPasswordRef = useRef(null);
  const newPasswordConfirmRef = useRef(null);

  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal animationType="slide" transparent visible={isOpen} onRequestClose={onClose} animated>
        <ModalBackground onHide={onClose} isVisible={isOpen} />
        <ContentContainer style={shadow} isDarkMode={isDarkMode}>
          <KeyboardAvoidingView keyboardVerticalOffset={140} behavior="position" enabled>
            <UpperLine />
            <Content>
              <Title>{dialogTitle}</Title>
              <FormContainer>
                {isBasicDetailsDialog ? (
                  <>
                    <InputContainer>
                      <Label>{i18n.t('FirstNameLabel')}</Label>
                      <StyledTextInput
                        value={inputValues.firstname}
                        onChange={(e) => handleInputChange(e, 'firstname')}
                        hasError={!!errors.firstname}
                        inputMode="text"
                        placeholder={errors.firstname ? errors.firstname : i18n.t('FirstNameLabel')}
                        placeholderTextColor={
                          errors.firstname
                            ? theme.colors.red
                            : isDarkMode
                            ? theme.colors.purple[400]
                            : theme.colors.purple[200]
                        }
                        returnKeyType="next"
                        blurOnSubmit={false}
                        onSubmitEditing={() => lastnameRef.current.focus()}
                        isDarkMode={isDarkMode}
                      />

                      <Label>{i18n.t('LastNameLabel')}</Label>
                      <StyledTextInput
                        ref={lastnameRef}
                        inputMode="text"
                        value={inputValues.lastname}
                        onChange={(e) => handleInputChange(e, 'lastname')}
                        hasError={!!errors.lastname}
                        placeholder={errors.lastname ? errors.lastname : i18n.t('LastNameLabel')}
                        placeholderTextColor={
                          errors.lastname
                            ? theme.colors.red
                            : isDarkMode
                            ? theme.colors.purple[400]
                            : theme.colors.purple[200]
                        }
                        isDarkMode={isDarkMode}
                      />
                    </InputContainer>
                  </>
                ) : (
                  <InputContainer>
                    <>
                      <View>
                        <Label>{i18n.t('Profile.CurrentPasswordTitle')}</Label>
                        <StyledTextInput
                          secureTextEntry={passwordsVisibility.isOldPassword}
                          value={inputValues.oldPassword}
                          onChange={(e) => handleInputChange(e, 'oldPassword')}
                          hasError={!!errors.oldPassword}
                          placeholder={
                            errors.oldPassword
                              ? errors.oldPassword
                              : i18n.t('Profile.CurrentPasswordTitle')
                          }
                          placeholderTextColor={
                            errors.oldPassword
                              ? theme.colors.red
                              : isDarkMode
                              ? theme.colors.purple[400]
                              : theme.colors.purple[200]
                          }
                          returnKeyType="next"
                          blurOnSubmit={false}
                          onSubmitEditing={() => newPasswordRef.current.focus()}
                          isDarkMode={isDarkMode}
                        />
                        <StyledIconButton
                          onPress={() => handleTogglePasswordVisible('oldPassword')}
                        >
                          <Icon
                            type={passwordsVisibility.isOldPassword ? 'eye' : 'eye-outlined'}
                            iconColor={
                              isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]
                            }
                          />
                        </StyledIconButton>
                      </View>
                      <View>
                        <Label>{i18n.t('Profile.NewPasswordTitle')}</Label>
                        <StyledTextInput
                          ref={newPasswordRef}
                          secureTextEntry={passwordsVisibility.isNewPassword}
                          value={inputValues.newPassword}
                          onChange={(e) => handleInputChange(e, 'newPassword')}
                          hasError={!!errors.newPassword}
                          placeholder={
                            errors.newPassword
                              ? errors.newPassword
                              : i18n.t('Profile.NewPasswordTitle')
                          }
                          placeholderTextColor={
                            errors.newPassword
                              ? theme.colors.red
                              : isDarkMode
                              ? theme.colors.purple[400]
                              : theme.colors.purple[200]
                          }
                          returnKeyType="next"
                          blurOnSubmit={false}
                          onSubmitEditing={() => newPasswordConfirmRef.current.focus()}
                          isDarkMode={isDarkMode}
                        />
                        <StyledIconButton
                          onPress={() => handleTogglePasswordVisible('newPassword')}
                        >
                          <Icon
                            type={passwordsVisibility.isNewPassword ? 'eye' : 'eye-outlined'}
                            iconColor={
                              isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]
                            }
                          />
                        </StyledIconButton>
                      </View>
                      <View>
                        <Label>{i18n.t('Profile.NewPasswordConfirmTitle')}</Label>
                        <StyledTextInput
                          ref={newPasswordConfirmRef}
                          secureTextEntry={passwordsVisibility.isNewPasswordConfirm}
                          value={inputValues.newPasswordConfirm}
                          onChange={(e) => handleInputChange(e, 'newPasswordConfirm')}
                          hasError={!!errors.newPasswordConfirm}
                          placeholder={
                            errors.newPasswordConfirm
                              ? errors.newPasswordConfirm
                              : i18n.t('Profile.NewPasswordConfirmTitle')
                          }
                          placeholderTextColor={
                            errors.newPasswordConfirm
                              ? theme.colors.red
                              : isDarkMode
                              ? theme.colors.purple[400]
                              : theme.colors.purple[200]
                          }
                          isDarkMode={isDarkMode}
                        />
                        <StyledIconButton
                          onPress={() => handleTogglePasswordVisible('newPasswordConfirm')}
                        >
                          <Icon
                            type={passwordsVisibility.isNewPasswordConfirm ? 'eye' : 'eye-outlined'}
                            iconColor={
                              isDarkMode ? theme.colors.purple[300] : theme.colors.purple[100]
                            }
                          />
                        </StyledIconButton>
                      </View>
                    </>
                  </InputContainer>
                )}
              </FormContainer>

              <StyledButton
                size="large"
                style={!isDarkMode && buttonShadow}
                onPress={onSave}
                text={i18n.t('SaveButtonTitle')}
                withActivityIndicator
                isLoading={isLoading}
                disabled={isLoading}
              />
            </Content>
          </KeyboardAvoidingView>
        </ContentContainer>
      </Modal>
    </GestureRecognizer>
  );
};
