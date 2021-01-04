import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import UserList from './users/user_list';
import User from './users/user';

const Stack = createStackNavigator();

export default function More({}: StackScreenProps<UserStackParams, 'User'>) {
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
