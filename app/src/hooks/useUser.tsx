import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { User } from '@model/domain';
import { UserService } from '@model/services';
import { useUserId } from './useUserId';
import { useAuth } from './useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextProps = {
  user: User;
  updateDetails: (data: BasicDetailsData) => Promise<void>;
  setUser: (user: User) => void;
  error: Error;
  isLoading: boolean;
  retry: () => void;
};

export type BasicDetailsData = {
  lastname: string;
  firstname: string;
};

const UserContext = createContext<UserContextProps>({
  user: null,
  isLoading: true,
  error: null,
  setUser: () => {},
  updateDetails: () => Promise.resolve(),
  retry: () => Promise.resolve(),
});

const STORAGE_KEY = 'clientId';

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const userService = new UserService();

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const { setUserId, userId } = useUserId();
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  const fetchUser = async () => {
    setIsLoading(true);
    setError(undefined);

    try {
      let currentUser: User = await userService.getCurrentUser();

      if (!currentUser) {
        const id = await AsyncStorage.getItem(STORAGE_KEY);
        currentUser = await userService.getUserByUserId(id);
      }

      if (currentUser) {
        setUser(currentUser);
      }

      if (!!user?.id && user.id !== userId) {
        setUserId(currentUser.id);
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateDetails = async (data: BasicDetailsData) => {
    try {
      setIsLoading(true);

      const updatedUser = await userService.updateBasicDetails(userId, data);
      setUser(updatedUser);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn, isAuthLoading]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateDetails,
        isLoading,
        error,
        retry: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);

  return context;
};
