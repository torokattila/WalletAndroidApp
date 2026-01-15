/* eslint-disable react-native/no-inline-styles */
import React, { FC } from 'react';
import { Switch } from 'react-native';
import i18n from 'i18n-js';
import { ConfirmDialog, Icon } from '@components/shared';
import { theme } from '@styles/theme';
import { useProfile } from '@hooks/useProfile';
import { useDarkMode } from '@hooks/useDarkMode';
import {
  Container,
  ContentContainer,
  Email,
  OptionsContainer,
  ImageContainer,
  Name,
  NameEmailContainer,
  ScreenTitleContainer,
  ScreenTitleText,
  scrollViewStyle,
  StyledLinearGradient,
  OptionCard,
  OptionCardTitle,
  StyledIcon,
  SwitchDarkModeText,
  SwitchDarkModeContainer,
  IconsAndSwitchContainer,
} from './Profile.styles';
import { Dialog } from './Dialog';

const cardShadow = {
  elevation: 4,
  shadowColor: theme.colors.black,
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.5,
  shadowRadius: 8,
};

export const Profile: FC = () => {
  const {
    localizedName,
    handleSignOutButtonPress,
    email,
    isBasicDetailsVisible,
    handleBasicDetailsPress,
    handleBasicDetailsClose,
    isChangePasswordVisible,
    handleChangePasswordPress,
    handleChangePasswordClose,
    isDeleteProfileDialogVisible,
    handleDeleteProfilePress,
    handleDeleteProfileDialogClose,
    handleDeleteProfileSubmit,
    handleUpdateBasicDetailsSubmit,
    handleChangePasswordSubmit,
    errors,
    handleInputChange,
    firstname,
    lastname,
    oldPassword,
    newPassword,
    newPasswordConfirm,
    isLoading,
    handleTogglePasswordVisible,
    isOldPassword,
    isNewPassword,
    isNewPasswordConfirm,
  } = useProfile();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const cardIconColor = theme.colors.magenta[100];

  return (
    <>
      <Container isDarkMode={isDarkMode}>
        <StyledLinearGradient
          colors={['#e84393', '#e84393']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Profile.ScreenTitle')}</ScreenTitleText>
            <Icon type="profile" iconColor="#fff" />
          </ScreenTitleContainer>

          <ContentContainer isDarkMode={isDarkMode}>
            <ImageContainer isDarkMode={isDarkMode}>
              <Icon type="profile-image" iconColor={theme.colors.magenta[100]} />
            </ImageContainer>

            <NameEmailContainer>
              <Name isDarkMode={isDarkMode}>{localizedName}</Name>
              <Email isDarkMode={isDarkMode}>{email}</Email>
            </NameEmailContainer>

            <OptionsContainer contentContainerStyle={scrollViewStyle}>
              <OptionCard
                style={cardShadow}
                onPress={handleBasicDetailsPress}
                isDarkMode={isDarkMode}
              >
                <StyledIcon type="identity-card" iconColor={cardIconColor} />
                <OptionCardTitle isDarkMode={isDarkMode}>
                  {i18n.t('Profile.BasicDetailsTitle')}
                </OptionCardTitle>
              </OptionCard>
              <OptionCard
                style={cardShadow}
                onPress={handleChangePasswordPress}
                isDarkMode={isDarkMode}
              >
                <StyledIcon type="change-password" iconColor={cardIconColor} />
                <OptionCardTitle isDarkMode={isDarkMode}>
                  {i18n.t('Profile.ChangePasswordTitle')}
                </OptionCardTitle>
              </OptionCard>
              <OptionCard
                style={!isDarkMode && cardShadow}
                onPress={handleDeleteProfilePress}
                isDarkMode={isDarkMode}
              >
                <StyledIcon type="delete-profile" iconColor={cardIconColor} />
                <OptionCardTitle isDarkMode={isDarkMode}>
                  {i18n.t('Profile.DeleteProfileTitle')}
                </OptionCardTitle>
              </OptionCard>
              <OptionCard
                style={!isDarkMode && cardShadow}
                onPress={handleSignOutButtonPress}
                isDarkMode={isDarkMode}
              >
                <StyledIcon type="logout" iconColor={cardIconColor} />
                <OptionCardTitle isDarkMode={isDarkMode}>{i18n.t('SignOut')}</OptionCardTitle>
              </OptionCard>

              <SwitchDarkModeContainer>
                <SwitchDarkModeText>{i18n.t('DarkThemeText')}</SwitchDarkModeText>

                <IconsAndSwitchContainer>
                  <Icon type="sun" iconColor={theme.colors.magenta[100]} />
                  <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#f1c2d8', true: '#f3c6da' }}
                    thumbColor={theme.colors.magenta[100]}
                  />
                  <Icon
                    type="moon"
                    iconColor={theme.colors.magenta[100]}
                    style={{ marginLeft: 5 }}
                  />
                </IconsAndSwitchContainer>
              </SwitchDarkModeContainer>
            </OptionsContainer>
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
      <Dialog
        handleInputChange={handleInputChange}
        isOpen={isBasicDetailsVisible || isChangePasswordVisible}
        isBasicDetailsDialog={isBasicDetailsVisible}
        onSave={isBasicDetailsVisible ? handleUpdateBasicDetailsSubmit : handleChangePasswordSubmit}
        onClose={isBasicDetailsVisible ? handleBasicDetailsClose : handleChangePasswordClose}
        errors={errors}
        inputValues={{
          firstname,
          lastname,
          oldPassword,
          newPassword,
          newPasswordConfirm,
        }}
        isLoading={isLoading}
        handleTogglePasswordVisible={handleTogglePasswordVisible}
        passwordsVisibility={{
          isOldPassword,
          isNewPassword,
          isNewPasswordConfirm,
        }}
      />
      <ConfirmDialog
        isVisible={isDeleteProfileDialogVisible}
        onPressPrimaryButton={handleDeleteProfileSubmit}
        onPressSecondaryButton={handleDeleteProfileDialogClose}
        primaryButtonText={i18n.t('Dialog.Delete')}
        secondaryButtonText={i18n.t('Dialog.Cancel')}
        title={i18n.t('Dialog.AreYouSureTitle')}
        description={i18n.t('Dialog.CannotBeUndoneTitle')}
      />
    </>
  );
};
