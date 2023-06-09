import { useState } from 'react';
import { getLocalizedName } from '@core/name';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TabStackParams } from '@navigation/Tabs';
import { useUser } from './useUser';

export const useHome = () => {
  const { user } = useUser();
  const navigation = useNavigation<NavigationProp<TabStackParams>>();
  const localizedName = getLocalizedName(user?.lastname, user?.firstname);

  const [screenRefreshing, setScreenRefreshing] = useState(false);

  return {
    user,
    navigation,
    localizedName,
    screenRefreshing,
    setScreenRefreshing,
  };
};
