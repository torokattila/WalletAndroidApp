import React, { createContext, useContext, useEffect, useState } from 'react';
import { RootStackParams } from '@navigation/Navigation';
import {
  NavigationProp,
  NavigationState,
  PartialState,
  useNavigation,
} from '@react-navigation/native';
import { useUser } from './useUser';

type Redirect = PartialState<NavigationState<RootStackParams>> | NavigationState<RootStackParams>;

type NavigationInterceptorContextProps = {
  redirect: () => void;
  setRedirectPath: (state: Redirect) => void;
};

const NavigationInterceptorContext = createContext<NavigationInterceptorContextProps>({
  redirect: () => {},
  setRedirectPath: () => {},
});

export const NavigationInterceptorProvider = ({ children }) => {
  const { user } = useUser();
  const [redirectPath, setRedirectPath] = useState<Redirect>({
    routes: [{ name: 'Root' }],
  });
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const redirect = () => {
    let redirectData = { ...redirectPath, index: redirectPath.routes.length - 1 };

    if (!user) {
      redirectData = { routes: [{ name: 'Auth' }], index: 0 };
    } else if (user) {
      redirectData = { routes: [{ name: 'Root' }], index: 0 };
    }

    (navigation as any).isReady() && navigation.reset(redirectData);
  };

  useEffect(() => {
    redirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, redirectPath]);

  return (
    <NavigationInterceptorContext.Provider value={{ setRedirectPath, redirect }}>
      {children}
    </NavigationInterceptorContext.Provider>
  );
};

export const useNavigationInterceptor = (): NavigationInterceptorContextProps => {
  const context = useContext(NavigationInterceptorContext);

  return context;
};
