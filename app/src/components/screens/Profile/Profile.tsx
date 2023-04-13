import React, { FC } from 'react';
import i18n from 'i18n-js';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthService } from '@model/services';
import { RootStackParams } from '@navigation/Navigation';
import { Icon } from '@components/shared';
import { theme } from '@styles/theme';
import {
  Container,
  ContentContainer,
  ImageContainer,
  ScreenTitleContainer,
  ScreenTitleText,
  SignOutButton,
  SignOutButtonText,
  StyledLinearGradient,
} from './Profile.styles';

const authService = new AuthService();

export const Profile: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleSignOutButtonPress = async () => {
    await authService.signOut();
    navigation.navigate('Auth');
  };

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
            <SignOutButton onPress={handleSignOutButtonPress}>
              <SignOutButtonText>{i18n.t('SignOut')}</SignOutButtonText>
            </SignOutButton>
          </ContentContainer>
        </StyledLinearGradient>
      </Container>
    </>
  );
};
