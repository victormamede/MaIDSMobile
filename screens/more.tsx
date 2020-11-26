import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { WithUserStackParams } from './navigator';
import MoreScreen from './more/default';
import UsersScreen from './more/users';
import UserScreen from './more/user';
import { useLang } from '../util/contexts/lang_context';

const Stack = createStackNavigator();

export type MoreStackParams = {
  Default: undefined;
  Users: undefined;
  User: { id: number };
};

export default function More({}: StackScreenProps<
  WithUserStackParams,
  'More'
>) {
  const { getPhrase } = useLang();

  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ title: getPhrase('More') }}
        name="Default"
        component={MoreScreen}
      />
      <Stack.Screen
        options={{ title: getPhrase('Users') }}
        name="Users"
        component={UsersScreen}
      />
      <Stack.Screen
        options={{ title: getPhrase('User') }}
        name="User"
        component={UserScreen}
      />
    </Stack.Navigator>
  );
}
