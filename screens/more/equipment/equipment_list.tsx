import React from 'react';
import { StyleSheet, View } from 'react-native';
import EquipmentListComponent from '../../../components/equipment/equipment_list';
import { Button } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { useLang } from '../../../util/contexts/lang_context';
import Layout from '../../../components/layout';
import { UserStackParams } from './navigator';

export default function EquipmentList({
  navigation,
}: StackScreenProps<UserStackParams, 'EquipmentList'>) {
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('Equipment List')} goBack={navigation.goBack}>
      <View style={styles.container}>
        <EquipmentListComponent
          onPress={(id) => navigation.push('Equipment', { id })}
        />
      </View>
      <Button onPress={() => navigation.push('Equipment', { id: 0 })}>
        {getPhrase('New')}
      </Button>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
