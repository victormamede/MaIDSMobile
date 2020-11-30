import React, { useEffect, useMemo, useState } from 'react';
import { UserProvider, UserContextProps } from '../util/contexts/user_context';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './login';
import Settings from './settings';
import Scan from './scan';
import More from './more';
import ApiFetcher from '../util/api/api_fetcher';
import UpdatePassword from './update_password';
import { UserData } from '../util/api/user/user';

const Stack = createStackNavigator();

export default function Navigator() {
  const [user, userHandler] = useState<{
    user: UserData;
    token: string;
  } | null>(null);

  const userValues: UserContextProps = useMemo(
    () => ({
      user: user?.user || null,
      fetcher: new ApiFetcher(user?.token),
      logIn: (_user, token) => userHandler({ user: _user, token }),
      logOut: () => userHandler(null),
    }),
    [user],
  );

  useEffect(() => {
    userValues.fetcher.setOnExpire(() => userHandler(null));
  }, [userValues]);

  return (
    <UserProvider value={userValues}>
      <Stack.Navigator headerMode="none">
        {user == null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UpdatePassword" component={UpdatePassword} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        ) : (
          <>
            <Stack.Screen name="Scan" component={Scan} />
            <Stack.Screen name="More" component={More} />
          </>
        )}
      </Stack.Navigator>
    </UserProvider>
  );
}

export type WithUserStackParams = {
  Scan: undefined;
  More: undefined;
};

export type NoUserStackParams = {
  Login: undefined;
  Settings: undefined;
  UpdatePassword: { token: string };
};
