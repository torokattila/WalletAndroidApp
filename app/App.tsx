/* eslint-disable react-native/no-inline-styles */
import { LoadingScreen } from '@components/screens';
import { ToastNotification } from '@components/shared';
import { getLocale } from '@core/translation-utils';
import { English, Hungarian } from '@core/translations';
import { AuthProvider } from '@hooks/useAuth';
import { DarkModeProvider } from '@hooks/useDarkMode';
import { NavigationInterceptorProvider } from '@hooks/useNavigationInterceptor';
import { UserProvider, useUser } from '@hooks/useUser';
import { UserIdProvider } from '@hooks/useUserId';
import { VibrationProvider } from '@hooks/useVibrationToggle';
import { Navigation } from '@navigation/Navigation';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { useToastNotificationStore } from '@stores/toastNotification.store';
import { ThemeProvider } from '@styles/provider';
import i18n from 'i18n-js';
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';
import SplashScreen from 'react-native-splash-screen';

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
      <DarkModeProvider>
        <VibrationProvider>
          <RootSiblingParent>
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
                    <NavigationInterceptorProvider>
                      <AppLoader>
                        <StatusBar
                          barStyle="default"
                          translucent
                          backgroundColor="transparent"
                          animated={true}
                        />
                        <SafeAreaView style={{ flex: 1 }}>
                          <Navigation />
                        </SafeAreaView>
                      </AppLoader>
                    </NavigationInterceptorProvider>
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
          </RootSiblingParent>
        </VibrationProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
};

type AppLoaderProps = PropsWithChildren;

const AppLoader: FC<AppLoaderProps> = ({ children }) => {
  const { isLoading: isUserLoading } = useUser();

  return <LoadingScreen isAppReady={!isUserLoading}>{children}</LoadingScreen>;
};

export default App;
