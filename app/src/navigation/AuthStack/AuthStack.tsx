import React, { FC } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login, Registration } from '@components/screens';

export type AuthStackParams = {
  Login: {};
  Registration: {};
};

const Stack = createNativeStackNavigator<AuthStackParams>();

export const AuthStack: FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Registration" component={Registration} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
