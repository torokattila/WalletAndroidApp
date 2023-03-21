import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '@styles/theme';
import { Home, Incomes, Profile, Purchases } from '@components/screens';

export type TabStackParams = {
  Home: {};
  Profile: {};
  Incomes: {};
  Purchases: {};
};

const BottomTabs = createBottomTabNavigator<TabStackParams>();

export const TabStack: FC = () => (
  <BottomTabs.Navigator
    safeAreaInsets={{ bottom: 0 }}
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 70,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        position: 'absolute',
        shadowOpacity: 0.2,
        shadowColor: theme.colors.black,
        shadowOffset: {
          width: 0,
          height: -2,
        },
      },
      tabBarVisibilityAnimationConfig: {
        hide: {
          animation: 'spring',
          config: {},
        },
        show: {
          animation: 'spring',
          config: {},
        },
      },
      tabBarShowLabel: false,
    }}
    // eslint-disable-next-line react-native/no-inline-styles
    sceneContainerStyle={{
      paddingBottom: 50,
    }}
  >
    <BottomTabs.Screen name="Home" component={Home} />
    <BottomTabs.Screen name="Profile" component={Profile} />
    <BottomTabs.Screen name="Incomes" component={Incomes} />
    <BottomTabs.Screen name="Purchases" component={Purchases} />
  </BottomTabs.Navigator>
);
