import React, { createContext, useContext, useEffect, useState } from 'react';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'cliendId';

type ContextProps = {
  userId: string;
  setUserId: (id: string) => void;
};

const Context = createContext<ContextProps>({ userId: '', setUserId: () => {} });

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState<string>();

  useEffect(() => {
    const init = async () => {
      try {
        let id = await AsyncStorage.getItem(STORAGE_KEY);

        if (!id) {
          id = uuid.v4() as string;

          await AsyncStorage.setItem(STORAGE_KEY, id);
        }

        setUserId(id);
      } catch (error) {
        throw new Error(error);
      }
    };

    init();
  }, []);

  return <Context.Provider value={{ userId, setUserId }}>{children}</Context.Provider>;
};

export const useUserId = () => {
  const context = useContext(Context);

  return context;
};
