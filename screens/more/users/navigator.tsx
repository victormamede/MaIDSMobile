import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import UserList from './user_list';
import User from './user';

const Stack = createStackNavigator();

export default function MoreUser({}: StackScreenProps<
  UserStackParams,
  'User'
>) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Users" component={UserList} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}

export type UserStackParams = {
  User: { id: number };
  Users: undefined;
};
