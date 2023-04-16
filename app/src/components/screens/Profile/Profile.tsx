import React, { FC } from 'react';
import i18n from 'i18n-js';
import { ConfirmDialog, Icon } from '@components/shared';
import { theme } from '@styles/theme';
import { useProfile } from '@hooks/useProfile';
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

  return (
    <>
      <Container>
        <StyledLinearGradient
          colors={['#8E65F7', '#4547B8']}
          useAngle
          angle={140}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScreenTitleContainer>
            <ScreenTitleText>{i18n.t('Profile.ScreenTitle')}</ScreenTitleText>
            <Icon type="profile" iconColor="#fff" />
          </ScreenTitleContainer>

          <ContentContainer>
            <ImageContainer>
              <Icon type="profile-image" iconColor={theme.colors.purple[100]} />
            </ImageContainer>

            <NameEmailContainer>
              <Name>{localizedName}</Name>
              <Email>{email}</Email>
            </NameEmailContainer>

            <OptionsContainer contentContainerStyle={scrollViewStyle}>
              <OptionCard style={cardShadow} onPress={handleBasicDetailsPress}>
                <StyledIcon type="identity-card" iconColor={theme.colors.purple[100]} />
                <OptionCardTitle>{i18n.t('Profile.BasicDetailsTitle')}</OptionCardTitle>
              </OptionCard>
              <OptionCard style={cardShadow} onPress={handleChangePasswordPress}>
                <StyledIcon type="change-password" iconColor={theme.colors.purple[100]} />
                <OptionCardTitle>{i18n.t('Profile.ChangePasswordTitle')}</OptionCardTitle>
              </OptionCard>
              <OptionCard style={cardShadow} onPress={handleDeleteProfilePress}>
                <StyledIcon type="delete-profile" iconColor={theme.colors.purple[100]} />
                <OptionCardTitle>{i18n.t('Profile.DeleteProfileTitle')}</OptionCardTitle>
              </OptionCard>
              <OptionCard style={cardShadow} onPress={handleSignOutButtonPress}>
                <StyledIcon type="logout" iconColor={theme.colors.purple[100]} />
                <OptionCardTitle>{i18n.t('SignOut')}</OptionCardTitle>
              </OptionCard>
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
