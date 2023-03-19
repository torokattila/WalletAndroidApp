import React, { useEffect, useRef } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { StatusBar } from 'react-native';
import i18n from 'i18n-js';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { AuthProvider } from '@hooks/useAuth';
import { UserIdProvider } from '@hooks/useUserId';
import { UserProvider } from '@hooks/useUser';
import { Navigation } from '@navigation/Navigation';
import { English, Hungarian } from '@core/translations';
import { getLocale } from '@core/translation-utils';
import { ThemeProvider } from '@styles/provider';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { ToastNotification } from '@components/shared';

const App = (): JSX.Element => {
  const navigationRef = useNavigationContainerRef();
  const routeNameRef = useRef<string>();
  const toastNotification = useToastNotificationStore();

  const handleNavigationChange = (): void => {
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    routeNameRef.current = currentRouteName;
  };

  i18n.translations = {
    eng: English,
    hun: Hungarian,
  };
  i18n.locale = getLocale();
  i18n.fallbacks = 'eng';

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef?.getCurrentRoute()?.name;
        }}
        onStateChange={handleNavigationChange}
      >
        <AuthProvider>
          <UserIdProvider>
            <UserProvider>
              <StatusBar barStyle="default" animated={true} />
              <Navigation />
            </UserProvider>
          </UserIdProvider>
          <ToastNotification
            isVisible={toastNotification.visible}
            type={toastNotification.toastType}
            title={toastNotification.toastTitle}
            subtitle={toastNotification.toastSubtitle}
            onHideToast={toastNotification.hide}
          />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
