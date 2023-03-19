import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from '@model/domain/user';
import { useUser } from '@hooks/useUser';
import { AuthStack } from './AuthStack';

export type RootStackParams = {
  Root: {};
  Auth: {};
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const getInitialRouteName = (user: User): keyof RootStackParams => {
  if (!user) {
    return 'Auth';
  }

  return 'Root';
};

export const Navigation: FC = () => {
  const { user } = useUser();

  let initialRouteName = getInitialRouteName(user);

  return (
    <RootStack.Navigator
      screenOptions={{
        statusBarStyle: 'dark',
        headerBackTitleVisible: false,
      }}
      initialRouteName={initialRouteName}
    >
      <RootStack.Screen
        name="Auth"
        component={AuthStack}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </RootStack.Navigator>
  );
};
