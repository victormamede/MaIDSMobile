import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { WithUserStackParams } from './navigator';
import { useLang } from '../util/contexts/lang_context';
import Layout from '../components/layout';
import EquipmentScreen from '../components/equipment/equipment_screen';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from '../components/util/tab_navigator';

export default function Equipment({
  navigation,
  route,
}: StackScreenProps<WithUserStackParams, 'Equipment'>) {
  const { id } = route.params;
  const { getPhrase } = useLang();

  return (
    <Layout title={getPhrase('Equipment')} goBack={navigation.goBack}>
      <Navigator>
        <Navigator.Tab title={getPhrase('Info')}>
          <EquipmentScreen id={id} />
        </Navigator.Tab>
        <Navigator.Tab title={getPhrase('Passwords')}>
          <View style={styles.container}>
            <Text>{getPhrase('Passwords here')}</Text>
          </View>
        </Navigator.Tab>
      </Navigator>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
