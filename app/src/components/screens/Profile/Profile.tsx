import React, { FC } from 'react';
import i18n from 'i18n-js';
import { Text, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { AuthService } from '@model/services';
import { SignOutButton, SignOutButtonText } from './Profile.styles';
import { RootStackParams } from '@navigation/Navigation';

const authService = new AuthService();

export const Profile: FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleSignOutButtonPress = async () => {
    await authService.signOut();
    navigation.navigate('Auth');
  };

  return (
    <View>
      <Text>Profile</Text>
      <SignOutButton onPress={handleSignOutButtonPress}>
        <SignOutButtonText>{i18n.t('SignOut')}</SignOutButtonText>
      </SignOutButton>
    </View>
  );
};
