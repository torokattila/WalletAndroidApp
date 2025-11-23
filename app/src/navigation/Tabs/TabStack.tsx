/* eslint-disable react/no-unstable-nested-components */
import React, { FC } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '@styles/theme';
import { Home, Incomes, Profile, Purchases } from '@components/screens';
import { TabIcon } from '@components/TabIcon';
import { TabButton } from '@components/TabButton';
import { useDarkMode } from '@hooks/useDarkMode';
import { Categories } from '@components/screens/Categories';

export type TabStackParams = {
  Home: {};
  Profile: {};
  Incomes: {};
  Purchases: {
    category?: string;
    fromDate?: Date;
    toDate?: Date;
  };
  Categories: {};
};

const BottomTabs = createBottomTabNavigator<TabStackParams>();

export const TabStack: FC = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <BottomTabs.Navigator
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          borderTopWidth: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
          shadowOpacity: 0.2,
          shadowColor: theme.colors.black,
          backgroundColor: isDarkMode ? theme.colors.grey[500] : theme.colors.white[100],
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
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => <TabIcon isHighlighted={focused} icon="home" />,
        }}
      />
      <BottomTabs.Screen
        name="Incomes"
        component={Incomes}
        options={{
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => <TabIcon isHighlighted={focused} icon="income" />,
        }}
      />
      <BottomTabs.Screen
        name="Purchases"
        component={Purchases}
        options={{
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => <TabIcon isHighlighted={focused} icon="purchase" />,
        }}
      />
      <BottomTabs.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => <TabIcon isHighlighted={focused} icon="category" />,
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarButton: (props) => <TabButton {...props} />,
          tabBarIcon: ({ focused }) => <TabIcon isHighlighted={focused} icon="profile" />,
        }}
      />
    </BottomTabs.Navigator>
  );
};
