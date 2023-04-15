import React, { FC, useRef } from 'react';
import i18n from 'i18n-js';
import { KeyboardAvoidingView, Modal, View } from 'react-native';
import GestureRecognizer from 'react-native-swipe-detect';
import { Icon, ModalBackground } from '@components/shared';
import { useProfile } from '@hooks/useProfile';
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
};

export const Dialog: FC<DialogProps> = ({ isOpen, isBasicDetailsDialog, onSave, onClose }) => {
  const {
    firstname,
    lastname,
    handleInputChange,
    password,
    isPassword,
    setIsPassword,
    setIsPasswordConfirm,
    isNewPassword,
    newPassword,
    setIsNewPassword,
    passwordConfirm,
    isPasswordConfirm,
    errors,
  } = useProfile();
  const dialogTitle = isBasicDetailsDialog
    ? i18n.t('Profile.BasicDetailsTitle')
    : i18n.t('Profile.ChangePasswordTitle');
  const lastnameRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const newPasswordRef = useRef(null);

  return (
    <GestureRecognizer onSwipeDown={onClose}>
      <Modal animationType="slide" transparent visible={isOpen} onRequestClose={onClose} animated>
        <ModalBackground onHide={onClose} isVisible={isOpen} />
        <ContentContainer style={shadow}>
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

                      <Label>{i18n.t('LastNameLabel')}</Label>
                      <StyledTextInput
                        ref={lastnameRef}
                        inputMode="text"
                        value={lastname}
                        onChange={(e) => handleInputChange(e, 'lastname')}
                        hasError={!!errors.lastname}
                        placeholder={errors.lastname ? errors.lastname : i18n.t('LastNameLabel')}
                        placeholderTextColor={
                          errors.lastname ? theme.colors.red : theme.colors.purple[200]
                        }
                      />
                    </InputContainer>
                  </>
                ) : (
                  <InputContainer>
                    <>
                      <View>
                        <Label>{i18n.t('Profile.CurrentPasswordTitle')}</Label>
                        <StyledTextInput
                          secureTextEntry={isPassword}
                          value={password}
                          onChange={(e) => handleInputChange(e, 'password')}
                          hasError={!!errors.password}
                          placeholder={
                            errors.password
                              ? errors.password
                              : i18n.t('Profile.CurrentPasswordTitle')
                          }
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
                        <Label>{i18n.t('Profile.CurrentPasswordConfirmTitle')}</Label>
                        <StyledTextInput
                          ref={passwordConfirmRef}
                          secureTextEntry={isPasswordConfirm}
                          value={passwordConfirm}
                          onChange={(e) => handleInputChange(e, 'passwordConfirm')}
                          hasError={!!errors.passwordConfirm}
                          placeholder={
                            errors.passwordConfirm
                              ? errors.passwordConfirm
                              : i18n.t('Profile.CurrentPasswordConfirmTitle')
                          }
                          placeholderTextColor={
                            errors.passwordConfirm ? theme.colors.red : theme.colors.purple[200]
                          }
                          returnKeyType="next"
                          blurOnSubmit={false}
                          onSubmitEditing={() => newPasswordRef.current.focus()}
                        />
                        <StyledIconButton onPress={() => setIsPasswordConfirm(!isPasswordConfirm)}>
                          <Icon
                            type={isPasswordConfirm ? 'eye' : 'eye-outlined'}
                            iconColor={theme.colors.purple[100]}
                          />
                        </StyledIconButton>
                      </View>
                      <View>
                        <Label>{i18n.t('Profile.NewPasswordTitle')}</Label>
                        <StyledTextInput
                          ref={newPasswordRef}
                          secureTextEntry={isNewPassword}
                          value={newPassword}
                          onChange={(e) => handleInputChange(e, 'newPassword')}
                          hasError={!!errors.newPassword}
                          placeholder={
                            errors.newPassword
                              ? errors.newPassword
                              : i18n.t('Profile.NewPasswordTitle')
                          }
                          placeholderTextColor={
                            errors.newPassword ? theme.colors.red : theme.colors.purple[200]
                          }
                        />
                        <StyledIconButton onPress={() => setIsNewPassword(!isNewPassword)}>
                          <Icon
                            type={isNewPassword ? 'eye' : 'eye-outlined'}
                            iconColor={theme.colors.purple[100]}
                          />
                        </StyledIconButton>
                      </View>
                    </>
                  </InputContainer>
                )}
              </FormContainer>

              <StyledButton
                size="large"
                style={buttonShadow}
                onPress={onSave}
                text={i18n.t('SaveButtonTitle')}
              />
            </Content>
          </KeyboardAvoidingView>
        </ContentContainer>
      </Modal>
    </GestureRecognizer>
  );
};
