import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WithUserStackParams } from './navigator';
import { useLang } from '../util/contexts/lang_context';
import Layout from '../components/layout';
import EquipmentScreen from '../components/equipment/equipment_screen';

export default function Equipment({
  navigation,
  route,
}: StackScreenProps<WithUserStackParams, 'Equipment'>) {
  const { id } = route.params;
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('Equipment')} goBack={navigation.goBack}>
      <EquipmentScreen id={id} />
    </Layout>
  );
}
