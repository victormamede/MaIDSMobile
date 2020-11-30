import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { WithUserStackParams } from './navigator';
import MoreDefault from './more/default';
import MoreUserList from './more/user_list';
import MoreUser from './more/user';

const Stack = createStackNavigator();

export type MoreStackParams = {
  Default: undefined;
  Users: undefined;
  User: { id: number; onChanged?: () => void };
};

export default function More({}: StackScreenProps<
  WithUserStackParams,
  'More'
>) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Default" component={MoreDefault} />
      <Stack.Screen name="Users" component={MoreUserList} />
      <Stack.Screen name="User" component={MoreUser} />
    </Stack.Navigator>
  );
}
