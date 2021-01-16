import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { WithUserStackParams } from './navigator';
import MoreDefault from './more/default';
import MoreUser from './more/users/navigator';
import MoreEquipment from './more/equipment/navigator';

const Stack = createStackNavigator();

export default function More({}: StackScreenProps<
  WithUserStackParams,
  'More'
>) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Default" component={MoreDefault} />
      <Stack.Screen name="User" component={MoreUser} />
      <Stack.Screen name="Equipment" component={MoreEquipment} />
    </Stack.Navigator>
  );
}

export type MoreStackParams = {
  Default: undefined;
  User: undefined;
  Equipment: undefined;
};
