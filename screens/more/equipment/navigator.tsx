import React from 'react';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import EquipmentList from './equipment_list';
import Equipment from './equipment';

const Stack = createStackNavigator();

export default function MoreEquipment({}: StackScreenProps<
  UserStackParams,
  'Equipment'
>) {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="EquipmentList" component={EquipmentList} />
      <Stack.Screen name="Equipment" component={Equipment} />
    </Stack.Navigator>
  );
}

export type UserStackParams = {
  Equipment: { id: number };
  EquipmentList: undefined;
};
