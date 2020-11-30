import { createContext, useContext } from 'react';
import ApiFetcher from '../api/api_fetcher';
import { UserData } from '../api/user/user';

export type UserContextProps = {
  user: UserData | null;
  fetcher: ApiFetcher;
  logOut: () => void;
  logIn: (userData: UserData, token: string) => void;
};

const UserContext = createContext<UserContextProps>({
  user: null,
  fetcher: new ApiFetcher(),
  logOut: () => {},
  logIn: () => {},
});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export const useUser = () => useContext(UserContext);
