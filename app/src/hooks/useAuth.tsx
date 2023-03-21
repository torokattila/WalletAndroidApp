import React, { createContext, useContext, useEffect, useState } from 'react';
import { AppState, NativeEventSubscription } from 'react-native';
import { getApp } from '@model/firebase-config';
import { getAuth, onAuthStateChanged } from '@firebase/auth';

type AuthContextProps = {
  isLoggedIn: boolean;
  error: Error;
  retry: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isLoading: true,
  error: null,
  retry: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState<Error>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const reloadUser = () => {
    const unsubscribe = onAuthStateChanged(getAuth(getApp()), (user) => {
      setError(undefined);

      if (!user) {
        setIsLoggedIn(false);
      } else {
        user
          .reload()
          .then(() => {
            unsubscribe();

            if (user) {
              setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          })
          .catch((err: any) => setError(err));
      }
      (err: any) => setError(err);
    });
  };

  useEffect(() => {
    let subscription: NativeEventSubscription;

    const unsubscribe = onAuthStateChanged(
      getAuth(getApp()),
      (user) => {
        setError(undefined);

        if (user) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      },
      (err: any) => setError(err)
    );

    subscription = AppState.addEventListener('change', reloadUser);

    return () => {
      subscription && subscription.remove();
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading: !error && isLoggedIn === undefined,
        error,
        retry: reloadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  return context;
};
