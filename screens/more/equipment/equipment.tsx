import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import EquipmentScreen from '../../../components/equipment/equipment_screen';
import Layout from '../../../components/layout';
import { useLang } from '../../../util/contexts/lang_context';
import { UserStackParams as EquipmentStackParams } from './navigator';

export default function Equipment({
  navigation,
  route,
}: StackScreenProps<EquipmentStackParams, 'Equipment'>) {
  const { id } = route.params;
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('Equipment')} goBack={navigation.goBack}>
      <EquipmentScreen id={id} />
    </Layout>
  );
}
