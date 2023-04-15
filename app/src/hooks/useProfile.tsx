import { getLocalizedName } from '@core/name';
import { AuthService } from '@model/services';
import { useUser } from './useUser';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '@navigation/Navigation';

const authService = new AuthService();

export const useProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const { user } = useUser();
  const localizedName = getLocalizedName(user?.lastname, user?.firstname);

  const handleSignOutButtonPress = async () => {
    await authService.signOut();
    navigation.navigate('Auth');
  };

  return {
    localizedName,
    handleSignOutButtonPress,
    email: user?.email ?? '',
  };
};
